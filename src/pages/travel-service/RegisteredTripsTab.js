import React, { useState, useEffect } from 'react';
import { fetchRegisteredTrips } from '../../api/ai-service/trips';

import { DeleteTravelApi } from '../../api/ai-service/trip-id';
import { participantsList } from '../../api/travel-service/participants';
import { useNavigate } from 'react-router-dom';
import { updateTravelStatus } from '../../api/travel-service/complete-travel';
import FriendInvitePopup from '../../components/FriendInvitePopup';

import getImageForLocation from '../../utils/getImageForLocation'; // 이미지 매핑 함수 추가

import AiImage from '../../assets/images/Ai-generate.png';
import YoutubeLogo from '../../assets/images/YoutubeLogo.png';
import InvitedUser from '../../assets/images/InvitedUser.png';
import CheckSquareImage from '../../assets/images/Check square.png';
import UserPlusImage from '../../assets/images/User plus.png';
import TrashCanImage from '../../assets/images/Trash 3.png';

const RegisteredTripsTab = ({ currentUserNickname }) => {
  const [registeredTrips, setRegisteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [selectedTravelId, setSelectedTravelId] = useState(null);
  const [participantsData, setParticipantsData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const trips = await fetchRegisteredTrips();
        setRegisteredTrips(trips);

        const participantsPromises = trips.map(async (trip) => {
          const participants = await participantsList(trip.travelId);
          return { travelId: trip.travelId, participants };
        });

        const participantsResults = await Promise.all(participantsPromises);

        const participantsMap = participantsResults.reduce((acc, { travelId, participants }) => {
          acc[travelId] = participants.map((p) => p.nickname);
          return acc;
        }, {});

        setParticipantsData(participantsMap);
      } catch (error) {
        console.error('Error fetching registered trips or participants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleCompleteTravel = async (travelId) => {
    if (window.confirm('이 여행을 완료로 표시하시겠습니까?')) {
      try {
        await updateTravelStatus(travelId, 'COMPLETED');
        alert('여행이 완료되었습니다.');
        navigate('/completed-trips');
      } catch (error) {
        console.error('Error completing travel:', error);
        alert('여행 완료 처리 중 문제가 발생했습니다.');
      }
    }
  };

  const handleViewDetails = (travelId) => {
    navigate(`/register-itinerary/${travelId}`);
  };

  const handleDelete = async (travelId) => {
    if (window.confirm("정말 이 여행을 삭제하시겠습니까?")) {
      try {
        const result = await DeleteTravelApi(travelId);
        if (result.error) {
          // 401 에러에 대한 사용자 경고
          alert(result.message);
          return; // 더 이상의 로직 실행 중단
        }
        alert("여행이 성공적으로 삭제되었습니다.");
        setRegisteredTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.travelId !== travelId)
        );
      } catch (error) {

        console.error("Error deleting trip:", error);
        alert("여행 삭제 중 문제가 발생했습니다.");
      }
    }
  };
  
  

  const toggleMenu = (travelId) => {
    setIsMenuOpen(isMenuOpen === travelId ? null : travelId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
      const dateToShow = trip.updatedAt ? trip.updatedAt : trip.createdAt;
      const formattedDate = formatDate(dateToShow);
      const dateLabel = trip.updatedAt ? '수정일' : '생성일';

      // `title`과 `travelName` 모두 고려하여 이미지 선택
      const tripImage = getImageForLocation(trip.title || trip.travelName);

      const participantList = participantsData[trip.travelId];
      const displayParticipants =
        participantList && participantList.length > 0
         ? participantList.join(', ')
         : currentUserNickname;

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
              <div className="flex items-center gap-2 mb-4">
                {trip.type === 'AI_GENERATED' && (
                  <img src={AiImage} alt="AI Generated" className="w-10 h-6" />
                )}
                {trip.type === 'YOUTUBE_GENERATED' && (
                  <img src={YoutubeLogo} alt="YouTube Generated" className="w-10 h-7" />
                )}
                <h3 className="font-bold text-lg">{trip.travelName}</h3>
              </div>


              <p className="font-bold text-sm text-gray-600 mb-6">
                {trip.startDate} ~ {trip.endDate}
              </p>


              <p className="font-bold text-sm text-blue-600">
                <img
                  src={InvitedUser}
                  alt={trip.travelName}
                  className="w-4 h-4 rounded-md object-cover flex-shrink-0 inline-block mr-2"
                />
                : {displayParticipants}
              </p>
            </div>
          </div>

          <button
            className="absolute top-8 right-6 text-black hover:text-gray-700"
            style={{ fontSize: '32px', fontWeight: 'bold' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(trip.travelId);
            }}
          >
            ⋮
          </button>

          {isMenuOpen === trip.travelId && (

            <div className="absolute top-10 right-8 bg-white border rounded shadow-lg py-2 w-40"
            style={{ zIndex: 9990 }}>
              <button
                className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 w-full text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteTravel(trip.travelId);
                }}
              >
                <img src={CheckSquareImage} alt="여행 완료" className="w-5 h-5 mr-2" />
                여행 완료
              </button>
              <button
                className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 w-full text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTravelId(trip.travelId);
                  setIsMenuOpen(false);
                }}
              >
                <img src={UserPlusImage} alt="친구 추가" className="w-5 h-5 mr-2" />
                초대하기
              </button>
              <button

            className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 w-full text-left"
            
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(trip.travelId); // 삭제 버튼에 함수 연결
            }}
          >
            <img src={TrashCanImage} alt="삭제" className="w-5 h-5 mr-2" />
                삭제
              </button>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      {renderTrips(registeredTrips)}
      {selectedTravelId && (
        <FriendInvitePopup
          onClose={() => setSelectedTravelId(null)}
          travelId={selectedTravelId}
        />
      )}
    </div>
  );
};

export default RegisteredTripsTab;
