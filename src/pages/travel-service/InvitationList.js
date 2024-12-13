import React, { useState } from 'react';
import SentInvitationTab from './SentInvitationTab';
import GotInvitationTab from './GotInvitationTab';

const InvitationList = () => {
  const [activeTab, setActiveTab] = useState('got'); // 기본값 'got'
  const travelId = 1; // 예시용 travelId, 실제 구현에서는 동적으로 받아옴

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
      <div className="flex justify-between items-center border-b mb-6 gap-16">
        <button
          onClick={() => setActiveTab('got')}
          className={`pb-2 ${
            activeTab === 'got'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          초대받은 목록
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`pb-2 ${
            activeTab === 'sent'
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500'
          }`}
        >
          초대한 목록
        </button>
      </div>

      {/* 초대 리스트 */}
      <div className="invitation-list">
        {activeTab === 'got' && <GotInvitationTab />}
        {activeTab === 'sent' && <SentInvitationTab travelId={travelId} />}
      </div>
    </div>
  );
};

export default InvitationList;
