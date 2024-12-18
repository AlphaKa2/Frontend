import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTravelById } from "../../api/ai-service/trip-id";
import GoogleMap from "../../components/Maps/GoogleMap";
import ParticipantsList from "../../components/ParticipantsList";
import ParticipantsImage from "../../assets/images/Participants.png";

const RegisterItineraryPage = () => {
  const { travelId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [center, setCenter] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAllDays, setShowAllDays] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

  // 데이터 fetch를 위한 useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (!travelId) {
        console.error("Travel ID is required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const tripDetails = await getTravelById(travelId);
        setData(tripDetails.data);

        if (
          tripDetails.data.days?.length > 0 &&
          tripDetails.data.days[0].schedules?.length > 0
        ) {
          const firstPlace = tripDetails.data.days[0].schedules[0].place;
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
  }, [travelId]);

  // selectedDay, showAllDays 변경 시 center 업데이트
  useEffect(() => {
    if (!data) return;

    if (showAllDays) {
      if (data.days?.length > 0 && data.days[0].schedules?.length > 0) {
        const firstPlace = data.days[0].schedules[0].place;
        setCenter({
          lat: parseFloat(firstPlace.latitude),
          lng: parseFloat(firstPlace.longitude),
        });
      }
    } else {
      const selectedDayData = data.days.find(
        (day) => String(day.dayNumber) === String(selectedDay)
      );
      if (selectedDayData && selectedDayData.schedules.length > 0) {
        const firstPlace = selectedDayData.schedules[0].place;
        setCenter({
          lat: parseFloat(firstPlace.latitude),
          lng: parseFloat(firstPlace.longitude),
        });
      }
    }
  }, [selectedDay, showAllDays, data]);

  const formatTime = (time) => {
    if (!time || time === "00:00:00") return null;
    return time.slice(0, 5);
  };

  // 로딩 상태 처리와 데이터 유효성 검사 훅 호출 후에 조건부 return
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

  // markers 생성 로직 (data가 존재하는 상태에서)
  const markers = showAllDays
    ? data.days.flatMap((day) =>
        day.schedules.map((item) => ({
          lat: parseFloat(item.place.latitude),
          lng: parseFloat(item.place.longitude),
          label: item.place.placeName,
        }))
      )
    : data.days
        .find((day) => String(day.dayNumber) === String(selectedDay))
        ?.schedules.map((item) => ({
          lat: parseFloat(item.place.latitude),
          lng: parseFloat(item.place.longitude),
          label: item.place.placeName,
        })) || [];
        
        const handleEdit = () => {
          if (data?.permission !== "EDIT") {
            alert("현재 편집 권한이 없습니다");
            return;
          }
          navigate(`/edit-itinerary/${travelId}`);
        };

  const formatScheduleList = (day) => (
    <ul className="space-y-12">
      {day.schedules.map((item, index) => {
        const startTime = formatTime(item.startTime);
        const endTime = formatTime(item.endTime);
        const showTimes = startTime && endTime;

        return (
          <li
            key={index}
            className="relative flex items-center gap-6"
            style={{ padding: "20px 0" }}
          >
            {index < day.schedules.length - 1 && (
              <div
                className="absolute left-4 w-0.5 bg-red-500"
                style={{
                  top: "50%",
                  bottom: "-70px",
                }}
              ></div>
            )}
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center z-10">
              {item.scheduleOrder}
            </div>
            <div>
              {showTimes && (
                <p className="text-sm text-gray-500">{`${startTime} ~ ${endTime}`}</p>
              )}
              <h2 className="text-base font-semibold">{item.place.placeName}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Map Section */}
      <div className="w-full lg:w-[64.5%] h-[50%] lg:h-full">
        <GoogleMap center={center} markers={markers} />
      </div>

      {/* Itinerary Section */}
      <div className="w-full lg:w-[25.5%] bg-white flex flex-col relative h-[50%] lg:h-full">
        <div className="bg-white z-10 p-4 w-full mb-2 lg:mb-16 sticky top-0 lg:top-[64px]">
          <h1 className="text-xl lg:text-xl font-bold text-left">{data.title}</h1>
          <p className="text-base font-semibold text-gray-600 text-left mt-2">
            {data.startDate && data.endDate
              ? `${data.startDate} ~ ${data.endDate}`
              : `${data.days?.length || 0}일 여행 코스`}
          </p>
          <div className="flex justify-end items-center p-4">
            <button
              onClick={() => setIsParticipantsOpen(true)}
              className="flex items-center"
            >
              <img
                src={ParticipantsImage}
                className="w-16 lg:w-16 h-8 lg:h-8"
                alt="Participants"
              />
            </button>
          </div>
        </div>

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

      <div className="hidden lg:flex lg:w-[10%] bg-white flex-col items-center p-4 gap-4">
        <div className="absolute top-[160px] flex flex-col items-center gap-4">
          <button
            onClick={() => {
              setShowAllDays(true);
              setSelectedDay(null);
            }}
            className={`py-4 px-4 rounded-lg shadow text-lg font-semibold ${
              showAllDays ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
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
              className={`py-4 px-6 rounded-lg shadow text-lg font-semibold ${
                String(selectedDay) === String(day.dayNumber)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {`${day.dayNumber}일차`}
            </button>
          ))}
        </div>
        <div className="mt-auto w-full flex justify-center">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-7 px-8 rounded-lg shadow hover:bg-blue-600 text-xl font-semibold"
          >
            편집
          </button>
        </div>
      </div>
      

        
      
      {isParticipantsOpen && (
        <ParticipantsList
          travelId={travelId}
          onClose={() => setIsParticipantsOpen(false)}
        />
      )}
    </div>
  );
};

export default RegisterItineraryPage;