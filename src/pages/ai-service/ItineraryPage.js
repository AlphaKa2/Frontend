import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTripDetailsById } from "../../api/ai-service/trip-id";
import { registerTravel } from "../../api/travel-service/register"; 
import GoogleMapsComponent from "../../api/google-maps";

const ItineraryPage = () => {
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

  const handleRegister = async () => {
    try {
      const requestData = {
        travelName: data.title,
        description: data.description || "여행 설명이 없습니다.",
        travelType: data.type || "AI_GENERATED",
        preferenceId: data.preferenceId || 7,
        startDate: data.start_date,
        endDate: data.end_date,
        days: data.days.map((day) => ({
          dayNumber: day.dayNumber,
          date: day.date,
          schedules: day.schedule.map((schedule) => ({
            order: schedule.order,
            startTime: "00:00",
            endTime: "00:00",
            place: {
              placeName: schedule.place.place,
              address: schedule.place.address,
              latitude: schedule.place.latitude,
              longitude: schedule.place.longitude,
            },
          })),
        })),
      };

      await registerTravel(requestData);
      alert("여행이 성공적으로 등록되었습니다!");
      navigate("/registered");
    } catch (error) {
      console.error("Error registering travel:", error);
      alert("여행 등록 중 문제가 발생했습니다.");
    }
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
          .find((day) => String(day.dayNumber) === String(selectedDay))
          ?.schedule.map((item) => ({
            lat: parseFloat(item.place.latitude),
            lng: parseFloat(item.place.longitude),
            label: item.place.place,
          })) || []
    : [];

    const formatScheduleList = (day) => (
      <ul className="space-y-12">
        {day.schedule.map((item, index) => (
          <li
            key={index}
            className="relative flex items-center gap-6"
            style={{ padding: "20px 0" }}
          >
            {/* 현재 아이템이 마지막이 아닌 경우에만 아래로 선을 이어줌 */}
            {index < day.schedule.length - 1 && (
              <div
                className="absolute left-4 w-0.5 bg-red-500"
                style={{
                  top: "50%",
                  bottom: "-70px",
                }}
              ></div>
            )}
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center z-10">
              {item.order}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{item.place.place}</h3>
              {item.place.content && (
                <p className="text-xs text-gray-500">{item.place.content}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    );

  return (
    <div className="flex h-screen">
      {/* Left: Map Section */}
      <div className="w-[64.5%] h-full">
        <GoogleMapsComponent center={center} markers={markers} />
      </div>

      {/* Right: Itinerary Section */}
      <div className="w-[25.5%] bg-white flex flex-col relative">
        {/* Title Section */}
          <div className="bg-white z-10 p-4 w-full mb-2 lg:mb-16 sticky top-0 lg:top-[64px]">
            <h1 className="text-xl lg:text-xl font-bold text-left">{data.title}</h1>
            <p className="text-base font-semibold text-gray-600 text-left mt-2">
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
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{`${day.dayNumber}일차`}</h2>
                    <p className="text-base font-semibold text-gray-600">{day.date}</p>
                  </div>
                  {formatScheduleList(day)}
                </div>
              ))
            : data.days
                .filter((day) => String(day.dayNumber) === String(selectedDay))
                .map((day) => (
                  <div key={day.dayNumber} className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">{`${day.dayNumber}일차`}</h2>
                      <p className="text-base font-semibold text-gray-600">{day.date}</p>
                    </div>
                    {formatScheduleList(day)}
                  </div>
                ))}
        </div>
      </div>

      {/* Right Buttons Section */}
<div className="w-[10%] bg-white flex flex-col items-center p-4 gap-4 relative">
  {/* Register Button */}
  <button
    onClick={handleRegister}
    className="absolute bottom-4 right-4 bg-blue-500 text-white py-6 px-10 rounded-lg shadow hover:bg-blue-600 text-lg font-semibold"
  >
    등록
  </button>

  {/* 전체 일정 버튼 */}
  <div className="absolute top-[160px] flex flex-col items-center gap-4">
    <button
      onClick={() => {
        setShowAllDays(true);
        setSelectedDay(null);
      }}
      className={`py-4 px-4 rounded-lg shadow text-lg font-semibold ${
        showAllDays ? "bg-blue-500 text-white" : "bg-white text-black"
      } whitespace-nowrap`}
    >
      전체 일정
    </button>

    {/* n일차 버튼 */}
    {data.days.map((day) => (
      <button
        key={day.dayNumber}
        onClick={() => {
          setShowAllDays(false);
          setSelectedDay(day.dayNumber);
        }}
        className={`py-4 px-6 rounded-lg shadow text-lg font-semibold ${
          String(selectedDay) === String(day.dayNumber)
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        } whitespace-nowrap`}
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
