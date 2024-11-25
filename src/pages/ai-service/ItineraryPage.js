import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTripDetailsById } from "../../api/ai-service/trip-id"; // API 호출 함수 import
import { GoogleMapsComponent } from "../../api/google-maps"; // Google Maps 컴포넌트 import

const ItineraryPage = () => {
  const { recommendation_trip_id } = useParams();
  const [data, setData] = useState(null);
  const [center, setCenter] = useState(null);
  const [selectedDay, setSelectedDay] = useState("1");
  const [showAllDays, setShowAllDays] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!recommendation_trip_id) {
        console.error("Recommendation Trip ID is required.");
        return;
      }

      try {
        setLoading(true);
        const tripDetails = await fetchTripDetailsById(recommendation_trip_id);
        setData(tripDetails);

        if (tripDetails.days?.length > 0 && tripDetails.days[0].schedule?.length > 0) {
          const firstPlace = tripDetails.days[0].schedule[0].place;
          setCenter({
            lat: parseFloat(firstPlace.latitude),
            lng: parseFloat(firstPlace.longitude),
          });
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recommendation_trip_id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center h-screen">데이터를 불러오지 못했습니다.</div>;
  }

  const markers = showAllDays
    ? data.days.flatMap((day) => day.schedule.map((item) => ({
        lat: item.place.latitude,
        lng: item.place.longitude,
        label: item.place.place,
      })))
    : data.days
        .find((day) => day.dayNumber === selectedDay)
        ?.schedule.map((item) => ({
          lat: item.place.latitude,
          lng: item.place.longitude,
          label: item.place.place,
        })) || [];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex">
        {/* Google Maps 컴포넌트 사용 */}
        <div className="w-[60%] h-full">
          <GoogleMapsComponent center={center} markers={markers} />
        </div>

        {/* 일정 섹션 */}
        <div className="w-[30%] bg-white shadow-lg flex flex-col relative">
          {/* 제목 */}
          {/* 제목 */}
          <div className="sticky top-[70px] bg-white z-10 p-4 shadow">
          <h1 className="text-lg font-bold">{data.title}</h1>
          <p className="text-sm text-gray-500">
          {data.start_date && data.end_date
            ? `${data.start_date} ~ ${data.end_date}`
            : `${data.days?.length || 0}일 여행 코스`}
           </p>
          </div>


          {/* 일정 리스트 */}
          <div
            className="flex-1 overflow-y-auto p-4 pt-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            style={{
              maxHeight: "calc(100vh - 140px)", // 제목과 등록 버튼을 제외한 높이 설정
            }}
          >
            {showAllDays
              ? data.days.map((day) => (
                  <div key={day.dayNumber} className="mb-8">
                    <h2 className="text-md font-semibold mb-6">{`${day.dayNumber}일차`}</h2>
                    <ul className="space-y-8"> {/* 간격 조정 */}
                      {day.schedule.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-4"
                          style={{ padding: "10px 0" }}
                        >
                          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                            {item.order}
                          </div>
                          <h3 className="text-sm font-semibold">{item.place.place}</h3>
                          <p className="text-xs text-gray-500 pl-12">{item.place.content}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              : data.days
                  .filter((day) => day.dayNumber === selectedDay)
                  .map((day) => (
                    <div key={day.dayNumber} className="mb-12">
                      <h2 className="text-md font-semibold mb-6">{`${day.dayNumber}일차`}</h2>
                      <ul className="space-y-8"> {/* 간격 조정 */}
                        {day.schedule.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-4"
                            style={{ padding: "10px 0" }}
                          >
                            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                              {item.order}
                            </div>
                            <h3 className="text-sm font-semibold">{item.place.place}</h3>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
          </div>

          {/* 등록 버튼 */}
          <div className="sticky bottom-0 bg-white z-10 p-4 shadow">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
              등록
            </button>
          </div>
        </div>

        {/* 우측 버튼 */}
        <div className="w-[10%] bg-gray-100 flex flex-col items-center p-4 gap-4 pt-[80px]">
          <button
            onClick={() => {
              setShowAllDays(true);
              setSelectedDay(null);
            }}
            className={`py-2 px-4 rounded-lg shadow ${
              showAllDays ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            전체일정
          </button>
          {data.days.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => {
                setShowAllDays(false);
                setSelectedDay(day.dayNumber);
              }}
              className={`py-2 px-4 rounded-lg shadow ${
                selectedDay === day.dayNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {`${day.dayNumber}일차`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;