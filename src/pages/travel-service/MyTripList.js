import React, { useState, useEffect } from 'react';
import UnregisteredTripsTab from './UnregisteredTripsTab';
import RegisteredTripsTab from './RegisteredTripsTab';
import CompletedTripsTab from './CompletedTripsTab';
import GetUserProfileApi from '../../api/blog-services/profile/GetUserProfile';
import {useRecoilValue} from "recoil";
import loginState from '../../recoil/atoms/loginState';

const MyTripList = () => {
  const [activeTab, setActiveTab] = useState('unregistered');
  const [profileData, setProfileData] = useState({}); // 프로필 데이터를 저장할 상태
  const [error, setError] = useState(null); // 에러 메시지 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const { userId } = useRecoilValue(loginState);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
         // 사용자 ID 가져오기
        if (!userId) throw new Error('사용자 ID가 없습니다.');

        const userProfile = await GetUserProfileApi(userId); // 프로필 정보 API 호출

        const {profileImage, nickname, mbti, mbtiDescription} = userProfile.data;
        setProfileData({
          profileImage,
          nickname,
          mbti,
          mbtiDescription,
        }); // 프로필 데이터 설정
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* 프로필 섹션 */}

      <div className="flex flex-col items-center mt-8 mb-6">
        <img
          src={profileData?.profileImage || `${process.env.PUBLIC_URL}/assets/images/사진.jpg`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h1 className="text-xl font-bold mt-4">{profileData?.nickname || '사용자'}님 </h1>
        <p className="text-sm font-semibold text-blue-500 mt-2">
        {profileData?.mbti
            ? `${profileData.mbti} (${profileData.mbtiDescription || 'MBTI 설명 없음'})`
            : 'MBTI 정보를 가져올 수 없습니다.'}
        </p>
        
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