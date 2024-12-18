import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { travelPlanState } from '../../recoil/atoms/ai-atoms';
import purposes from '../../data/purposes';
import { useNavigate } from 'react-router-dom';
import { createRecommendation } from '../../api/ai-service/recommendations'; // API 호출 함수 import
import Sky6 from '../../assets/images/Sky6.png';

import LoadingCard from '../../components/cards/LoadingCard'; // 로딩 카드 import

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


      // API 호출
      await createRecommendation(request_data);

      // 로딩 후 홈으로 이동
      setTimeout(() => {
        navigate('/');
      }, 2000); // 2초 후 이동
    } catch (error) {
      console.error('요청 오류 발생:', error);
      setTimeout(() => {
        navigate('/'); // 실패해도 홈으로 이동
      }, 2000);
    } finally {
      setIsSubmitting(false);

    }
  };

  return (

    <div
      className="flex flex-col items-center min-h-screen bg-blue-100 justify-center"
      style={{
        backgroundImage: `url(${Sky6})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {isSubmitting && <LoadingCard />} {/* 로딩 카드 표시 */}

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

        {/* 우측 상단 페이지 번호 */}
        <div className="absolute top-4 right-4 text-gray-600 font-semibold md:text-base">
          <span className="font-semibold">06</span> / 06
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
    </div>
  );
}

export default CreatePlan6;
