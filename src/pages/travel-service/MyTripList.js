// src/pages/travel-service/MyTripList.js

import React, { useState } from 'react';
import UnregisteredTripsTab from './UnregisteredTripsTab';
import RegisteredTripsTab from './RegisteredTripsTab';
import CompletedTripsTab from './CompletedTripsTab';

const MyTripList = () => {
  const [activeTab, setActiveTab] = useState('unregistered');

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
        {activeTab === 'unregistered' && <UnregisteredTripsTab />}
        {activeTab === 'registered' && <RegisteredTripsTab />}
        {activeTab === 'completed' && <CompletedTripsTab />}
      </div>
    </div>
  );
};

export default MyTripList;
