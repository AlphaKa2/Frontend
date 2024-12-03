// src/components/FriendInvitePopup.js

import React, { useState } from 'react';
import { searchFriend, inviteFriend } from '../api/travel-service/invitations'; // API 호출 함수 import

const FriendInvitePopup = ({ onClose }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 검색 요청 핸들러
  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setIsLoading(true);
    try {
      const data = await searchFriend(searchInput.trim());
      setSearchResult(data || null); // 검색 결과 설정
    } catch (error) {
      console.error('검색 실패:', error);
      setSearchResult(null); // 검색 실패 시 결과 없음으로 설정
    } finally {
      setIsLoading(false);
    }
  };

  // 초대 요청 핸들러
  const handleInvite = async (nickname) => {
    try {
      await inviteFriend(nickname);
      alert(`${nickname}님을 초대했습니다!`);
      setSearchResult((prev) => ({ ...prev, isInvited: true })); // 초대 상태 업데이트
    } catch (error) {
      console.error('초대 실패:', error);
      alert('초대에 실패했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 검색 입력 필드 */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-blue-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="absolute top-0 right-0 px-4 py-2 text-white bg-blue-500 rounded-r-full hover:bg-blue-600"
            onClick={handleSearch}
            disabled={isLoading}
          >
            검색
          </button>
        </div>

        {/* 최대 초대 인원 안내 */}
        <p className="text-sm text-gray-500 mb-4">최대 6명까지 초대 가능합니다.</p>

        {/* 검색 결과 표시 */}
        {searchResult ? (
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <img
                src={searchResult.profileImage || '/default-profile.png'}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <p className="font-semibold">{searchResult.nickname}</p>
            </div>
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                searchResult.isInvited
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={() => handleInvite(searchResult.nickname)}
              disabled={searchResult.isInvited}
            >
              <img
                src={searchResult.isInvited ? '/check-icon.png' : '/invite-icon.png'}
                alt="초대 상태 아이콘"
                className="w-5 h-5"
              />
            </button>
          </div>
        ) : searchResult === null && !isLoading ? (
          <p className="text-center text-gray-500">존재하지 않은 닉네임입니다.</p>
        ) : null}
      </div>
    </div>
  );
};

export default FriendInvitePopup;
