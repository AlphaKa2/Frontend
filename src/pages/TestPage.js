import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 33.4996,
  lng: 126.5312,
};

const markers = [
  { id: 1, lat: 33.4996, lng: 126.5312, label: "1" },
  { id: 2, lat: 33.4886, lng: 126.4982, label: "2" },
  { id: 3, lat: 33.4890, lng: 126.5400, label: "3" },
  { id: 4, lat: 33.5062, lng: 126.4913, label: "4" },
];

const itinerary = [
  {
    day: 1,
    date: "2024-12-10",
    schedule: [
      { order: 1, time: "09:00-10:30", place: "성산일출봉", note: "" },
      { order: 2, time: "11:00-12:30", place: "섭지코지", note: "" },
      { order: 3, time: "14:00-15:30", place: "우도", note: "" },
      { order: 4, time: "16:00-17:30", place: "표선해수욕장", note: "" },
    ],
  },
  {
    day: 2,
    date: "2024-12-11",
    schedule: [
      { order: 1, time: "09:00-10:30", place: "한라산 국립공원", note: "" },
      { order: 2, time: "11:00-12:30", place: "카멜리아 힐", note: "" },
      { order: 3, time: "14:00-15:30", place: "제주 신비의 도로", note: "" },
      { order: 4, time: "16:00-17:30", place: "협재 해수욕장", note: "" },
    ],
  },
];

const TestPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="flex h-screen">
      {/* Left: Google Map Section */}
      <div className="w-[60%] h-full">
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={11}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                label={{
                  text: marker.label,
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Right: Itinerary Section */}
      <div className="w-[30%] bg-white shadow-lg flex flex-col">
        {/* Title Section */}
        <div className="sticky top-0 bg-white z-10 p-4 shadow-md">
          <h1 className="text-lg font-bold text-center">제주도</h1>
          <p className="text-sm text-gray-500 text-center">
            2024.12.10 - 2024.12.11
          </p>
        </div>

        {/* Itinerary List */}
        <div className="flex-1 overflow-y-auto p-4">
          {itinerary
            .filter((day) => day.day === selectedDay)
            .map((day) => (
              <div key={day.day}>
                <h2 className="text-md font-semibold mb-4">
                  {`${day.day}일차`} - {day.date}
                </h2>
                {day.schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 mb-4 p-3 border rounded-lg shadow-sm"
                  >
                    <div className="w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full">
                      {item.order}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="시간 입력"
                        defaultValue={item.time}
                        className="w-full p-2 border rounded-md mb-2"
                      />
                      <input
                        type="text"
                        placeholder="장소 입력"
                        defaultValue={item.place}
                        className="w-full p-2 border rounded-md mb-2"
                      />
                      <input
                        type="text"
                        placeholder="노트 입력"
                        defaultValue={item.note}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <button className="w-6 h-6">
                      <img
                        src="/assets/images/trash-icon.png"
                        alt="Delete"
                        className="w-full h-full"
                      />
                    </button>
                  </div>
                ))}
              </div>
            ))}

          {/* Additional Input Section */}
          <div className="flex items-start gap-4 p-3 border rounded-lg shadow-sm mt-6">
            <div className="w-6 h-6 bg-gray-300 text-white flex items-center justify-center rounded-full">
              +
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="시간 입력"
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="장소 입력"
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="노트 입력"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button className="w-6 h-6">
              <img
                src="/assets/images/trash-icon.png"
                alt="Delete"
                className="w-full h-full"
              />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
          저장
        </button>
      </div>

      {/* Right Buttons Section */}
      <div className="w-[10%] bg-gray-100 flex flex-col items-center p-4 gap-4 pt-[80px]">
        {itinerary.map((day) => (
          <button
            key={day.day}
            onClick={() => setSelectedDay(day.day)}
            className={`py-2 px-4 rounded-lg shadow ${
              selectedDay === day.day
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {`${day.day}일차`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestPage;