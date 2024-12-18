import React, { useState, useEffect } from 'react';
import SentInvitationTab from './SentInvitationTab';
import GotInvitationTab from './GotInvitationTab';
import GetUserProfileApi from '../../api/blog-services/profile/GetUserProfile';
import { useRecoilValue } from 'recoil';
import loginState from '../../recoil/atoms/loginState';

const InvitationList = () => {
  const [activeTab, setActiveTab] = useState('got'); // 기본값 'got'
  const [profileData, setProfileData] = useState(null); // 프로필 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const { userId } = useRecoilValue(loginState); // Recoil에서 userId 가져오기
  const travelId = 1; // 예시용 travelId, 실제 구현에서는 동적으로 받아옴

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!userId) throw new Error('사용자 ID가 없습니다.');
        const response = await GetUserProfileApi(userId); // 사용자 프로필 데이터 가져오기
        const { profileImage, nickname, mbti, mbtiDescription } = response.data;

        setProfileData({
          profileImage,
          nickname,
          mbti,
          mbtiDescription,
        });
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('프로필 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        프로필 정보를 불러오는 중입니다...
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
        <h1 className="text-xl font-bold mt-4">
          {profileData?.nickname || '사용자'}님
        </h1>
        <p className="text-sm font-semibold text-blue-500 mt-2">
          {profileData?.mbti
            ? `${profileData.mbti} (${profileData.mbtiDescription || 'MBTI 설명 없음'})`
            : 'MBTI 정보를 가져올 수 없습니다.'}
        </p>
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
