import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/CustomCalendar.css';
import { useRecoilState } from 'recoil'; // Recoil 훅
import { travelPlanState } from '../../recoil/atoms/ai-atoms'; // Recoil Atom
import { useNavigate } from 'react-router-dom';

function CreatePlan3() {
  const [travelPlan, setTravelPlan] = useRecoilState(travelPlanState); // Recoil 상태 가져오기
  const [selectedDates, setSelectedDates] = useState([
    travelPlan.start_date ? new Date(travelPlan.start_date) : null,
    travelPlan.end_date ? new Date(travelPlan.end_date) : null,
  ]); // 초기값 설정
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  // 날짜를 YYYY-MM-DD 형식으로 반환하는 유틸리티 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 날짜 계산 유틸리티 (시간대 영향 제거)
  const calculateDays = (start, end) => {
    // 시간을 00:00:00으로 설정하여 정확히 날짜만 비교
    const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    return (endDate - startDate) / (1000 * 3600 * 24) + 1;
  };

  // 날짜 변경 핸들러
  const onDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      const diffDays = calculateDays(dates[0], dates[1]);
      if (diffDays > 5) {
        alert('최대 5일까지 선택 가능합니다.');
        return;
      }
      setSelectedDates(dates);
    } else {
      setSelectedDates(dates ? [dates, dates] : [null, null]);
    }
  };

  // 이전 버튼 핸들러
  const handleBack = () => {
    navigate('/create-plan2');
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    if (selectedDates[0] && selectedDates[1]) {
      const startDate = formatDate(selectedDates[0]); // 정확한 시작일 저장
      const endDate = formatDate(selectedDates[1]); // 정확한 종료일 저장
      const travelDays = calculateDays(selectedDates[0], selectedDates[1]); // 여행 기간 계산

      // Recoil 상태 업데이트
      setTravelPlan({
        ...travelPlan,
        start_date: startDate, // Key 수정
        end_date: endDate, // Key 수정
        TRAVEL_STATUS_DAYS: travelDays, // Key 수정
      });

      navigate('/create-plan4');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 justify-center">
      <div className="relative bg-white w-full max-w-4xl p-8 rounded-xl shadow-lg text-center">

      <div className="absolute top-4 left-4 text-indigo-600 font-semibold text-sm md:text-base">
          온길 AI 여행 코스 추천
        </div>

        <div className="absolute top-4 right-4 text-gray-600 font-semibold md:text-base">
          <span className="font-semibold">03</span> / 06
        </div>

        <h1 className="text-gray-500 font-medium text-lg mt-10">여행 시작일과 종료일을 선택해주세요.</h1>
        <p className="text-sm text-gray-400 mt-2">
          최대 5일까지 선택이 가능합니다.
        </p>

        {/* 두 달력을 하나로 연결 */}
        <div className="flex justify-center mt-5">
          <Calendar
            onChange={onDateChange}
            value={selectedDates}
            selectRange={true}
            calendarType="gregory"
            className="custom-calendar double-view"
            showDoubleView={true}
            activeStartDate={currentDate}
            onActiveStartDateChange={({ activeStartDate }) =>
              setCurrentDate(activeStartDate)
            }
            showNeighboringMonth={false}
          />
        </div>

        {/* 선택한 날짜 표시 */}
        <div className="mt-4 text-gray-700">
          {selectedDates[0] && selectedDates[1] ? (
            <p>
              선택한 기간: {selectedDates[0].toLocaleDateString()} ~{' '}
              {selectedDates[1].toLocaleDateString()}
            </p>
          ) : (
            <p>날짜를 선택해 주세요.</p>
          )}
        </div>

        {/* 이전 및 다음 버튼 */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handleBack}
            className="bg-white border border-gray-400 text-gray-600 font-medium py-2 px-6 rounded-lg shadow transition duration-200 hover:bg-gray-100"
          >
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedDates[0] || !selectedDates[1]}
            className={`${
              selectedDates[0] && selectedDates[1]
                ? 'bg-blue-500 text-white'
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

export default CreatePlan3;