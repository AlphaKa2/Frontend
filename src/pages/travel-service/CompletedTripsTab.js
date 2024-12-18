import React, { useState, useEffect } from 'react';
import { fetchCompletedTrips } from '../../api/ai-service/trips';
import { fetchInvitations } from '../../api/travel-service/invitations';
import { useNavigate } from 'react-router-dom';

import getImageForLocation from '../../utils/getImageForLocation';

import SeoulImage from '../../assets/images/YoutubeTest.png';
import AiImage from '../../assets/images/Ai-generate.png';
import YoutubeLogo from '../../assets/images/YoutubeLogo.png';
import InvitedUser from '../../assets/images/InvitedUser.png';

const CompletedTripsTab = ({ currentUserNickname }) => {
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const trips = await fetchCompletedTrips(); // fetchCompletedTrips()는 completedTrips 배열 반환
        setCompletedTrips(trips); // trips 바로 할당
      } catch (error) {
        console.error('Error fetching completed trips:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTrips();
  }, []);

  const fetchTripInvitations = async (travelId) => {
    try {
      const response = await fetchInvitations();
      const filteredInvitations = response.filter(
        (invitation) => invitation.travelId === travelId
      );
      const invitedNicknames = filteredInvitations.map((inv) => inv.nickname);

      setInvitations((prev) => ({
        ...prev,
        [travelId]: [currentUserNickname, ...invitedNicknames],
      }));
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };

  const handleViewDetails = async (travelId) => {
    try {
      // 데이터를 백엔드에서 가져온 뒤 상세 페이지로 이동
      const tripDetails = completedTrips.find((trip) => trip.travelId === travelId);
      if (tripDetails) {
        navigate(`/completed-itinerary/${travelId}`, { state: { tripDetails } });
      }
    } catch (error) {
      console.error('Error navigating to details:', error);
      alert('상세 페이지로 이동 중 문제가 발생했습니다.');
    }
  };

  const renderTrips = (trips) => {
    if (loading) {
      return <p className="text-gray-500 text-center">Loading...</p>;
    }

    if (!trips || trips.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400 text-lg font-semibold">완료된 여행이 없습니다.</p>
        </div>
      );
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return trips.map((trip) => {
      const dateToShow = trip.updatedAt ? trip.updatedAt : trip.createdAt;
      const formattedDate = formatDate(dateToShow); // 날짜 포맷 변환
      const dateLabel = trip.updatedAt ? '수정일' : '생성일';

      const tripImage = getImageForLocation(trip.title || trip.travelName);

      return (
        <div
          key={trip.travelId}
          className="flex items-center justify-between border-b p-8 hover:bg-gray-100 cursor-pointer relative"
          style={{ minHeight: '150px', height: '150px' }}
          onClick={() => handleViewDetails(trip.travelId)}
        >
          <div className="absolute top-2 right-20 text-sm text-gray-500">
            <p>
            {dateLabel}: {formattedDate}
            </p>
          </div>

          <div className="flex items-center gap-4 h-full">
            <img

              src={tripImage}
              alt={trip.travelName || trip.title}
              className="w-32 h-32 rounded-md object-cover flex-shrink-0"
            />

            <div className="flex flex-col justify-between h-full relative top-[-20px]">
              {/* 타이틀 */}
              <div className="flex items-center gap-2 mb-4">
                {trip.type === 'AI_GENERATED' && (
                  <img src={AiImage} alt="AI Generated" className="w-10 h-6" />
                )}
                {trip.type === 'YOUTUBE_GENERATED' && (
                  <img src={YoutubeLogo} alt="YouTube Generated" className="w-10 h-7" />
                )}
                <h3 className="font-bold text-lg">{trip.travelName}</h3>
              </div>

              {/* 여행 일정 */}
              <p className="font-bold text-sm text-gray-600 mb-6">
                {trip.startDate} ~ {trip.endDate}
              </p>

              {/* 참여자 명단 */}
              <p className="font-bold text-sm text-blue-600">
                <img
                  src={InvitedUser}
                  alt={trip.travelName}
                  className="w-4 h-4 rounded-md object-cover flex-shrink-0 inline-block mr-2"
                />
                : {invitations[trip.travelId]?.join(', ') || currentUserNickname}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div>{renderTrips(completedTrips)}</div>;
};

export default CompletedTripsTab;
