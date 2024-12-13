// src/pages/travel-service/EditItineraryPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTravelById } from "../../api/ai-service/trip-id";
import { updateTravel } from "../../api/travel-service/updateTravel";
import GoogleMapsComponent from "../../api/google-maps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ParticipantsList from "../../components/ParticipantsList";
import ParticipantsImage from "../../assets/images/Participants.png";

const EditItineraryPage = () => {
  const { travelId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [center, setCenter] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAllDays, setShowAllDays] = useState(true);
  const [loading, setLoading] = useState(true);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [newPlaceStartTime, setNewPlaceStartTime] = useState("");
  const [newPlaceEndTime, setNewPlaceEndTime] = useState("");
  const [markers, setMarkers] = useState([]);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false); // 참여자 팝업 열림 상태

  const validateTime = (time) => {
    if (time.trim() === "") return true;
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  };

  const formatTime = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '';
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }
    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
  };

  const handleTimeChange = (dayNumber, scheduleIndex, field, value) => {
    const formattedTime = formatTime(value);
    setData(prevData => {
      return {
        ...prevData,
        days: prevData.days.map(day => {
          if (day.dayNumber !== dayNumber) return day;
          return {
            ...day,
            schedules: day.schedules.map((schedule, idx) => {
              if (idx !== scheduleIndex) return schedule;
              return {
                ...schedule,
                [field]: formattedTime
              };
            })
          };
        })
      };
    });
  };

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
        let tripData = tripDetails.data;

        tripData.days = tripData.days.map((day) => {
          return {
            ...day,
            schedules: day.schedules.map((schedule, idx) => ({
              ...schedule,
              order: typeof schedule.order === 'number' ? schedule.order : idx + 1,
              startTime: "",
              endTime: "",
            }))
          };
        });

        setData(tripData);

        if (tripData.days?.length > 0 && tripData.days[0].schedules?.length > 0) {
          const firstPlace = tripData.days[0].schedules[0].place;
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

  useEffect(() => {
    if (!data) return;
    updateMarkers();

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

  const updateMarkers = () => {
    const newMarkers = data
      ? showAllDays
        ? data.days.flatMap((day) =>
            day.schedules.map((item) => ({
              lat: parseFloat(item.place.latitude),
              lng: parseFloat(item.place.longitude),
              label: item.place.placeName,
            }))
          )
        : (data.days.find((day) => String(day.dayNumber) === String(selectedDay))
            ?.schedules.map((item) => ({
              lat: parseFloat(item.place.latitude),
              lng: parseFloat(item.place.longitude),
              label: item.place.placeName,
            })) || [])
      : [];
    setMarkers(newMarkers);
  };

  const handleDeletePlace = (dayNumber, scheduleIndex) => {
    setData(prevData => {
      return {
        ...prevData,
        days: prevData.days.map(day => {
          if (day.dayNumber !== dayNumber) return day;
          const updatedSchedules = day.schedules.filter((_, idx) => idx !== scheduleIndex)
            .map((schedule, idx) => ({
              ...schedule,
              order: idx + 1
            }));
          return {
            ...day,
            schedules: updatedSchedules
          };
        })
      };
    });
  };

  const handleAddPlace = (dayNumber) => {
    if (!newPlaceName.trim()) {
      alert("장소 이름을 입력해주세요.");
      return;
    }

    if (newPlaceStartTime && !validateTime(newPlaceStartTime)) {
      alert("유효한 시작 시간을 입력해주세요 (HH:MM).");
      return;
    }

    if (newPlaceEndTime && !validateTime(newPlaceEndTime)) {
      alert("유효한 종료 시간을 입력해주세요 (HH:MM).");
      return;
    }

    const newPlace = {
      order: 0,
      startTime: newPlaceStartTime.trim() === "" ? "00:00:00" : newPlaceStartTime,
      endTime: newPlaceEndTime.trim() === "" ? "00:00:00" : newPlaceEndTime,
      place: {
        travelPlaceId: null,
        placeName: newPlaceName.trim(),
        address: "새로운 주소",
        latitude: "37.5665",
        longitude: "126.9780",
      },
    };

    setData(prevData => {
      return {
        ...prevData,
        days: prevData.days.map(day => {
          if (day.dayNumber !== dayNumber) return day;
          const updatedSchedules = [...day.schedules, newPlace].map((schedule, idx) => ({
            ...schedule,
            order: idx + 1
          }));
          return {
            ...day,
            schedules: updatedSchedules
          };
        })
      };
    });

    setNewPlaceName("");
    setNewPlaceStartTime("");
    setNewPlaceEndTime("");
  };

  const handleSave = async () => {
    try {
      const requestData = {
        travelName: data.title,
        description: data.description || "여행 설명이 없습니다.",
        startDate: data.startDate,
        endDate: data.endDate,
        days: data.days.map((day) => ({
          dayNumber: day.dayNumber,
          date: day.date,
          schedules: day.schedules.map((schedule) => ({
            travelScheduleId: schedule.travelScheduleId || null,
            order: schedule.order,
            startTime: schedule.startTime.trim() === "" ? "00:00:00" : schedule.startTime,
            endTime: schedule.endTime.trim() === "" ? "00:00:00" : schedule.endTime,
            place: {
              travelPlaceId: schedule.place.travelPlaceId || null,
              placeName: schedule.place.placeName,
              address: schedule.place.address,
              latitude: schedule.place.latitude,
              longitude: schedule.place.longitude,
            },
          })),
        })),
      };

      await updateTravel(travelId, requestData);
      alert("여행 일정이 성공적으로 저장되었습니다!");
      navigate(`/register-itinerary/${travelId}`);
    } catch (error) {
      console.error("Error saving travel:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        alert(`여행 저장 중 문제가 발생했습니다: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("여행 저장 중 문제가 발생했습니다.");
      }
    }
  };

  const handleGoBack = () => {
    navigate(`/register-itinerary/${travelId}`);
  };

  const handleShowParticipants = () => {
    setIsParticipantsOpen(true);
  };

  // 로딩 상태 및 데이터 유효성 검사
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

  const renderSchedules = (day) => (
    <div key={day.dayNumber} className="mb-16">
      <h2 className="text-xl font-bold mb-6">{`${day.dayNumber}일차`}</h2>
      <ul className="space-y-24">
        {day.schedules.map((item, index) => (
          <li
            key={index}
            className="relative"
            style={{ padding: "20px 0" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center z-10">
                {item.order}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.startTime}
                    onChange={(e) => handleTimeChange(day.dayNumber, index, 'startTime', e.target.value)}
                    placeholder="00:00"
                    className={`w-16 p-1 border rounded-md text-center text-sm placeholder-gray-400 ${
                      item.startTime && !validateTime(item.startTime) ? 'border-red-500' : ''
                    }`}
                  />
                  <span>~</span>
                  <input
                    type="text"
                    value={item.endTime}
                    onChange={(e) => handleTimeChange(day.dayNumber, index, 'endTime', e.target.value)}
                    placeholder="00:00"
                    className={`w-16 p-1 border rounded-md text-center text-sm placeholder-gray-400 ${
                      item.endTime && !validateTime(item.endTime) ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                <h3 className="text-base font-semibold">
                  {item.place.placeName}
                </h3>
              </div>
              <button
                onClick={() => handleDeletePlace(day.dayNumber, index)}
                className="text-gray-500 hover:text-red-500 ml-auto"
              >
                <FontAwesomeIcon icon={faTrashAlt} size="lg" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4 mt-8 relative">
        <div className="w-8 h-8"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newPlaceStartTime}
              onChange={(e) => setNewPlaceStartTime(e.target.value)}
              placeholder="00:00"
              className={`w-16 p-1 border rounded-md text-center text-sm placeholder-gray-400 ${
                newPlaceStartTime && !validateTime(newPlaceStartTime) ? 'border-red-500' : ''
              }`}
            />
            <span>~</span>
            <input
              type="text"
              value={newPlaceEndTime}
              onChange={(e) => setNewPlaceEndTime(e.target.value)}
              placeholder="00:00"
              className={`w-16 p-1 border rounded-md text-center text-sm placeholder-gray-400 ${
                newPlaceEndTime && !validateTime(newPlaceEndTime) ? 'border-red-500' : ''
              }`}
            />
          </div>

          <input
            type="text"
            value={newPlaceName}
            onChange={(e) => setNewPlaceName(e.target.value)}
            placeholder="장소 추가"
            className="w-[70%] p-2 border border-gray-300 rounded-md text-base font-semibold"
          />
        </div>

        <button
          onClick={() => handleAddPlace(day.dayNumber)}
          className="text-gray-500 text-4xl font-bold p-0 bg-transparent hover:text-gray-700 ml-auto"
          style={{ border: 'none', background: 'none', transform: 'translateY(8px)' }}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <div className="w-[64.5%] h-full">
        <GoogleMapsComponent center={center} markers={markers} />
      </div>

      <div className="w-[25.5%] bg-white flex flex-col relative">
        <div
          className="bg-white z-10 p-4 w-full mb-24 flex justify-between items-center"
          style={{
            position: "sticky",
            top: "64px",
          }}
        >
          <div>
            <h1 className="text-lg font-bold text-center md:text-xl lg:text-2xl">
              {data.title}
            </h1>
            <p className="text-base font-semibold text-gray-600 text-center mt-2">
              {data.startDate && data.endDate
                ? `${data.startDate} ~ ${data.endDate}`
                : `${data.days?.length || 0}일 여행 코스`}
            </p>
          </div>
          {/* 참여자 버튼 (기존 초대 버튼 대체) */}
          <button
            onClick={() => setIsParticipantsOpen(true)}
            className="absolute right-4 bottom-4flex items-center"
          >
            <img
              src={ParticipantsImage}
              className="w-14 h-8" // 이미지 크기 조정
            />
          </button>

        </div>

        <div
          className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          style={{
            maxHeight: "calc(100vh - 160px)",
          }}
        >
          {showAllDays
            ? data.days.map((day) => renderSchedules(day))
            : data.days
                .filter((day) => String(day.dayNumber) === String(selectedDay))
                .map((day) => renderSchedules(day))}
        </div>
      </div>

      <div className="w-[10%] bg-white flex flex-col items-center p-4 gap-4 pt-[125px] relative">
        <div className="absolute bottom-4 right-4 flex flex-col gap-4">
          <button
            onClick={handleGoBack}
            className="bg-gray-400 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-600 text-lg font-semibold"
          >
            돌아가기
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-6 px-8 rounded-lg shadow hover:bg-blue-600 text-lg font-semibold"
          >
            저장
          </button>
        </div>

        <button
          onClick={() => {
            setShowAllDays(true);
            setSelectedDay(null);
          }}
          className={`py-5 px-4 rounded-lg shadow text-lg font-semibold ${
            showAllDays ? "bg-blue-500 text-white" : "bg-white text-black"
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

      {/* 참여자 리스트 팝업 표시 */}
      {isParticipantsOpen && (
        <ParticipantsList
          travelId={travelId}
          onClose={() => setIsParticipantsOpen(false)}
        />
      )}
    </div>
  );
};

export default EditItineraryPage;
