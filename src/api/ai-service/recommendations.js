import axios from 'axios';

/**
 * 여행 추천 생성 API
 * @param {Object} requestData - 추천 생성에 필요한 데이터
 * @returns {Promise} - Axios 응답
 */
export const createRecommendation = async (requestData) => {
  const accessToken = localStorage.getItem('accessToken'); // 토큰 가져오기
  
  // 추천 생성 API 호출
  return axios.post(
    'http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations',
    requestData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
        'X-User-Id': '1',
        'X-User-Role': 'admin',
        'X-User-Profile': 'profile_data',
        'X-User-Nickname': 'nickname',
      },
    }
  );
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
    `http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations/${recommendationId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
        'X-User-Id': '1',
        'X-User-Role': 'admin',
        'X-User-Profile': 'profile_data',
        'X-User-Nickname': 'nickname',
      },
    }
  );
};
