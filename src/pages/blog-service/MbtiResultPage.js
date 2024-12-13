import React, { useEffect } from "react";
import ResultPic from "../../assets/images/mbti.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios"; // axios import
import loginState from "../../recoil/atoms/loginState";
import { useRecoilValue } from "recoil";


const MbtiResultPage = () => {
  const user = useRecoilValue(loginState);
  const { state } = useLocation();
  const navigate = useNavigate();
  const mbti = state?.mbti || "결과 없음"; // 전달된 MBTI 결과


  const handleNextPage = () => {
    navigate("/");
  };

  // MBTI 결과를 PUT 요청으로 서버에 전송
  const updateUserMbti = async () => {
    try {
      const url = `/user-service/auth/users/${user.userId}/mbti`; // 서버 URL
      await axios.put(url, { mbti }); // PUT 요청 전송
      console.log("MBTI 업데이트 성공");
    } catch (error) {
      console.error("MBTI 업데이트 실패:", error);
    }
  };

  useEffect(() => {
    if (mbti !== "결과 없음") {
      updateUserMbti();
    }
  }, [mbti]);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center py-5">
      {/* 결과 상자 */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90vw] max-w-4xl mt-10">
        {/* MBTI 결과 헤더 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            당신의 MBTI 결과는
          </h1>
        </div>

        {/* 설명 부분 */}
        <div className="mb-6">
          <p className="text-gray-700 text-center">
            A: 여행지에서 신체적으로 활발하게 움직이며, 다양한 활동을 하는
            여행을 즐기는 성향
          </p>
          <p className="text-gray-700 text-center">
            R: 경치를 감상하거나 편안하게 휴식하며 그 순간을 즐기며 천천히
            여행을 즐기는 성향
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Active(A) vs. Relaxed(R)
          </h2>

          <p className="text-gray-700 text-center">
            B: 일정을 촘촘하게 세우고 하루를 꽉 채워 다양한 활동을 하며, 짧은
            시간에 많은 것을 하는 성향
          </p>
          <p className="text-gray-700 text-center">
            C: 느긋하게 여유를 가지고 천천히 여행을 즐기며, 중간중간 휴식을
            취하는 성향
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Busy(B) vs. Calm(C)
          </h2>

          <p className="text-gray-700 text-center">
            L: 고급 호텔, 미식, 쇼핑 등 럭셔리한 경험을 즐기고 편안한 여행을
            선호하는 성향
          </p>
          <p className="text-gray-700 text-center">
            S: 비용을 아끼고 간소한 환경에서 여행을 즐기며 불필요한 소비를
            지양하는 성향
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Luxurious(L) vs. Simple(S)
          </h2>

          <p className="text-gray-700 text-center">
            J: 세부적인 일정 계획을 세우고 체계적으로 여행하는 성향
          </p>
          <p className="text-gray-700 text-center">
            P: 즉흥적으로 계획을 바꾸고 자유롭게 유동적으로 여행하는 성향
          </p>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Judging(J) vs. Perciving(P)
          </h2>

          <h2 className="text-2xl font-semibold text-gray-800 mt-5 text-center">
            결과는 {mbti}
          </h2>
        </div>

        {/* 글과 사진 부분 (ACLJ) */}
        <div className="flex flex-col items-center justify-center">
          {/* 이미지 */}
          <div className="w-50 h-55 bg-gray-200 rounded-lg overflow-hidden shadow-md mb-6">
            <img src={ResultPic} alt="detail_4" className="detail_4" />
          </div>
        </div>

        {/* 추가 버튼 */}
        <div className="text-center">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={handleNextPage}
          >
            처음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default MbtiResultPage;
