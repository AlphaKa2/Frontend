import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { travelPlanState } from '../../recoil/atoms/ai-atoms';
import purposes from '../../data/purpose';
import { useNavigate } from 'react-router-dom';
import { createRecommendation } from '../../api/ai-service/recommendations'; // API 호출 함수 import

function CreatePlan6() {
  const travelPlan = useRecoilValue(travelPlanState);
  const [selectedPurposes, setSelectedPurposes] = useState(travelPlan.TRAVEL_PURPOSE || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const togglePurpose = (value) => {
    setSelectedPurposes((prevPurposes) =>
      prevPurposes.includes(value)
        ? prevPurposes.filter((purpose) => purpose !== value)
        : [...prevPurposes, value]
    );
  };

  const handleSubmit = async () => {
    const request_data = {
      ...travelPlan,
      TRAVEL_PURPOSE: selectedPurposes,
      recommendation_type: 'AI-GENERATED',
    };

    try {
      setIsSubmitting(true);

      console.log('전송 데이터:', request_data);

      const response = await createRecommendation(request_data); // API 호출

      if (response.status === 200) {
        console.log('추천 생성 성공:', response.data);

        // 성공 시 MainPage로 이동
        navigate('/');
      } else {
        alert('응답 데이터가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('여행 계획 생성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false); // 로딩 상태 해제
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 justify-center">
      {isSubmitting ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">AI 여행 계획 생성 중...</h2>
            <p className="mt-4 text-lg">잠시만 기다려 주세요.</p>
          </div>
        </div>
      ) : (
        <div className="relative bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg text-center md:w-3/4 lg:w-2/3 xl:w-1/2">
          {/* 여행 목적 선택 */}
          <h1 className="text-2xl font-bold mb-2">여행 목적을 선택해 주세요</h1>
          <p className="text-gray-500 mb-6">다중 선택이 가능합니다</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mb-10">
            {purposes.map((purpose) => (
              <button
                key={purpose.value}
                onClick={() => togglePurpose(purpose.value)}
                className={`py-3 px-5 rounded-full font-semibold transition duration-200 ${
                  selectedPurposes.includes(purpose.value)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {purpose.label}
              </button>
            ))}
          </div>

          {/* 이전 및 생성하기 버튼 */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate('/create-plan5')}
              className="bg-white border border-gray-400 text-gray-600 font-medium py-2 px-6 rounded-lg shadow transition duration-200 hover:bg-gray-100"
            >
              이전
            </button>
            <button
              className="submit-button2 bg-black text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              onClick={handleSubmit}
              disabled={selectedPurposes.length === 0 || isSubmitting}
            >
              생성하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePlan6;