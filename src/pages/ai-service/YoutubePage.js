import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { processYoutubeLink } from '../../api/ai-service/youtube'; // 분리된 API 함수 가져오기

import PAImage from '../../assets/images/Pani_Aus.jpg';
import YoutubeImage from '../../assets/images/youtubeB.png';

const YoutubeBanner = () => {
  const [youtubeLink, setYoutubeLink] = useState(''); // 유튜브 링크 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 React Router의 useNavigate 훅

  /**
   * 유튜브 링크를 백엔드로 전송하여 처리하는 함수
   */
  const handleSubmit = async () => {
    try {
      console.log('유튜브 링크 전송 중:', youtubeLink);
      const response = await processYoutubeLink(youtubeLink, 1); // user_id = 1로 가정

      const recommendation_trip_id = response.data.recommendation_trip_id;

      if (response.status === 200 && recommendation_trip_id) {
        navigate('/YoutubeResult', { state: { recommendation_trip_id } });
      } else {
        console.error('추천 여행 ID가 없습니다.');
        alert('여행 코스 생성을 실패했습니다.');
      }
    } catch (error) {
      console.error('유튜브 링크 처리 중 오류:', error);
      alert('유튜브 링크 처리에 실패했습니다.');
    }
  };

  /**
   * 유튜브 포스트 클릭 이벤트 처리
   * @param {number} postId - 클릭된 포스트 ID
   */
  const handleClick = (postId) => {
    console.log(`포스트 클릭: ${postId}`);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <img src={YoutubeImage} alt="YouTube Icon" className="w-24 h-24 mb-6" />
      <h2 className="text-2xl font-bold mb-2 text-center">내 최애 여행 유튜버의<br />여행 코스 따라가자!</h2>
      <p className="text-gray-500 text-center mb-4">따라가고 싶은 동영상 링크 입력하고,<br />AI가 생성해주는 여행 코스 그대로 따라가기</p>
      
      {/* 유튜브 링크 입력 */}
      <div className="flex items-center space-x-2 mb-10">
        <input
          type="text"
          placeholder="https://youtu.be/example"
          className="border border-red-500 p-2 rounded w-72"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:shadow-lg transition duration-200"
          onClick={handleSubmit}
        >
          생성하기
        </button>
      </div>

      {/* 유튜브 예시 및 정보 */}
      <div className="flex flex-col md:flex-row justify-center w-full">
        {/* 코스 생성 방법 안내 */}
        <div className="md:w-2/5 text-left mb-6 md:mb-0 md:mr-6">
          <h3 className="font-semibold">＜여행 코스 생성 방법＞</h3>
          <ol className="text-gray-700 mt-2 space-y-1">
            <li>1. 좋아하는 여행 유튜브 영상에서 ‘공유’ 버튼을 클릭하세요.</li>
            <li>2. 링크를 복사하여 아래 입력창에 붙여넣으세요.</li>
            <li>3. ‘생성하기’ 버튼을 클릭하세요.</li>
            <li>4. 잠시만 기다리시면 AI가 여행 코스를 만들어드립니다!</li>
          </ol>
          <p className="text-gray-400 mt-4">20분 동영상 기준 생성되는데 약 3분이 걸립니다.</p>
        </div>
        
        {/* 예시 보기 */}
        <div className="md:w-2/5 text-center">
          <h3 className="font-semibold">＜예시 보기＞</h3>
          <div className="flex justify-center mt-4">
            <img
              src={PAImage}
              alt="Example Video Thumbnail"
              className="w-48 h-32 object-cover rounded-md shadow-lg cursor-pointer"
              onClick={() => handleClick(0)}
            />
          </div>
          <p className="text-sm mt-2">빠니보틀<br />고독하게 혼자 즐기는 발리 신혼여행지</p>
        </div>
      </div>
    </div>
  );
};

export default YoutubeBanner;
