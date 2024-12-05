import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 임의의 문제와 답 (예시)
const questions = [
  {
    question:
      "1. 비 오는 날, 숙소에서 쉬고 있는데 밖에서 재밌는 행사가 열리고 있다. 이때 나는 ...",
    options: ["행사에 참여한다.", "행사에 참여하지않는다."],
  },
  {
    question: "2. 해변가에서 재밌는 액티비티를 체험할 수 있다. 이때 나는 ...",
    options: ["액티비티를 체험한다.", "액티비티를 체험하지않는다."],
  },
  {
    question: "3. 여행지 숙소 바로 앞에서 자전거를 대여해준다. 이때 나는 ...",
    options: ["자전거를 빌린다.", "자전거를 빌리지 않는다."],
  },
  {
    question: "4. 숙소에 무료 수영장이 있다. 이때 나는 ...",
    options: ["수영장에 간다.", "수영장에 가지않는다."],
  },
  {
    question:
      "5. 오랜만에 찾은 유명 관광지, 정상에 올라가면 멋진 전망이 펼쳐진다. 이때 나는 ...",
    options: ["정상에 도전한다.", "정상에 굳이 가지 않는다."],
  },
  {
    question:
      "6. 관광 명소를 전부 다 방문하려면 여유가 많지 않다. 이때 나는 ...",
    options: ["최대한 많이 방문한다.", "최소한으로 방문한다."],
  },
  {
    question:
      "7. 다음날 아침 저녁 늦게까지 놀고 좀 피곤한 상태이다. 이때 나는 ... ",
    options: ["피곤해도 일정을 따른다.", "피곤하니 일정은 무시한다."],
  },
  {
    question:
      "8. 여행 중 갑자기 비가 조금씩 오며 다행히 우산은 갖고 있다. 이때 나는 ...",
    options: ["야외일정을 계속 진행한다.", "실내일정으로 바꾼다."],
  },
  {
    question:
      "9. 여행 중 친한 지인을 만났다. 친한 지인은 아쉽게도 나와 여행 코스가 다르다. 이때 나는 ...",
    options: ["나의 일정을 따른다.", "지인과 보내는 일정으로 바꾼다."],
  },
  {
    question:
      "10. 여행 마지막 날인데 가고 싶은 곳이 아직 많이 남았다. 이때 나는 ...",
    options: [
      "일정을 압축하여 가고싶은 곳을 최대한 가본다.",
      "다음 여행을 기약하며 여유롭게 둘러본다.",
    ],
  },
  {
    question:
      "11. 여행 중, 근사한 레스토랑과 현지 시장에서 파는 길거리 음식 중 하나를 선택해야 한다. 이때 나는 ...",
    options: [
      "돈을 더 주더라도 레스토랑에 간다.",
      "돈을 아껴 길거리 음식을 먹는다.",
    ],
  },
  {
    question:
      "12. 여행 중 고급 레스토랑에서 특별 메뉴를 추천받았다. 이때 나는 ...",
    options: ["특별메뉴를 주문한다.", "기본코스를 주문한다."],
  },
  {
    question:
      "13. 여행지의 숙소를 고르고 있다. 평점이 동일하다는 가정하에 나는 ...",
    options: ["더 가격있는 곳을 예약한다.", "가격이 저렴한 곳을 예약한다."],
  },
  {
    question: "14. 여행지에서 기념품샵에 왔다. 여행지를 감안하더라도 나는 ...",
    options: ["기념품을 구매한다.", "굳이 사지않는다."],
  },
  {
    question:
      "15. 여행 계획을 다 짜고 마지막으로 교통수단을 정해야 한다. 이때 나는 ...",
    options: [
      "비싸도 편한 교통수단을 이용한다.",
      "불편해도 저렴한 교통수단을 이용한다.",
    ],
  },
  {
    question:
      "16. 배고픈 상태에서 이미 찾아둔 식당으로 이동하는 길에, 맛있어 보이는 식당 앞을 지나가고 있다. 이때 나는 ...",
    options: ["원래 가려던 식당으로 간다.", "식당을 바꾼다."],
  },
  {
    question:
      "17. 정해둔 여행 계획이 있지만, 예상치 못한 행사가 열리고 있다. 이때 나는 ...",
    options: ["정해둔 여행 계획을 따른다.", "행사를 구경하러 간다."],
  },
  {
    question: "18. 원래 계획한 투어가 지연될 것 같다. 이때 나는 ...",
    options: ["조금 기다리더라도 투어를 따른다.", "다른 투어를 찾아본다."],
  },
  {
    question: "19. 여행지에서 갈만한 곳을 찾아보고 있다. 이때 나는 ...",
    options: [
      "혹시 모를 상황을 대비해서 여행지와 맛집을 여유있게 더 찾아둔다.",
      "여행중에 마음에 드는 장소와 맛집을 방문한다.",
    ],
  },
  {
    question:
      "20. 여행중에 아픈 사람은 없으며 위험한 여행은 없다. 이때 나는 ...",
    options: [
      "혹시 몰라 비상약을 미리 구매한다.",
      "약은 필요하면 사기로 한다.",
    ],
  },

  // 더 많은 문제와 옵션을 추가할 수 있습니다.
];

const MbtiDetailPage = () => {
    const navigate = useNavigate();

  
    const [progress, setProgress] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const totalQuestions = questions.length;
    const increment = 100 / totalQuestions;
  
    // 각 범위의 선택 횟수를 기록
    const [scores, setScores] = useState({
      A: 0, // 1~5의 첫 번째 옵션
      R: 0, // 1~5의 두 번째 옵션
      B: 0, // 6~10의 첫 번째 옵션
      C: 0, // 6~10의 두 번째 옵션
      L: 0, // 11~15의 첫 번째 옵션
      S: 0, // 11~15의 두 번째 옵션
      J: 0, // 16~20의 첫 번째 옵션
      P: 0, // 16~20의 두 번째 옵션
    });
  
    const handleNext = () => {
        if (selectedOption !== null) {
          const questionGroup = Math.floor(currentQuestion / 5); // 0: 1~5, 1: 6~10, 2: 11~15, 3: 16~20
          const scoreKey = ["AR", "BC", "LS", "JP"][questionGroup][
            selectedOption - 1
          ]; // A, R, B, C, L, S, J, P 중 선택
      
          // 선택한 옵션에 따라 점수 업데이트
          setScores((prevScores) => ({
            ...prevScores,
            [scoreKey]: prevScores[scoreKey] + 1,
          }));
      
          setProgress((prev) => (prev + increment <= 100 ? prev + increment : 100));
      
          if (currentQuestion + 1 < totalQuestions) {
            setCurrentQuestion((prev) => prev + 1);
          } else {
            // MBTI 결과 계산
            const calculatedMbti =
              (scores.A >= 3 ? "A" : "R") +
              (scores.B >= 3 ? "B" : "C") +
              (scores.L >= 3 ? "L" : "S") +
              (scores.J >= 3 ? "J" : "P");
      
            // 결과 페이지로 이동
            navigate("/MbtiResultPage", { state: { mbti: calculatedMbti } });
          }
          setSelectedOption(null);
        }
      };
      
  
    const handlePrev = () => {
      setProgress((prev) => (prev - increment >= 0 ? prev - increment : 0));
      setCurrentQuestion((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
      setSelectedOption(null);
    };
  
    const handleSelectOption = (option) => {
      setSelectedOption(option);
    };

  return (
    <div className="w-full p-4 flex flex-col items-center mt-20">
      {/* Progress Bar */}
      <div className="w-full max-w-lg h-6 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Text */}
      <p className="mt-2 text-gray-700 text-sm">
        {Math.round(progress)}% 완료 (
        {Math.round((progress / 100) * totalQuestions)} / {totalQuestions} 문제)
      </p>

      {/* Question */}
      <div className="text-[40px] font-semibold w-[60vw] h-[15vh] overflow-hidden break-words mt-10">
        {questions[currentQuestion].question}
      </div>
      <p className="mt-10 text-gray-600">둘 중에 하나를 선택하세요</p>
      <div className="flex space-x-4 mt-10">
        {/* Option 1 */}
        <div
          className={`p-6 border rounded-lg w-[15vw] h-[30vh] flex flex-col items-center transform transition-transform duration-300 hover:scale-105 ${
            selectedOption === 1 ? "bg-[#4B6BFB] text-white" : "bg-white"
          }`}
          onClick={() => handleSelectOption(1)} // 클릭 시 옵션 1 선택
        >
          <div
            className={`w-10 h-10 border rounded-full flex items-center justify-center text-gray-600 mb-4 ${
              selectedOption === 1 ? "bg-white" : "border-gray-400"
            }`}
          >
            1
          </div>
          <p
            className={`text-sm text-center mt-10 ${
              selectedOption === 1 ? "text-white" : "text-gray-500"
            }`}
          >
            {questions[currentQuestion].options[0]}
          </p>
        </div>

        {/* Option 2 */}
        <div
          className={`p-6 border rounded-lg w-[15vw] h-[30vh] flex flex-col items-center transform transition-transform duration-300 hover:scale-105 ${
            selectedOption === 2 ? "bg-[#4B6BFB] text-white" : "bg-white"
          }`}
          onClick={() => handleSelectOption(2)} // 클릭 시 옵션 2 선택
        >
          <div
            className={`w-10 h-10 border rounded-full flex items-center justify-center text-gray-600 mb-4 ${
              selectedOption === 2 ? "bg-white" : "border-gray-400"
            }`}
          >
            2
          </div>
          <p
            className={`text-sm text-center mt-10 ${
              selectedOption === 2 ? "text-white" : "text-gray-500"
            }`}
          >
            {questions[currentQuestion].options[1]}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-20 flex gap-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-all"
          disabled={progress === 0} // 진행이 0%일 때 비활성화
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
          disabled={progress === 100 || selectedOption === null} // 진행이 100%이거나 옵션을 선택하지 않았을 때 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MbtiDetailPage;
