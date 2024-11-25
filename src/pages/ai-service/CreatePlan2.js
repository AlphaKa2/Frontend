import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil'; // Recoil 훅
import { travelPlanState } from '../../recoil/atoms/ai-atoms'; // Recoil Atom
import regions from '../../data/regions'; // 지역 데이터
import { useNavigate } from 'react-router-dom';

function CreatePlan2() {
  const [travelPlan, setTravelPlan] = useRecoilState(travelPlanState); // Atom 상태
  const [selectedSubLocation, setSelectedSubLocation] = useState(''); // 선택된 세부 지역
  const navigate = useNavigate();

  useEffect(() => {
    // ROAD_ADDR 값이 없으면 이전 페이지로 이동
    if (!travelPlan.ROAD_ADDR) {
      navigate('/create-plan1');
    }
  }, [navigate, travelPlan.ROAD_ADDR]);

  const handleNext = () => {
    const updatedAddress = `${travelPlan.ROAD_ADDR} ${selectedSubLocation}`;
    setTravelPlan({
      ...travelPlan,
      ROAD_ADDR: updatedAddress, // 전체 주소 업데이트
    });
    navigate('/create-plan3');
  };

  const handleBack = () => {
    navigate('/create-plan1');
  };

  const selectSubLocation = (subLoc) => {
    setSelectedSubLocation(subLoc);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 justify-center">
      <div className="relative bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg text-center md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="absolute top-4 left-4 text-indigo-600 font-semibold text-sm md:text-base">
          온길 AI 여행 코스 추천
        </div>

        <div className="absolute top-4 right-4 text-gray-600 font-semibold md:text-base">
          <span className="font-semibold">02</span> / 06
        </div>

        <h1 className="text-gray-500 font-medium text-lg mt-10">이번 여행, 어디로 떠나볼까요?</h1>
        <h2 className="text-2xl font-bold mt-2 mb-6">세부 지역을 선택해 주세요.</h2>

        <div className="grid grid-cols-3 gap-4 mt-4 md:grid-cols-4 lg:grid-cols-5">
          {regions[travelPlan.ROAD_ADDR]?.map((subLoc) => (
            <button
              key={subLoc}
              onClick={() => selectSubLocation(subLoc)}
              className={`${
                selectedSubLocation === subLoc ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
              } font-medium py-2 px-4 rounded-full shadow-sm transition duration-200`}
            >
              {subLoc}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={handleBack}
            className="bg-white border border-gray-400 text-gray-600 font-medium py-2 px-6 rounded-lg shadow transition duration-200 hover:bg-gray-100"
          >
            이전
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedSubLocation}
            className={`${
              selectedSubLocation ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } font-medium py-2 px-6 rounded-lg transition duration-200`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan2;