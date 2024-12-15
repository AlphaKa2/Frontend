import React, { useState, useEffect } from 'react';
import {
  fetchUnregisteredTrips,
  fetchRegisteredTrips,
  fetchCompletedTrips,
} from '../../api/ai-service/trips'; // API 파일 import
import { deleteTripById } from '../../api/ai-service/trip-id';
import { useNavigate } from 'react-router-dom'; // useNavigate import

const MyTripList = () => {
  const [activeTab, setActiveTab] = useState('unregistered');
  const [unregisteredTrips, setUnregisteredTrips] = useState([]);
  const [registeredTrips, setRegisteredTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 데이터 가져오기
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);

        if (activeTab === 'unregistered') {
          const response = await fetchUnregisteredTrips();
          setUnregisteredTrips(response.data);
        } //else if (activeTab === 'registered') {
          //const response = await fetchRegisteredTrips();
          //setRegisteredTrips(response.data);
        //} else if (activeTab === 'completed') {
          //const response = await fetchCompletedTrips();
          //setCompletedTrips(response.data);
        //}
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [activeTab]);

  const handleViewDetails = (recommendation_trip_id) => {
    navigate(`/itinerary/${recommendation_trip_id}`); // ItineraryPage로 이동
  };

  const handleDelete = async (recommendation_trip_id) => {
    if (window.confirm('정말 이 여행을 삭제하시겠습니까?')) {
      try {
        await deleteTripById(recommendation_trip_id);
        alert('여행이 성공적으로 삭제되었습니다.');

        // 삭제 후 목록 갱신
        if (activeTab === 'unregistered') {
          setUnregisteredTrips((prevTrips) =>
            prevTrips.filter((trip) => trip.recommendation_trip_id !== recommendation_trip_id)
          );
        } else if (activeTab === 'registered') {
          setRegisteredTrips((prevTrips) =>
            prevTrips.filter((trip) => trip.recommendation_trip_id !== recommendation_trip_id)
          );
        } else if (activeTab === 'completed') {
          setCompletedTrips((prevTrips) =>
            prevTrips.filter((trip) => trip.recommendation_trip_id !== recommendation_trip_id)
          );
        }
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

    return trips.map((trip) => (
      <div
        key={trip.id}
        className="flex items-center justify-between border-b p-4 hover:bg-gray-100"
      >
        <div className="flex items-center gap-4">
          <img
            src={trip.image || `${process.env.PUBLIC_URL}/default-trip.jpg`}
            alt={trip.title}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">{trip.title}</h3>
            <p className="text-sm text-gray-500">
              {trip.startDate} ~ {trip.endDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleViewDetails(trip.recommendation_trip_id)} // 클릭 이벤트 추가
          >
            상세 보기
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(trip.recommendation_trip_id)}
          >
            삭제
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-6">
      {/* 프로필 섹션 */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/사진.jpg`}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold mt-4">JAY</h1>
        <p className="text-sm text-gray-500 mt-2">ACLJ (자유로운 탐험가)</p>
      </div>

      {/* 탭 섹션 */}
      <div className="flex justify-between items-center border-b mb-6">
        <button
          onClick={() => setActiveTab('unregistered')}
          className={`pb-2 ${
            activeTab === 'unregistered'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          미등록 여행
        </button>
        <button
          onClick={() => setActiveTab('registered')}
          className={`pb-2 ${
            activeTab === 'registered'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          등록한 여행
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-2 ${
            activeTab === 'completed'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          다녀온 여행
        </button>
      </div>

      {/* 여행 리스트 */}
      <div className="trip-list">
        {activeTab === 'unregistered' && renderTrips(unregisteredTrips)}
        {activeTab === 'registered' && renderTrips(registeredTrips)}
        {activeTab === 'completed' && renderTrips(completedTrips)}
      </div>
    </div>
  );
};

export default MyTripList;