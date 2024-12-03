// src/pages/EditItineraryPage.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTripDetailsById } from "../../api/ai-service/trip-id";
import { updateTravel } from "../../api/travel-service/updateTravel"; // 여행 업데이트 API 함수
import GoogleMapsComponent from "../../api/google-maps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const EditItineraryPage = () => {
  const { recommendation_trip_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [center, setCenter] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showAllDays, setShowAllDays] = useState(true);
  const [loading, setLoading] = useState(true);
  const [newPlaceName, setNewPlaceName] = useState(""); // 새로운 장소 이름 입력 상태
  const [markers, setMarkers] = useState([]); // 지도 마커 상태

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

    updateMarkers();

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

  // 마커 업데이트 함수
  const updateMarkers = () => {
    const newMarkers = data
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
    setMarkers(newMarkers);
  };

  // 장소 삭제 함수
  const handleDeletePlace = (dayNumber, scheduleIndex) => {
    const updatedData = { ...data };
    const day = updatedData.days.find(day => day.dayNumber === dayNumber);
    if (day) {
      day.schedule.splice(scheduleIndex, 1);
      // order 재정렬
      day.schedule.forEach((item, index) => {
        item.order = index + 1;
      });
      setData(updatedData);
      updateMarkers();
    }
  };

  // 장소 추가 함수
  const handleAddPlace = (dayNumber) => {
    if (!newPlaceName) return;

    // 실제 구현 시 장소 검색 API 등을 통해 장소 정보를 가져와야 합니다.
    const newPlace = {
      order: data.days.find(day => day.dayNumber === dayNumber).schedule.length + 1,
      startTime: "09:00",
      endTime: "10:00",
      place: {
        placeName: newPlaceName,
        address: "새로운 주소",
        latitude: "37.5665", // 예시 위도
        longitude: "126.9780", // 예시 경도
      },
    };

    const updatedData = { ...data };
    const day = updatedData.days.find(day => day.dayNumber === dayNumber);
    if (day) {
      day.schedule.push(newPlace);
      setData(updatedData);
      setNewPlaceName("");
      updateMarkers();
    }
  };

  // 여행 일정 저장 함수
  const handleSave = async () => {
    try {
      const requestData = {
        travelName: data.title,
        description: data.description || "여행 설명이 없습니다.",
        startDate: data.start_date,
        endDate: data.end_date,
        days: data.days.map((day) => ({
          dayNumber: day.dayNumber,
          date: day.date,
          schedules: day.schedule.map((schedule) => ({
            travelScheduleId: schedule.travelScheduleId || null,
            order: schedule.order,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            place: {
              travelPlaceId: schedule.place.travelPlaceId || null,
              placeName: schedule.place.place,
              address: schedule.place.address,
              latitude: schedule.place.latitude,
              longitude: schedule.place.longitude,
            },
          })),
        })),
      };

      await updateTravel(recommendation_trip_id, requestData);
      alert("여행 일정이 성공적으로 저장되었습니다!");
      navigate(`/register-itinerary/${recommendation_trip_id}`);
    } catch (error) {
      console.error("Error saving travel:", error);
      alert("여행 저장 중 문제가 발생했습니다.");
    }
  };

  // 돌아가기 함수
  const handleGoBack = () => {
    navigate(`/register-itinerary/${recommendation_trip_id}`);
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
                        {/* Delete button */}
                        <button
                          onClick={() => handleDeletePlace(day.dayNumber, index)}
                          className="ml-auto text-gray-500 hover:text-red-500"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {/* Add new place */}
                  <div className="flex items-center mt-4">
                    <input
                      type="text"
                      value={newPlaceName}
                      onChange={(e) => setNewPlaceName(e.target.value)}
                      placeholder="새로운 장소 추가"
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleAddPlace(day.dayNumber)}
                      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      +
                    </button>
                  </div>
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
                          {/* Delete button */}
                          <button
                            onClick={() => handleDeletePlace(day.dayNumber, index)}
                            className="ml-auto text-gray-500 hover:text-red-500"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    {/* Add new place */}
                    <div className="flex items-center mt-4">
                      <input
                        type="text"
                        value={newPlaceName}
                        onChange={(e) => setNewPlaceName(e.target.value)}
                        placeholder="새로운 장소 추가"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleAddPlace(day.dayNumber)}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
        </div>
      </div>

      {/* Right Buttons Section */}
      <div className="w-[10%] bg-white flex flex-col items-center p-4 gap-4 pt-[80px]">
        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600 text-lg font-semibold"
        >
          돌아가기
        </button>
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-6 px-10 rounded-lg shadow hover:bg-blue-600 text-lg font-semibold"
        >
          저장
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

export default EditItineraryPage;
