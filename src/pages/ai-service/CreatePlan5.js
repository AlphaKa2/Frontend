import React, { useState } from 'react';
import { useRecoilState } from 'recoil'; // Recoil 훅
import { travelPlanState } from '../../recoil/atoms/ai-atoms'; // Recoil Atom
import motives from '../../data/motives'; // motives 데이터 가져오기
import { useNavigate } from 'react-router-dom';
import natureIcon from '../../assets/images/natureicon.png'; // Nature preference icon
import cityIcon from '../../assets/images/cityicon.png'; // City preference icon

// 여행 스타일 리스트와 레이블
const styleMapping = ["VERY_NATURE", "MODERATE_NATURE", "NEUTRAL", "MODERATE_CITY", "VERY_CITY"];
const styleLabels = ["매우 자연친화적", "자연 친화적", "보통", "도시친화적", "매우 도시 친화적"];

function CreatePlan5() {
  const [travelPlan, setTravelPlan] = useRecoilState(travelPlanState); // Recoil 상태 가져오기
  const [TRAVEL_MOTIVE_1, setTRAVEL_MOTIVE_1] = useState(travelPlan.TRAVEL_MOTIVE_1 || ''); // 초기값 설정
  const [TRAVEL_STYL_1, setTRAVEL_STYL_1] = useState(
    styleMapping.indexOf(travelPlan.TRAVEL_STYL_1) >= 0
      ? styleMapping.indexOf(travelPlan.TRAVEL_STYL_1)
      : 2
  ); // 초기값 설정
  const navigate = useNavigate();

  const handleNext = () => {
    // Recoil 상태 업데이트
    setTravelPlan({
      ...travelPlan,
      TRAVEL_MOTIVE_1,
      TRAVEL_STYL_1: styleMapping[TRAVEL_STYL_1], // 선택된 스타일을 매핑하여 저장
    });
    navigate('/create-plan6');
  };

  const handleBack = () => {
    navigate('/create-plan4');
  };

  const selectMotive = (value) => {
    setTRAVEL_MOTIVE_1(value); // 단일 값으로 상태 설정
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 justify-center">
      <div className="relative bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg text-center md:w-3/4 lg:w-2/3 xl:w-1/2">
        
        {/* 여행 동기 선택 */}
        <h1 className="text-2xl font-bold mb-2">여행 동기를 선택해 주세요</h1>
        <p className="text-gray-500 mb-6">하나만 선택해 주세요</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mb-10">
          {motives.map((motive) => (
            <button
              key={motive.value}
              onClick={() => selectMotive(motive.value)}
              className={`py-3 px-5 rounded-full font-semibold transition duration-200 ${
                TRAVEL_MOTIVE_1 === motive.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {motive.label}
            </button>
          ))}
        </div>

        {/* 여행 스타일 선택 */}
        <h1 className="text-2xl font-bold mb-6">여행 스타일을 선택해 주세요</h1>
        <div className="flex items-center justify-center mb-10">
          <img src={natureIcon} alt="Nature" className="w-12 h-12 mr-6" />
          <div className="flex space-x-8">
            {styleMapping.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition duration-200 ${
                    TRAVEL_STYL_1 === index ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  onClick={() => setTRAVEL_STYL_1(index)}
                  aria-label={label}
                ></button>
                <span className="text-xs mt-2 text-gray-700">{styleLabels[index]}</span>
              </div>
            ))}
          </div>
          <img src={cityIcon} alt="City" className="w-12 h-12 ml-6" />
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
            disabled={TRAVEL_MOTIVE_1 === ''}
            className={`${
              TRAVEL_MOTIVE_1 !== ''
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

export default CreatePlan5;