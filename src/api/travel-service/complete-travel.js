// src/api/travel-service/update_travel.js

import axiosInstance from '../axios'; // axios 인스턴스 가져오기

/**
 * 여행 상태 업데이트 API
 * @param {number} travelId - 여행 계획 ID
 * @param {string} status - 업데이트할 상태 (예: "COMPLETED")
 */
export const updateTravelStatus = async (travelId, status) => {
  try {
    const response = await axiosInstance.put(
      `travel-service/auth/api/travels/${travelId}/status`,
      null, // PUT 요청이지만 Body가 없으므로 null로 설정
      {
        params: { status }, // Query parameter로 상태 전달
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating travel status:', error);
    throw error;
  }
};


/**
 * Fetch completed itinerary details
 * @param {number} travelId - The ID of the travel plan
 * @returns {Promise} - Axios response
 */
export const fetchCompletedItinerary = async (travelId) => {
  const accessToken = '<유효한 토큰>';
  try {
    // travelId를 경로 파라미터로 사용
    const response = await axiosInstance.get(`travel-service/auth/api/travels/${travelId}/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // { status: 200, message: "...", data: [...] } 형태일 것
  } catch (error) {
    console.error('Error fetching completed itinerary:', error);
    throw error;
  }
};

/**
 * 별점 데이터 전송
 * @param {number} travelId - 여행 ID
 * @param {Array} reviewData - [{ place: { placeId, placeName, ... }, rating: number }, ...] 형태
 */
export const submitRatings = async (travelId, reviewData) => {
  const accessToken = '<유효한 토큰>';
  try {
    const response = await axiosInstance.post(`travel-service/auth/api/travels/${travelId}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving ratings:', error);
    throw error;
  }
};