import React from "react";
import PropTypes from "prop-types";
import profile from "../assets/images/profile-picture.jpg";
import { useNavigate } from "react-router-dom";

const ProfileTags = ({ onFilterChange, onButtonClick }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[20%] h-screen px-12 py-12">
        <div className="border-[0.1px] border-gray-400 shadow-md rounded-2xl h-[90%] p-4 mt-16 text-center overflow-x-hidden">
          <div className="flex w-[100%] h-[25%] justify-center items-center overflow-hidden">
            <img
              src={profile}
              alt="프로필사진"
              className="w-[175px] h-[175px] rounded-full"
            />
          </div>

          <div className="mt-3 w-[100%] h-[35px] overflow-hidden text-[20px] font-semibold">
            ( 나의 닉네임 )
          </div>

          <div className="mt-3 w-[100%] h-[30px] font-semibold text-[#4B6BFB] overflow-hidden">
            ACLJ
          </div>
          <div className="w-[100%] h-[30px] font-semibold overflow-hidden">
            여유로운 탐험가
          </div>

          <div className="flex justify-center items-center mt-2">
            <div className="w-[50%] h-[60px] overflow-hidden flex flex-col justify-center font-semibold">
              <div>팔로잉</div>
              <div className="text-[#4B6BFB]">123</div>
            </div>
            <div className="w-[50%] h-[60px] overflow-hidden flex flex-col justify-center font-semibold">
              <div>팔로워</div>
              <div className="text-[#4B6BFB]">234</div>
            </div>
          </div>

          <div className="w-[100%] h-[40px] flex jusitfy-center items-center mt-2 ml-1 space-x-1.5 overflow-hidden">
            <button className="text-black border-[1px] border-black rounded-full px-4 py-1 font-semibold">
              프로필 수정
            </button>
            <button className="text-black border-[1px] border-black rounded-full px-4 py-1 font-semibold"
            onClick = {()=> {navigate('/createpost')}}>
              + 글쓰기
            </button>
          </div>

          <div className="w-[100%] mt-6 text-left p-2 space-y-2">
            <div className="font-semibold text-[1.2em]">태그 목록</div>
            <div className="w-[100%] border-[0.5px] border-black"></div>
            <div className="w-[100%] space-y-2">
              <div onClick={() => onFilterChange("all")}>
                <a href="#">전체보기</a>
              </div>
              <div onClick={() => onFilterChange("gyeonggi")}>
                <a href="#">경기</a>
              </div>
              <div onClick={() => onFilterChange("gangwon")}>
                <a href="#">강원</a>
              </div>
              <div onClick={() => onFilterChange("chungbuk")}>
                <a href="#">충북</a>
              </div>
              <div onClick={() => onFilterChange("chungnam")}>
                <a href="#">충남</a>
              </div>
              <div onClick={() => onFilterChange("jeju")}>
                <a href="#">제주</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ProfileTags.propTypes = {
  buttonText: PropTypes.string,
  showTags: PropTypes.bool,
  onFilterChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default ProfileTags;
