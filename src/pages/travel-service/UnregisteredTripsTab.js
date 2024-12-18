// src/pages/travel-service/UnregisteredTripsTab.js

import React, { useState, useEffect } from 'react';
import { fetchUnregisteredTrips } from '../../api/ai-service/trips';
import { deleteTripById } from '../../api/ai-service/trip-id';
import { useNavigate } from 'react-router-dom';
import getImageForLocation from '../../utils/getImageForLocation'; // 유틸리티 함수 import
import TrashCanImage from '../../assets/images/Trash 3.png';
import AiImage from '../../assets/images/Ai-generate.png';
import YoutubeLogo from '../../assets/images/YoutubeLogo.png';

const UnregisteredTripsTab = () => {
  const [unregisteredTrips, setUnregisteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await fetchUnregisteredTrips();
        setUnregisteredTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleViewDetails = (recommendation_trip_id) => {
    navigate(`/itinerary/${recommendation_trip_id}`);
  };

  const handleDelete = async (recommendation_trip_id) => {
    if (window.confirm('정말 이 여행을 삭제하시겠습니까?')) {
      try {
        await deleteTripById(recommendation_trip_id);
        alert('여행이 성공적으로 삭제되었습니다.');

        setUnregisteredTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.recommendation_trip_id !== recommendation_trip_id)
        );
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('여행 삭제 중 문제가 발생했습니다.');
      }
    }
  };

  const renderTrips = (trips) => {
    if (loading) {
      return <p className="text-gray-500 text-center">Loading...</p>;
    }

    if (!trips || trips.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400 text-lg font-semibold">내 여행이 없습니다.</p>
        </div>
      );
    }

    return trips.map((trip) => {
      const tripImage = getImageForLocation(trip.title); // 유틸리티 함수 호출

      return (
        <div
          key={trip.id}
          className="flex items-center justify-between border-b p-8 hover:bg-gray-100 cursor-pointer"
          style={{ minHeight: '150px', height: '150px' }}
          onClick={() => handleViewDetails(trip.recommendation_trip_id)}
        >
          <div className="flex items-center gap-4 h-full">
            <img
              src={tripImage}
              alt={trip.title}
              className="w-32 h-32 rounded-md object-cover flex-shrink-0"
            />

            <div className="relative" style={{ top: '-40px' }}>
              <div className="flex items-center gap-2">
                {trip.recommendation_type === 'AI-GENERATED' && (
                  <img src={AiImage} alt="AI Generated" className="w-10 h-6" />
                )}
                {trip.recommendation_type === 'YOUTUBER_FOLLOW' && (
                  <img src={YoutubeLogo} alt="YouTuber Follow" className="w-10 h-7" />
                )}
                <h3 className="font-bold mb-6 mt-5" style={{ fontSize: '1.3rem' }}>
                  {trip.title}
                </h3>
              </div>
              <p className="font-bold text-sm text-gray-600">
                {trip.start_date} ~ {trip.end_date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-20">
            <button
              className="flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(trip.recommendation_trip_id);
              }}
            >
              <img
                src={TrashCanImage}
                alt="삭제"
                className="w-8 h-8 hover:opacity-80 transition duration-200"
              />
            </button>
          </div>
        </div>
      );
    });
  };

  return <div>{renderTrips(unregisteredTrips)}</div>;
};

export default UnregisteredTripsTab;