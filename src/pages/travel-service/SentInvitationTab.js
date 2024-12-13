import React, { useState, useEffect } from 'react';
import { fetchSentInvitations } from '../../api/travel-service/invitations';
import SeoulImage from '../../assets/images/YoutubeTest.png';
import InvitedUser from '../../assets/images/InvitedUser.png';

const SentInvitationTab = ({ travelId }) => {
  const [loading, setLoading] = useState(true);
  const [invitationsList, setInvitationsList] = useState([]);

  useEffect(() => {
    const loadInvitations = async () => {
      try {
        setLoading(true);
        const invitations = await fetchSentInvitations(travelId);
        setInvitationsList(invitations);
      } catch (error) {
        console.error('Error loading sent invitations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (travelId) {
      loadInvitations();
    } else {
      setLoading(false);
    }
  }, [travelId]);

  const renderInvitations = (invitations) => {
    if (loading) {
      return <p className="text-gray-500 text-center">Loading...</p>;
    }

    if (!Array.isArray(invitations) || invitations.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400 text-lg font-semibold">초대한 목록이 없습니다.</p>
        </div>
      );
    }

    return invitations.map((invitation) => {
      const { invitationId, invitationMessage, invitationStatus, nickname } = invitation;

      const statusText =
        invitationStatus === 'PENDING'
          ? '대기중...'
          : invitationStatus === 'ACCEPTED'
          ? '수락됨'
          : '거절됨';

      return (
        <div
          key={invitationId}
          className="flex items-center justify-between border-b p-8 hover:bg-gray-100 relative"
          style={{ minHeight: '150px', height: '150px' }} // CompletedTripsTab 크기와 동일하게 조정
        >
          {/* 초대 이미지 */}
          <div className="flex items-center gap-4">
            <img
              src={SeoulImage}
              alt="Invitation"
              className="w-32 h-32 rounded-md object-cover flex-shrink-0" // CompletedTripsTab 이미지 크기
            />

            {/* 초대 메시지 및 참여자 */}
            <div className="flex flex-col justify-between h-full">
              {/* 초대 메시지 */}
              <h3 className="font-bold text-lg text-gray-800 mb-16">{invitationMessage}</h3>

              {/* 초대받은 사람 */}
              <div className="flex items-center">
                <img
                  src={InvitedUser}
                  alt="InvitedUser"
                  className="w-5 h-5 rounded-md object-cover flex-shrink-0 inline-block mr-2" // CompletedTripsTab 아이콘 크기
                />
                <p className="font-bold text-sm text-blue-600">{nickname}</p>
              </div>
            </div>
          </div>

          {/* 상태 표시 */}
          <div
            className="absolute right-6 top-1/2 transform -translate-y-1/2 px-8 py-4 text-base rounded-full"
            style={{
              backgroundColor:
                invitationStatus === 'PENDING'
                  ? '#FFFAE5'
                  : invitationStatus === 'ACCEPTED'
                  ? '#E6FFEA'
                  : '#FFEAEA',
              color:
                invitationStatus === 'PENDING'
                  ? '#D97706'
                  : invitationStatus === 'ACCEPTED'
                  ? '#059669'
                  : '#B91C1C',
            }}
          >
            {statusText}
          </div>
        </div>
      );
    });
  };

  return <div className="p-4">{renderInvitations(invitationsList)}</div>;
};

export default SentInvitationTab;