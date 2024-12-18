import axios from 'axios';
import axiosInstance from '../axios'; // 상대 경로 주의
/**
 * 여행 계획 생성 완료시 알람 요청 API
 * @param {number} user_Id - 추천 여행 ID
 * @returns {Promise} - Axios 응답
 */
export const getNotificationById = async (user_Id) => {
    const accessToken = localStorage.getItem('accessToken'); // 토큰 가져오기
    
    // 추천 조회 API 호출
    return axios.get(
      `ai-service/auth/recommendations/notifications/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
          
        },
      }
    );
  };