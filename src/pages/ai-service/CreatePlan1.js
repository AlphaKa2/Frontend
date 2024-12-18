import React, { useState } from 'react';
import { useRecoilState } from 'recoil'; // Recoil 상태를 사용하기 위한 훅
import { travelPlanState } from '../../recoil/atoms/ai-atoms'; // Recoil Atom 불러오기
import regions from '../../data/regions';
import { useNavigate } from 'react-router-dom';
import Sky1 from '../../assets/images/Sky1.png';

function CreatePlan() {
  const [travelPlan, setTravelPlan] = useRecoilState(travelPlanState); // Recoil Atom 상태 가져오기
  const [roadAddr, setRoadAddr] = useState(travelPlan.ROAD_ADDR || ''); // 초기값을 Atom에서 가져오기
  const navigate = useNavigate();

  const handleNext = () => {
    setTravelPlan({
      ...travelPlan,
      ROAD_ADDR: roadAddr, // 선택된 지역을 저장
    });
    navigate('/create-plan2');
  };

  const selectLocation = (loc) => {
    setRoadAddr(loc);
  };

  return (
    <div
  className="absolute inset-0 flex flex-col items-center justify-center m-0 p-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${Sky1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>

      {/* 고정된 컨테이너 크기 적용: w-[672px] */}
      <div className="relative bg-white mt-12 p-8 rounded-xl shadow-lg text-center" style={{ width: '672px' }}>
        <div className="absolute top-4 left-4 text-blue-600 font-semibold text-sm md:text-base">
          온길 AI 여행 코스 추천
        </div>

        <div className="absolute top-4 right-4 text-gray-600 font-semibold md:text-base">
          <span className="font-semibold">01</span> / 06
        </div>

        <h1 className="text-gray-500 font-semibold text-lg mt-8">이번 여행, 어디로 떠나볼까요?</h1>
        <h2 className="text-2xl font-bold mt-4">
          여행을 떠나고 싶은 지역을 <br /> 선택해 주세요.
        </h2>

        <div className="grid grid-cols-3 gap-4 mt-10 md:grid-cols-4 lg:grid-cols-5">
          {Object.keys(regions).map((region) => (
            <button
              key={region}
              onClick={() => selectLocation(region)}
              className={`${
                roadAddr === region ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              } font-semibold py-2 rounded-full transition duration-200 w-[80px] h-[80px] md:w-[96px] md:h-[96px] flex items-center justify-center text-lg`}
            >
              {region}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!roadAddr}
          className={`${
            roadAddr ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } font-semibold py-3 px-8 rounded-lg transition duration-200 absolute bottom-8 right-8`}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default CreatePlan;