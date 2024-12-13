// src/components/FriendInvitePopup.js

import React, { useState } from 'react';
import { sendInvitation } from '../api/travel-service/invitations'; // API 호출 함수 import

const FriendInvitePopup = ({ onClose, travelId }) => {
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 초대 요청 핸들러
  const handleInvite = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await sendInvitation(travelId, nickname.trim());
      alert(`${nickname}님을 초대했습니다!`);
      setNickname(''); // 입력 필드 초기화
    } catch (error) {
      console.error('초대 실패:', error);
      alert('초대에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 닉네임 입력 필드 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {/* 최대 초대 인원 안내 */}
        <p className="text-sm text-gray-500 mb-4">최대 6명까지 초대 가능합니다.</p>

        {/* 초대 버튼 */}
        <button
          className="w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={handleInvite}
          disabled={isLoading}
        >
          {isLoading ? '초대 중...' : '초대하기'}
        </button>
      </div>
    </div>
  );
};

export default FriendInvitePopup;