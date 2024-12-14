import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import loginState from "../recoil/atoms/loginState";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Profile = () => {
  const navigate = useNavigate();
  const writePage = () => {
    navigate("/blog-service/auth/api/posts");
  };
  const goLoginPage = () => {
    navigate("/login");
  };
  const [profileData, setProfileData] = useState(null);
  const { isAuthenticated, nickname: userNickname } =
    useRecoilValue(loginState);
  const { userId: userId } = useRecoilValue(loginState);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `/user-service/users/${userId}/profile`
        );
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
      <div className="w-[20vw] h-screen px-12 py-12">
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
            <button className="text-black border-[1px] border-black rounded-full px-[0.7vw] py-[0.6vh] font-semibold">
              프로필 수정
            </button>
            <button
              className="text-black border-[1px] border-black rounded-full px-[0.7vw] py-[0.6vh] font-semibold"
              onClick={writePage}
            >
              + 글쓰기
            </button>
          </>
        );
      } else {
        // 로그인 상태이지만 다른 사람의 프로필인 경우
        return (
          <button className="text-black border-[1px] border-black rounded-full px-[0.5vw] py-[0.5vh] font-semibold">
            팔로우
          </button>
        );
      }
    }
    return (
      <button
        className="text-black border-[1px] border-black rounded-full px-[0.5vw] py-[0.5vh] font-semibold"
        onClick={goLoginPage}
      >
        팔로우
      </button>
    ); // 인증되지 않은 경우 아무 버튼도 표시하지 않음
  };

  // 프로필 정보를 렌더링
  return (
    <div className="w-[11.3vw] h-[55vh] px-[0.5vw] pt-[2vh] flex flex-col justify-start items-center overflow-hidden">
      <img
        src={profileData.profileImage}
        alt="프로필사진"
        className="w-[11vw] h-[18vh] rounded-full"
      />
      <div className="w-[10vw] h-[3.5vh] text-[22px] mt-[2vh] text-gray-600 font-semibold overflow-hidden">
        {profileData.nickname}
      </div>
      <div className="mt-[0.5vh] text-blue-600 font-semibold">
        {profileData.mbti}
      </div>
      <div className="w-[10vw] h-[3vh]  overflow-hidden">
        {profileData.mbtiDescription}
      </div>
      <div
        className={`w-[10vw] h-[6vh] mt-[1vh] break-words text-left overflow-hidden ${
          profileData.profileDescription &&
          profileData.profileDescription.trim() !== ""
            ? "text-gray-600"
            : "text-gray-400 flex items-center justify-center"
        }`}
      >
        {profileData.profileDescription &&
        profileData.profileDescription.trim() !== ""
          ? profileData.profileDescription
          : "상태메시지 없음"}
      </div>

      <div className="flex space-x-[1vw] mt-[1vh]">
        <div>
          <div className="font-semibold">팔로워</div>
          <div className="text-blue-600">{profileData.followerCount}</div>
        </div>
        <div>
          <div className="font-semibold">팔로잉</div>
          <div className="text-blue-600">{profileData.followingCount}</div>
        </div>
      </div>
      <div className="w-[11vw] h-[10vh] mt-[-1vh] flex justify-center items-center space-x-[0.3vw] overflow-hidden">
        {renderButtons()}
      </div>
    </div>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Profile;
