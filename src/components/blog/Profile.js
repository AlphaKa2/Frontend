import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import loginState from "../../recoil/atoms/loginState";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProfile } from "../../api/blog-services/blog/PostApi";
import FollowUserApi from "../../api/blog-services/follow/FollowUserApi";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const {nickname: userNicknameUrl} = useParams();
  const {isAuthenticated,nickname: userNickname, userId: userId} = useRecoilValue(loginState);

  const targetUserId = 3; // 임시로 타겟 아이디 넘김

  const handleFollow = async () => {
    try{
    const {status} = await FollowUserApi(targetUserId);
    if (status === 200) {
      alert("팔로우가 완료 되었습니다.");
    }}
    catch(error) {
      alert(error.message);
    }
  }
  const handleFollowingList = () => {
    navigate("/following/list", {state : targetUserId} );
  }

  const handleFollowerList = () => {
    navigate(("/follower/list"), {state : targetUserId} );
  }


  const writePage = () => {
    navigate("/blog-service/auth/api/posts");
};

  const handleUserReport = () => {
    navigate("/report/user");
  }


  const goLoginPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile(userNicknameUrl); // 분리된 API 호출 함수 사용
        setProfileData(data); // 데이터 상태 업데이트
        console.log(data);
      } catch (error) {
        console.error("태그 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId]);

  

  // 프로필 정보 로딩 중인 경우의 UI
  if (!profileData) {
    return (
      <div className="w-[12vw] h-screen text-left pt-[2vh]">
        
          <p className="text-gray-500">프로필 정보를 불러오는 중입니다...</p>
       
      </div>
    );
  }

  const renderButtons = () => {
    if (isAuthenticated) {
      if (profileData.nickname === userNickname) {
        // 로그인 상태이고, 본인의 프로필인 경우
        return (
          <>
            <button className="text-black border-[1px] border-black rounded-full px-[0.7vw] pt-[0.7vh] pb-[0.3vh]  font-semibold">
              프로필 수정
            </button>
            <button
              className="text-black border-[1px] border-black rounded-full px-[0.7vw] pt-[0.7vh] pb-[0.3vh] font-semibold"
              onClick={writePage}
            >
              + 글쓰기
            </button>
          </>
        );
      } else {
        // 로그인 상태이지만 다른 사람의 프로필인 경우
        return (
          <button className="text-black border-[1px] border-black rounded-full px-[0.5vw] py-[0.5vh] font-semibold"
          onClick={handleFollow}>
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
    <div className="w-[11.7vw] h-[55vh] px-[0.5vw] pt-[2vh] flex flex-col justify-start items-center overflow-hidden">
      <img
        src={profileData.profileImage}
        alt="프로필사진"
        className="w-[10.3vw] h-[18.4vh] rounded-full"
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
          <button onClick={handleFollowerList} className="font-semibold">팔로워</button>
          <div className="text-blue-600">{profileData.followerCount}</div>
        </div>
        <div>
          <button onClick={handleFollowingList} className="font-semibold">팔로잉</button>
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
