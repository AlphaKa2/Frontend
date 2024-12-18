
import axios from '../axios';
import axiosInstance from '../axios';

/**
 * 여행 추천 생성 API
 * @param {Object} requestData - 추천 생성에 필요한 데이터
 * @returns {Promise} - Axios 응답
 */
export const createRecommendation = async (requestData) => {

  try {
    // 추천 생성 API 호출
    const response = await axiosInstance.post(
      '/ai-service/auth/recommendations', // 경로만 작성
      requestData // 요청 데이터
    );

    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error creating recommendation:", error);
    throw error; // 호출한 쪽에서 에러 처리 가능
  }
};

/**
 * 여행 추천 조회 API
 * @param {number} recommendationId - 추천 여행 ID
 * @returns {Promise} - Axios 응답
 */
export const getRecommendationById = async (recommendationId) => {
  const accessToken = localStorage.getItem('accessToken'); // 토큰 가져오기
  
  // 추천 조회 API 호출
  return axios.get(

    `ai-service/auth/recommendations/${recommendationId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
        
      },
    }
  );
};