import React, { useState } from 'react';
import { useRecoilState } from 'recoil'; // Recoil 훅
import { travelPlanState } from '../../recoil/atoms/ai-atoms'; // Recoil Atom
import companionshipOptions from '../../data/companionships'; // 동행자 데이터 가져오기
import { useNavigate } from 'react-router-dom';
import Sky4 from '../../assets/images/Sky4.png';

const transportOptions = [
  { label: '대중교통', value: 'PUBLIC_TRANSPORTATION' },
  { label: '자가용', value: 'CAR' },
];

function CreatePlan4() {
  const [travelPlan, setTravelPlan] = useRecoilState(travelPlanState); // Recoil 상태 가져오기
  const [TRAVEL_STATUS_ACCOMPANY, setTRAVEL_STATUS_ACCOMPANY] = useState(travelPlan.TRAVEL_STATUS_ACCOMPANY || ''); // 초기값 설정
  const [MVMN_NM, setMVMN_NM] = useState(travelPlan.MVMN_NM || ''); // 초기값 설정
  const navigate = useNavigate();

  const handleNext = () => {
    // Recoil 상태 업데이트
    setTravelPlan({
      ...travelPlan,
      TRAVEL_STATUS_ACCOMPANY,
      MVMN_NM,
    });
    navigate('/create-plan5');
  };

  const handleBack = () => {
    navigate('/create-plan3');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 justify-center"
    style={{
      backgroundImage: `url(${Sky4})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="relative bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg mt-12 text-center md:w-3/4 lg:w-2/3 xl:w-1/2">
        
        {/* 페이지 제목 */}
        <h2 className="text-gray-500 font-medium text-lg">누구와 떠나나요?</h2>
        <h1 className="text-2xl font-bold mb-6">여행 동행자를 선택해 주세요</h1>

        {/* 좌측 상단 설명 텍스트 */}
        <div className="absolute top-4 left-4 text-blue-600 font-semibold text-sm md:text-base">
          온길 AI 여행 코스 추천
        </div>

        {/* 우측 상단 페이지 번호 */}
        <div className="absolute top-4 right-4 text-gray-600 font-semibold md:text-base">
          <span className="font-semibold">04</span> / 06
        </div>
        
        {/* 동행자 옵션 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mb-10">
          {companionshipOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTRAVEL_STATUS_ACCOMPANY(option.value)}
              className={`py-3 px-5 rounded-full font-semibold transition duration-200 ${
                TRAVEL_STATUS_ACCOMPANY === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* 교통 수단 선택 제목 */}
        <h2 className="text-gray-500 font-medium text-lg">무엇을 타고 떠나나요?</h2>
        <h1 className="text-2xl font-bold mb-6">교통 수단을 선택해 주세요</h1>

        {/* 교통 수단 옵션 */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {transportOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setMVMN_NM(option.value)}
              className={`py-3 px-5 rounded-full font-semibold transition duration-200 ${
                MVMN_NM === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* 이전 및 다음 버튼 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="bg-white border border-gray-400 text-gray-600 font-medium py-2 px-6 rounded-lg shadow transition duration-200 hover:bg-gray-100"
          >
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={!TRAVEL_STATUS_ACCOMPANY || !MVMN_NM}
            className={`${
              TRAVEL_STATUS_ACCOMPANY && MVMN_NM
                ? 'bg-black text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } font-medium py-2 px-6 rounded-lg transition duration-200`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan4;
