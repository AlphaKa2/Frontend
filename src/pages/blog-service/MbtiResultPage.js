import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mbtiDescriptions from "../../data/mbtiDescriptions";
import UpdateUserMbtiApi from "../../api/blog-services/mbti/UpdateUserMbtiApi";
import {useRecoilValue} from "recoil";
import loginState from "../../recoil/atoms/loginState";

const MbtiResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userSelections = location.state?.selections || []; // 사용자가 선택한 응답 가져오기
  const {userId} = useRecoilValue(loginState);

  // useEffect( async () => {
  //   try{
  //    const response = await UpdateUserMbtiApi(userId, mbtiResult);
  //    console.log(response.data.status);
  //   } catch(error) {
  //     alert(error);
  //   }
  // },[mbtiResult]);

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
  
    // 가장 높은 점수 조합으로 MBTI 유형 결정
    return (
      (result.A > result.R ? "A" : "R") +
      (result.B > result.C ? "B" : "C") +
      (result.L > result.S ? "L" : "S") +
      (result.J > result.P ? "J" : "P")
    );
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



  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12">
        당신의 여행 MBTI 결과
      </h1>
      <div className="bg-white rounded-3xl shadow-2xl text-center p-10 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">{mbtiResult}</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {mbtiDescriptions[mbtiResult]}
        </p>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-12 bg-blue-500 text-white py-3 px-10 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
      >
        다시 테스트하기
      </button>

    </div>
  );
};

export default MbtiResultPage;
