import React, { useState, useEffect } from "react";
import mbtiQuestions from "../../data/mbtiQuestions";
import { useNavigate } from "react-router-dom";

const MbtiTestPage = () => {
  const totalQuestions = mbtiQuestions.length; // 총 문제 수
  const [currentQuestion, setCurrentQuestion] = useState(1); // 현재 문제 번호
  const [selectedOption, setSelectedOption] = useState(null);
  const [selections, setSelections] = useState([]); // 선택된 답변 기록
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // 초기 화면 렌더링
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Start animation after 100ms
    return () => clearTimeout(timer);
  }, []);

  const progressPercentage = Math.round(
    (currentQuestion / totalQuestions) * 100
  ); // 진행률 계산

  const currentQuestionData = mbtiQuestions[currentQuestion - 1]; // 현재 질문

  // 현재 선택한 옵션
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // 이전 버튼 처리함수
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(selections[currentQuestion - 2]); // 이전 선택 복원
    }
  };

// 다음 버튼 처리함수
// 다음 버튼 처리함수
const handleNext = () => {
  if (selectedOption === null) {
    alert("하나를 선택해주세요.");
    return;
  }

  const updatedSelections = [...selections];
  updatedSelections[currentQuestion - 1] =
    currentQuestionData.options[selectedOption].alphabet; // 선택한 알파벳 저장
  setSelections(updatedSelections);

  if (currentQuestion < totalQuestions) {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption(
      updatedSelections[currentQuestion]
        ? currentQuestionData.options.findIndex(
            (option) =>
              option.alphabet === updatedSelections[currentQuestion]
          )
        : null
    ); // 다음 선택 복원
  } else {
    // 모든 질문 완료 시 결과 페이지로 이동
    navigate("/mbti/result", { state: { selections: updatedSelections } });
  }
};



  return (
    <div className="w-full h-screen bg-gray-100 py-16 flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full max-w-3xl px-4 mb-8 mt-12">
        <div className="flex items-center">
          <div className="flex-grow h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="ml-4 text-blue-500 text-sm font-medium">
            {progressPercentage}%
          </div>
        </div>
      </div>

      {/* Question */}
      <h1 className="text-xl font-bold text-center mb-12 mt-24">
        {currentQuestion}. {currentQuestionData.question}
      </h1>
      <p className="text-gray-500 mb-8 text-center">둘 중 하나를 선택하세요</p>
      {/* Options Section */}
      <div
        className={`transition-opacity duration-700 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        <div className="grid grid-cols-2 gap-8 mb-12">
          {currentQuestionData.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`p-10 border rounded-2xl flex flex-col items-center justify-between shadow-xl transform transition-transform duration-300 hover:scale-110 ${
                selectedOption === index
                  ? "border-blue-500 bg-gradient-to-br from-blue-100 to-blue-200"
                  : "border-gray-300 bg-gray-50"
              }`}
              style={{
                width: "280px", // 더 넉넉한 고정된 가로 크기
                height: "320px", // 더 큰 고정된 세로 크기
              }}
            >
              <div
                className={`w-14 h-14 border-4 rounded-full flex items-center justify-center mb-8 ${
                  selectedOption === index
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-gray-400 text-gray-600 bg-gray-100"
                }`}
              >
                <span className="text-2xl font-bold">{index + 1}</span>
              </div>
              <h3
                className={`text-xl font-extrabold mb-6 ${
                  selectedOption === index
                    ? "text-blue-700"
                    : "text-gray-700"
                }`}
              >
                {option.text}
              </h3>
              <p
                className={`text-base text-center leading-relaxed ${
                  selectedOption === index
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-3xl px-4 mt-12 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 1}
          className={`bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 ${
            currentQuestion === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default MbtiTestPage;
