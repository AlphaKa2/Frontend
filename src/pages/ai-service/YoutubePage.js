import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { processYoutubeLink } from "../../api/ai-service/youtube";

import YoutubeImage from "../../assets/images/YotubeButton.png";
import Logo1 from "../../assets/images/panibottle.png";
import Logo2 from "../../assets/images/kwak.png";
import Logo3 from "../../assets/images/wonji.png";
import Logo4 from "../../assets/images/chino.png";
import Logo5 from "../../assets/images/soy.png";

const YoutubeBanner = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("유튜브 링크 전송 중:", youtubeLink);
      const response = await processYoutubeLink(youtubeLink, 1);

      const recommendation_trip_id = response.data.recommendation_trip_id;

      if (response.status === 200 && recommendation_trip_id) {
        navigate("/YoutubeResult", { state: { recommendation_trip_id } });
      } else {
        console.error("추천 여행 ID가 없습니다.");
        alert("여행 코스 생성을 실패했습니다.");
      }
    } catch (error) {
      console.error("유튜브 링크 처리 중 오류:", error);
      alert("유튜브 링크 처리에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center w-full px-8">
        <h2 className="text-6xl font-bold mb-6 mt-4 text-center">
          여행 유튜버의<br />여행 코스가 궁금하다면?
        </h2>
        <p className="text-base text-gray-600 text-center mb-4">
          따라가고 싶은 동영상 링크 입력하고,<br />
          AI가 생성해주는 여행 코스 그대로 따라가기
        </p>

        <div className="flex items-center justify-center w-full max-w-[800px] space-x-4 mb-6 mt-12">
          <input
            type="text"
            placeholder="https://youtu.be/example"
            className="border border-gray-200 p-4 rounded-lg text-lg w-full shadow-md hover:shadow-lg transition duration-200"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="transition-transform duration-200 hover:scale-110" // 호버 추가했으
            style={{ marginLeft: '0.001rem' }}
          >
            <img src={YoutubeImage} alt="YouTube Icon" className="w-30 h-16" />
          </button>
        </div>

        {/* 유튜버 로고 컨테이너 */}
        <div className="overflow-hidden w-full h-64 mt-16 relative">
          <div className="flex animate-scrolling gap-40">
            <img src={Logo1} alt="Logo 1" className="w-48 h-48 rounded-full" />
            <img src={Logo2} alt="Logo 2" className="w-48 h-48 rounded-full" />
            <img src={Logo3} alt="Logo 3" className="w-48 h-48 rounded-full" />
            <img src={Logo4} alt="Logo 4" className="w-48 h-48 rounded-full" />
            <img src={Logo5} alt="Logo 5" className="w-48 h-48 rounded-full" />
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scrolling {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scrolling {
            animation: scrolling 20s linear infinite;
            will-change: transform;
          }
        `}
      </style>
    </div>
  );
};

export default YoutubeBanner;