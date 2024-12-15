import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mbtiDescriptions from "../../../data/mbti/mbtiDescriptions";
import mbtiShortDescriptions from "../../../data/mbti/mbtiShortDescriptions";
import UpdateUserMbtiApi from "../../../api/blog-services/mbti/UpdateUserMbtiApi";
import { useRecoilValue } from "recoil";
import loginState from "../../../recoil/atoms/loginState";

const MbtiResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userSelections = location.state?.selections || []; // 사용자가 선택한 응답 가져오기
  const { userId } = useRecoilValue(loginState);

  // 선택지에서 성향 점수 계산
  const calculateMbti = (selections) => {
    const result = { A: 0, R: 0, B: 0, C: 0, L: 0, S: 0, J: 0, P: 0 };

    // 선택된 알파벳의 점수 누적
    selections.forEach((selection) => {
      if (result.hasOwnProperty(selection)) {
        result[selection]++;
      }
    });

    // 결과 MBTI 조합 계산
    const mbtiResult =
      (result.A > result.R ? "A" : "R") +
      (result.B > result.C ? "B" : "C") +
      (result.L > result.S ? "L" : "S") +
      (result.J > result.P ? "J" : "P");

    return mbtiResult;
  };

  const mbtiResult = calculateMbti(userSelections);

  useEffect(() => {
    const updateMbtiResult = async () => {
      try {
        const response = await UpdateUserMbtiApi(userId, mbtiResult);
        if (response.status === 200) {
          console.log("MBTI 결과가 성공적으로 업데이트되었습니다.");
        } else {
          console.error("MBTI 결과 업데이트 실패:", response);
        }
      } catch (error) {
        console.error("MBTI 결과 업데이트 중 오류:", error);
        alert("MBTI 결과를 서버에 업데이트하는 중 오류가 발생했습니다.");
      }
    };

    if (mbtiResult) {
      updateMbtiResult();
    }
  }, [mbtiResult, userId]);

  // 동적으로 이미지 경로 가져오기
  const imagePath = (mbtiResult) =>
    require(`../../../assets/images/mbti/${mbtiResult}.png`);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12">
        당신의 여행 MBTI 결과
      </h1>
      {/* 이미지 렌더링 */}
      <div className="mb-6">
        <img
          src={imagePath(mbtiResult)}
          alt={`MBTI 결과 ${mbtiResult}`}
          className="w-96 h-64 object-contain mx-auto"
        />
      </div>
      <div className="bg-white rounded-3xl shadow-2xl text-center p-10 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">{mbtiResult}</h2>
        <p className="text-blue-500 text-lg font-semibold mb-4">
          {mbtiShortDescriptions[mbtiResult]}
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          {mbtiDescriptions[mbtiResult]}
        </p>
      </div>
      <button
        onClick={() => navigate("/mbti/test")}
        className="mt-12 bg-blue-500 text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        다시 테스트하기
      </button>
    </div>
  );
};

export default MbtiResultPage;
