import React, { useState, useEffect } from 'react';
import { gotInvitations, updateInvitationStatus } from '../../api/travel-service/invitations';

import getImageForLocation from '../../utils/getImageForLocation'; // 이미지 매핑 유틸리티 추가
import InvitedUser from '../../assets/images/InvitedUser.png';

const GotInvitationTab = ({ currentUserNickname = 'JAY' }) => {
  const [loading, setLoading] = useState(true);
  const [invitationsList, setInvitationsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const invitations = await gotInvitations();
        setInvitationsList(invitations);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAcceptInvitation = async (invitationId, travelId) => {
    try {
      await updateInvitationStatus(travelId, 'ACCEPTED');
      setInvitationsList((prev) =>
        prev.map((inv) =>
          inv.invitationId === invitationId ? { ...inv, invitationStatus: 'ACCEPTED' } : inv
        )
      );
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const handleRejectInvitation = async (invitationId, travelId) => {
    try {
      await updateInvitationStatus(travelId, 'REJECTED');
      setInvitationsList((prev) =>
        prev.map((inv) =>
          inv.invitationId === invitationId ? { ...inv, invitationStatus: 'REJECTED' } : inv
        )
      );
    } catch (error) {
      console.error('Error rejecting invitation:', error);
    }
  };

  const renderInvitations = (invitations) => {
    if (loading) {
      return <p className="text-gray-500 text-center">Loading...</p>;
    }

    if (!Array.isArray(invitations) || invitations.length === 0) {
      return (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400 text-lg font-semibold">받은 초대가 없습니다.</p>
        </div>
      );
    }

    return invitations.map((invitation) => {
      const { travelId, invitationId, invitationMessage, startDate, endDate, invitedNick } =
        invitation;


      // invitationMessage에서 지역명 기반으로 이미지 선택
      const invitationImage = getImageForLocation(invitationMessage);

      return (
        <div
          key={invitationId}
          className="flex items-center justify-between border-b p-6 hover:bg-gray-100 relative"
          style={{ minHeight: '150px' }}
        >
          {/* 이미지 */}
          <img

            src={invitationImage} // 지역 이미지 사용
            alt="Invitation"
            className="w-36 h-36 rounded-md object-cover flex-shrink-0"
          />

          {/* 초대 메시지 및 세부 정보 */}
          <div className="flex flex-col justify-between h-full ml-6 flex-grow">
            {/* 타이틀 (상단) */}
            <h3 className="font-bold text-lg text-gray-800 mb-8">{invitationMessage}</h3>

            {/* 여행 일정 (중단) */}
            <p className="font-bold text-sm text-gray-600 mb-8">
              {startDate} ~ {endDate}
            </p>

            {/* 초대한 사람 (하단) */}

            <p className="font-bold text-sm text-blue-600 flex items-center">
              <img
                src={InvitedUser}
                alt="InvitedUser"
                className="w-5 h-5 rounded-md object-cover inline-block mr-2"
              />
              {invitedNick}
            </p>
          </div>

          {/* 상태 버튼 */}
          <div className="absolute bottom-8 right-4 flex items-center gap-6">
            {/* 거절 버튼 */}
            <button
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 px-12 rounded-full text-sm font-medium shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRejectInvitation(invitationId, travelId);
              }}
            >
              거절
            </button>

            {/* 수락 버튼 */}
            <button
              className="bg-blue-100 text-blue-600 hover:bg-blue-200 py-3 px-12 rounded-full text-sm font-medium shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleAcceptInvitation(invitationId, travelId);
              }}
            >
              수락
            </button>
          </div>
        </div>
      );
    });
  };

  return <div className="p-4">{renderInvitations(invitationsList)}</div>;
};


export default GotInvitationTab;
