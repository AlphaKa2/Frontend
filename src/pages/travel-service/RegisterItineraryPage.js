import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTripDetailsById } from "../../api/ai-service/trip-id";
import GoogleMapsComponent from "../../api/google-maps";

const RegisterItineraryPage = () => {
  const { recommendation_trip_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [center, setCenter] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAllDays, setShowAllDays] = useState(true);
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

        if (
          tripDetails.days?.length > 0 &&
          tripDetails.days[0].schedule?.length > 0
        ) {
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

  useEffect(() => {
    if (!data) return;

    if (showAllDays) {
      if (
        data.days?.length > 0 &&
        data.days[0].schedule?.length > 0
      ) {
        const firstPlace = data.days[0].schedule[0].place;
        setCenter({
          lat: parseFloat(firstPlace.latitude),
          lng: parseFloat(firstPlace.longitude),
        });
      }
    } else {
      const selectedDayData = data.days.find(
        (day) => String(day.dayNumber) === String(selectedDay)
      );
      if (selectedDayData && selectedDayData.schedule.length > 0) {
        const firstPlace = selectedDayData.schedule[0].place;
        setCenter({
          lat: parseFloat(firstPlace.latitude),
          lng: parseFloat(firstPlace.longitude),
        });
      }
    }
  }, [selectedDay, showAllDays, data]);

  // '편집' 버튼 클릭 시 EditItineraryPage로 이동하는 함수
  const handleEdit = () => {
    // EditItineraryPage로 이동하며 여행 ID를 전달합니다.
    navigate(`/edit-itinerary/${recommendation_trip_id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  const markers = data
    ? showAllDays
      ? data.days.flatMap((day) =>
          day.schedule.map((item) => ({
            lat: parseFloat(item.place.latitude),
            lng: parseFloat(item.place.longitude),
            label: item.place.place,
          }))
        )
      : data.days
          .find(
            (day) => String(day.dayNumber) === String(selectedDay)
          )
          ?.schedule.map((item) => ({
            lat: parseFloat(item.place.latitude),
            lng: parseFloat(item.place.longitude),
            label: item.place.place,
          })) || []
    : [];

  console.log("Markers:", markers);
  console.log("Center:", center);

  return (
    <div className="flex h-screen">
      {/* Left: Map Section */}
      <div className="w-[64.5%] h-full">
        <GoogleMapsComponent center={center} markers={markers} />
      </div>

      {/* Right: Itinerary Section */}
      <div className="w-[25.5%] bg-white flex flex-col relative">
        {/* Title Section */}
        <div
          className="bg-white z-10 p-4 w-full mb-16"
          style={{
            position: "sticky",
            top: "64px",
          }}
        >
          <h1 className="text-lg font-bold text-center md:text-xl lg:text-2xl">
            {data.title}
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            {data.start_date && data.end_date
              ? `${data.start_date} ~ ${data.end_date}`
              : `${data.days?.length || 0}일 여행 코스`}
          </p>
        </div>

        {/* Itinerary List */}
        <div
          className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          style={{
            maxHeight: "calc(100vh - 160px)",
          }}
        >
          {showAllDays
            ? data.days.map((day) => (
                <div key={day.dayNumber} className="mb-8">
                  <h2 className="text-md font-semibold mb-6">
                    {`${day.dayNumber}일차`}
                  </h2>
                  <ul className="space-y-12">
                    {day.schedule.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-6 relative"
                        style={{ padding: "15px 0" }}
                      >
                        {index < day.schedule.length - 1 && (
                          <div
                            className="absolute left-4 top-10 bottom-[-10px] w-px bg-gray-300"
                          ></div>
                        )}
                        <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center z-10">
                          {item.order}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">
                            {item.place.place}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {item.place.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : data.days
                .filter(
                  (day) => String(day.dayNumber) === String(selectedDay)
                )
                .map((day) => (
                  <div key={day.dayNumber} className="mb-12">
                    <h2 className="text-md font-semibold mb-6">
                      {`${day.dayNumber}일차`}
                    </h2>
                    <ul className="space-y-16">
                      {day.schedule.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-8 relative"
                          style={{ padding: "20px 0" }}
                        >
                          {index < day.schedule.length - 1 && (
                            <div
                              className="absolute left-4 top-10 bottom-[-10px] w-px bg-gray-300"
                            ></div>
                          )}
                          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center z-10">
                            {item.order}
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold">
                              {item.place.place}
                            </h3>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
        </div>
      </div>

      {/* Right Buttons Section */}
      <div className="w-[10%] bg-white flex flex-col items-center p-4 gap-4 pt-[80px]">
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="absolute bottom-4 right-4 bg-blue-500 text-white py-6 px-10 rounded-lg shadow hover:bg-blue-600 text-lg font-semibold"
        >
          편집
        </button>

        <button
          onClick={() => {
            setShowAllDays(true);
            setSelectedDay(null);
          }}
          className={`py-4 px-6 rounded-lg shadow text-lg font-semibold ${
            showAllDays
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          } whitespace-nowrap`}
        >
          전체 일정
        </button>

        {data.days.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => {
              setShowAllDays(false);
              setSelectedDay(day.dayNumber);
            }}
            className={`py-5 px-8 rounded-lg shadow text-lg font-semibold ${
              String(selectedDay) === String(day.dayNumber)
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {`${day.dayNumber}일차`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegisterItineraryPage;
