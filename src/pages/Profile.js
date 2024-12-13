import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import loginState from "../recoil/atoms/loginState";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Profile = () => {
  const navigate = useNavigate();
  const writePage = () => {
    navigate("/blog-service/api/posts");
  };
  const goLoginPage = () => {
    navigate("/login");
  };
  const [profileData, setProfileData] = useState(null);
  const { isAuthenticated, nickname: userNickname } = useRecoilValue(loginState);
  const { userId: userId } = useRecoilValue(loginState);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`/user-service/users/${userId}/profile`);
        if (response.status === 200) {
          setProfileData(response.data.data); // API에서 가져온 태그 데이터를 상태에 저장
          console.log(response.data.data);
        } else {
          console.error("태그 데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("태그 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (userId) {
      fetchTags();
    }
  }, [userId]); 

  // 프로필 정보 로딩 중인 경우의 UI
  if (!profileData) {
    return (
      <div className="w-[20%] h-screen px-12 py-12">
        <div className="border-[0.1px] border-gray-400 shadow-md rounded-2xl h-[90%] p-4 mt-16 text-center">
          <p className="text-gray-500">프로필 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  const renderButtons = () => {
    if (isAuthenticated) {
      if (profileData.nickname === userNickname) {
        // 로그인 상태이고, 본인의 프로필인 경우
        return (
          <>
            <button className="text-black border-[1px] border-black rounded-full px-4 py-1 font-semibold">
              프로필 수정
            </button>
            <button
              className="text-black border-[1px] border-black rounded-full px-4 py-1 font-semibold"
              onClick={writePage}
            >
              + 글쓰기
            </button>
          </>
        );
      } else {
        // 로그인 상태이지만 다른 사람의 프로필인 경우
        return (
          <button className="text-black border-[1px] border-black rounded-full px-4 py-1 font-semibold">
            팔로우
          </button>
        );
      }
    }
    return (
      <button className="text-black border-[1px] border-black rounded-full px-4 py-1 font-semibold" onClick={goLoginPage} >
        팔로우
      </button>
    ); // 인증되지 않은 경우 아무 버튼도 표시하지 않음
  };

  // 프로필 정보를 렌더링
  return (

      <>
        <div className="flex w-[100%] h-[25%] justify-center items-center overflow-hidden">
          <img
            src={profileData.profileImage}
            alt="프로필사진"
            className="w-[175px] h-[175px] rounded-full"
          />
        </div>
        <div className="mt-3 text-[20px] font-semibold">
          {profileData.nickname}
        </div>
        <div className="mt-1 text-blue-600 font-semibold">
          {profileData.mbti}
        </div>
        <div className="mt-1">{profileData.mbtiDescription}</div>
        <div className="mt-3 text-gray-600">
          {profileData.profileDescription}
        </div>
        <div className="flex justify-around mt-4">
          <div>
            <div className="font-semibold">팔로워</div>
            <div className="text-blue-600">{profileData.followerCount}</div>
          </div>
          <div>
            <div className="font-semibold">팔로잉</div>
            <div className="text-blue-600">{profileData.followingCount}</div>
          </div>
        </div>
        <div className="w-[100%] h-[40px] flex justify-center items-center mt-2 space-x-1.5 overflow-hidden">
          {renderButtons()}
        </div>

      </>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Profile;
