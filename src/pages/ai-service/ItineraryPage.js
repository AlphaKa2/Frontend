import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchTripDetailsById } from "../../api/ai-service/trip-id"; // API 호출 함수 import

const ItineraryPage = () => {
  const { recommendation_trip_id } = useParams(); // URL에서 recommendation_trip_id 가져오기
  const [data, setData] = useState(null); // API 데이터 상태
  const [center, setCenter] = useState(null); // 지도 중심 설정
  const [selectedDay, setSelectedDay] = useState("1"); // 선택된 날짜
  const [showAllDays, setShowAllDays] = useState(false); // 전체 일정 보기 여부
  const [loading, setLoading] = useState(true); // 로딩 상태

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

        // 첫 번째 장소로 지도 중심 설정
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

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center h-screen">데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="flex h-screen">
      {/* 좌측 지도 */}
      <div className="w-[60%] relative">
        <LoadScript googleMapsApiKey="AIzaSyBOwwtfHr0GEu8Z4H1gP_mGl0qClPZfSU8">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            {(showAllDays
              ? data.days.flatMap((day) => day.schedule)
              : data.days.find((day) => day.dayNumber === selectedDay)?.schedule || []
            ).map((item, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(item.place.latitude),
                  lng: parseFloat(item.place.longitude),
                }}
                label={{
                  text: item.place.place,
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* 중앙 일정 영역 */}
      <div className="w-[30%] bg-white shadow-lg flex flex-col">
        {/* 제목 */}
        <div className="sticky top-0 bg-white z-10 p-4 shadow">
          <h1 className="text-lg font-bold">{data.title}</h1>
          <p className="text-sm text-gray-500">
            {`${data.start_date} ~ ${data.end_date}`}
          </p>
        </div>

        {/* 일정 리스트 */}
        <div className="flex-1 overflow-y-auto p-4">
          {showAllDays
            ? data.days.map((day) => (
                <div key={day.dayNumber} className="mb-8">
                  <h2 className="text-md font-semibold">{`${day.dayNumber}일차`}</h2>
                  <ul>
                    {day.schedule.map((item, index) => (
                      <li key={index} className="flex items-center mb-4">
                        <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center mr-4">
                          {item.order}
                        </div>
                        <h3 className="text-sm font-semibold">
                          {item.place.place}
                        </h3>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : data.days
                .filter((day) => day.dayNumber === selectedDay)
                .map((day) => (
                  <div key={day.dayNumber} className="mb-8">
                    <h2 className="text-md font-semibold">{`${day.dayNumber}일차`}</h2>
                    <ul>
                      {day.schedule.map((item, index) => (
                        <li key={index} className="flex items-center mb-4">
                          <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center mr-4">
                            {item.order}
                          </div>
                          <h3 className="text-sm font-semibold">
                            {item.place.place}
                          </h3>
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
      <div className="w-[10%] bg-gray-100 flex flex-col items-center p-4 gap-2">
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
  );
};

export default ItineraryPage;
