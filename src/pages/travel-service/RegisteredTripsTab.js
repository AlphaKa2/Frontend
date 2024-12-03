// src/pages/travel-service/RegisteredTripsTab.js

import React, { useState, useEffect } from 'react';
import { fetchRegisteredTrips } from '../../api/ai-service/trips';
import { deleteTripById } from '../../api/ai-service/trip-id';
import { useNavigate } from 'react-router-dom';

import SeoulImage from '../../assets/images/YoutubeTest.png';
import TrashCanImage from '../../assets/images/Trash 3.png';
import AiImage from '../../assets/images/Ai-generate.png';
import YoutubeLogo from '../../assets/images/YoutubeLogo.png';
import UserPlusImage from '../../assets/images/User plus.png'; // 친구 초대하기 이미지 import

const RegisteredTripsTab = () => {
  const [registeredTrips, setRegisteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const response = await fetchRegisteredTrips();
        setRegisteredTrips(response.data.data); // 응답 데이터 구조에 맞게 수정
      } catch (error) {
        console.error('Error fetching registered trips:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleViewDetails = (travelId) => {
    navigate(`/registered-trip/${travelId}`); // 필요한 경로로 수정하세요
  };

  const handleDelete = async (travelId) => {
    if (window.confirm('정말 이 여행을 삭제하시겠습니까?')) {
      try {
        await deleteTripById(travelId);
        alert('여행이 성공적으로 삭제되었습니다.');

        // 삭제 후 목록 갱신
        setRegisteredTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.travelId !== travelId)
        );
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('여행 삭제 중 문제가 발생했습니다.');
      }
    }
  };

  // 친구 초대하기 버튼 클릭 핸들러
  const handleInviteFriend = (travelId) => {
    // 친구 초대 기능 구현 (필요에 따라 구현하세요)
    alert(`여행 ID ${travelId}에 친구를 초대합니다.`);
  };

  // 날짜 형식 변환 함수
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  const renderTrips = (trips) => {
    if (loading) {
      return <p className="text-gray-500 text-center">Loading...</p>;
    }

    if (!trips || trips.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400 text-lg font-semibold">등록한 여행이 없습니다.</p>
        </div>
      );
    }

    return trips.map((trip) => {
      // 생성일 또는 업데이트일 결정
      const dateToShow = trip.updatedAt ? trip.updatedAt : trip.createdAt;
      const dateLabel = trip.updatedAt ? '업데이트일' : '생성일';

      return (
        <div
          key={trip.travelId}
          className="flex items-center justify-between border-b p-8 hover:bg-gray-100 cursor-pointer relative"
          style={{ minHeight: '150px', height: '150px' }}
          onClick={() => handleViewDetails(trip.travelId)}
        >
          {/* 우측 상단에 날짜 표시 */}
          <div className="absolute top-4 right-4 text-sm text-gray-500">
            <p>
              {dateLabel}: {formatDate(dateToShow)}
            </p>
          </div>

          <div className="flex items-center gap-4 h-full">
            <img
              src={SeoulImage} // 필요에 따라 이미지 경로 수정
              alt={trip.travelName}
              className="w-32 h-32 rounded-md object-cover flex-shrink-0"
            />

            <div className="relative" style={{ top: '-40px' }}>
              <div className="flex items-center gap-2">
                {trip.type === 'AI_GENERATED' && (
                  <img src={AiImage} alt="AI Generated" className="w-10 h-6" />
                )}
                {trip.type === 'YOUTUBE_GENERATED' && (
                  <img src={YoutubeLogo} alt="YouTube Generated" className="w-10 h-7" />
                )}
                <h3 className="font-bold mb-6 mt-5" style={{ fontSize: '1.3rem' }}>
                  {trip.travelName}
                </h3>
              </div>
              <p className="font-bold text-sm text-gray-600">
                {trip.startDate} ~ {trip.endDate}
              </p>
              {/* 참여자 이름 표시 */}
              <p className="text-sm text-gray-500 mt-2">
                참여자: {trip.participants.join(', ')}
              </p>
            </div>
          </div>

          {/* 친구 초대하기 및 삭제 버튼 */}
          <div className="flex items-center gap-2 mt-20">
            {/* 친구 초대하기 버튼 */}
            <button
              className="flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation(); // 카드 클릭 이벤트와 버튼 클릭 이벤트 분리
                handleInviteFriend(trip.travelId);
              }}
            >
              <img
                src={UserPlusImage}
                alt="친구 초대하기"
                className="w-8 h-8 hover:opacity-80 transition duration-200"
              />
            </button>

            {/* 삭제 버튼 */}
            <button
              className="flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation(); // 카드 클릭 이벤트와 버튼 클릭 이벤트 분리
                handleDelete(trip.travelId);
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

  return <div>{renderTrips(registeredTrips)}</div>;
};

export default RegisteredTripsTab;
