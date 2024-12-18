import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { travelPlanState } from '../../recoil/atoms/ai-atoms';
import regions from '../../data/regions';
import { useNavigate } from 'react-router-dom';
import Sky2 from '../../assets/images/Sky2.png';

function CreatePlan2() {

  const [travelPlan, setTravelPlan] = useRecoilState(travelPlanState);
  const [selectedSubLocation, setSelectedSubLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // `ROAD_ADDR` 값이 없으면 이전 페이지로 이동
    if (!travelPlan.ROAD_ADDR) {
      navigate('/create-plan1');
      return;
    }

    // `selectedSubLocation` 초기값 설정
    const currentSubLocation = travelPlan.ROAD_ADDR.split(' ').slice(-1)[0]; // 가장 마지막 단어가 서브 지역
    if (regions[travelPlan.ROAD_ADDR.split(' ')[0]]?.includes(currentSubLocation)) {
      setSelectedSubLocation(currentSubLocation);
    }
  }, [navigate, travelPlan]);

  const handleNext = () => {
    const updatedAddress = `${travelPlan.ROAD_ADDR.split(' ')[0]} ${selectedSubLocation}`; // 메인 지역 + 서브 지역
    setTravelPlan({
      ...travelPlan,
      ROAD_ADDR: updatedAddress,
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

    <div
      className="flex flex-col items-center min-h-screen bg-blue-100 justify-center"
      style={{
        backgroundImage: `url(${Sky2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}

    >
      <div className="relative bg-white p-8 rounded-xl shadow-lg text-center" style={{ width: '672px' }}>
        <div className="absolute top-4 left-4 text-indigo-600 font-semibold text-sm md:text-base">
          온길 AI 여행 코스 추천
        </div>

        <div className="absolute top-4 right-4 text-gray-600 font-semibold md:text-base">
          <span className="font-semibold">02</span> / 06
        </div>

        <h1 className="text-gray-500 font-medium text-lg mt-10">이번 여행, 어디로 떠나볼까요?</h1>
        <h2 className="text-2xl font-bold mt-2 mb-6">세부 지역을 선택해 주세요.</h2>


        {/* 지역 선택 영역 */}
        <div
          className="grid grid-cols-3 gap-4 mt-4 md:grid-cols-4 lg:grid-cols-5 overflow-y-auto"
          style={{
            maxHeight: '300px', // 최대 높이 제한
          }}
        >
          {regions[travelPlan.ROAD_ADDR.split(' ')[0]]?.map((subLoc) => (
            <button
              key={subLoc}
              onClick={() => selectSubLocation(subLoc)}
              className={`${
                selectedSubLocation === subLoc ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'

              } font-semibold rounded-full transition duration-200 flex items-center justify-center text-lg w-[80px] h-[80px] md:w-[90px] md:h-[90px]`}
            >
              {subLoc}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <button
            onClick={handleBack}
            className="bg-white border border-gray-400 text-gray-600 font-medium py-2 px-6 rounded-lg transition duration-200 hover:bg-gray-100"
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
