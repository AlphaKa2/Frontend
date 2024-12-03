// CompletedTripsTab.js
import React, { useState, useEffect } from 'react';
import { fetchCompletedTrips } from '../../api/ai-service/trips';
import { useNavigate } from 'react-router-dom';

const CompletedTripsTab = () => {
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await fetchCompletedTrips();
        setCompletedTrips(response.data);
      } catch (error) {
        console.error('Error fetching completed trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleViewDetails = (trip_id) => {
    navigate(`/completed-trip/${trip_id}`); // 다녀온 여행 상세 페이지로 이동 (필요에 따라 경로 수정)
  };

  const renderTrips = (trips) => {
    if (loading) {
      return <p className="text-gray-500 text-center">Loading...</p>;
    }

    if (!trips || trips.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400 text-lg font-semibold">다녀온 여행이 없습니다.</p>
        </div>
      );
    }

    return trips.map((trip) => (
      <div
        key={trip.id}
        className="flex items-center justify-between border-b p-8 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleViewDetails(trip.id)}
      >
        {/* 여행 정보 표시 */}
        <div>
          <h3 className="font-bold text-xl">{trip.title}</h3>
          <p className="text-sm text-gray-600">
            {trip.start_date} ~ {trip.end_date}
          </p>
        </div>
      </div>
    ));
  };

  return <div>{renderTrips(completedTrips)}</div>;
};

export default CompletedTripsTab;
