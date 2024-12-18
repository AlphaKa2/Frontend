import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { travelPlanState } from '../../recoil/atoms/ai-atoms';
import purposes from '../../data/purposes'; // purposes가 배열인지 확인
import { useNavigate } from 'react-router-dom';
import { createRecommendation } from '../../api/ai-service/recommendations'; // API 호출 함수
import Sky6 from '../../assets/images/Sky6.png';
import LoadingGif from '../../assets/videos/Loading.gif'; // 로딩 GIF 경로

function CreatePlan6() {
  const travelPlan = useRecoilValue(travelPlanState);
  const [selectedPurposes, setSelectedPurposes] = useState(travelPlan.TRAVEL_PURPOSE || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

    setIsSubmitting(true);

    // 2초 로딩 후 성공 화면 표시
    setTimeout(async () => {
      try {
        await createRecommendation(request_data);
        setShowSuccess(true);
      } catch (error) {
        console.error('Error:', error);
        setShowSuccess(true); // 에러가 나더라도 성공 화면 표시
      } finally {
        setIsSubmitting(false);
      }
    }, 2000);
  };

  const handleConfirm = () => {
    navigate('/');
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
      {isSubmitting ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          {/* 로딩 GIF */}
          <img src={LoadingGif} alt="Loading" className="w-80 h-80" />
        </div>
      </div>
      ) : showSuccess ? (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-lg font-bold">여행 코스 생성 요청이 성공했습니다!</h2>
          <p className="text-gray-700 text-base font-bold">생성 완료까지 약 30초 정도 소요됩니다.</p>
          <button
            onClick={handleConfirm}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 font-semibold"
          >
            확인
          </button>
        </div>
      </div>
      ) : (
        <div className="relative bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg text-center md:w-3/4 lg:w-2/3 xl:w-1/2">
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
          <div className="absolute top-4 right-4 text-gray-600 font-semibold md:text-base">
            <span className="font-semibold">06</span> / 06
          </div>
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
