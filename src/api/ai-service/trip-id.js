
import axios from "../axios";
import axiosInstance from "../axiosInstance";

// 특정 여행 추천 ID로 데이터 가져오기
export const fetchTripDetailsById = async (recommendation_trip_id) => {
  // recommendationTripId 유효성 확인
  if (!recommendation_trip_id) {
    console.error("Invalid Recommendation Trip ID:", recommendation_trip_id);
    throw new Error("Recommendation Trip ID is required.");
  }

  try {
    const response = await axiosInstance.get(
      `ai-service/auth/recommendations/${recommendation_trip_id}` // 경로만 전달
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trip details by ID:", error);
    throw error; // 에러 발생 시 호출한 쪽에서 처리 가능
  }
};

// 특정 여행 추천 ID로 데이터 삭제
export const deleteTripById = async (recommendationTripId) => {
  const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기
  try {
    const response = await axios.delete(

      `ai-service/auth/recommendations/${recommendationTripId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting trip by ID:", error);
    throw error; // 에러 발생 시 호출한 쪽에서 처리 가능
  }
};


/**
 * 특정 여행 계획 ID로 데이터를 가져오는 함수
 * @param {number} travelId - 여행 계획 ID
 * @returns {Promise<object>} - 여행 계획 데이터
 */
export const getTravelById = async (travelId) => {
  try {
    // 요청 전 travelId 확인
    if (!travelId) {
      throw new Error('travelId is required');
    }

    // API 요청
    const response = await axiosInstance.get(
      `travel-service/auth/api/travels/${travelId}`,
      
    );

    // 성공 시 데이터 반환
    return response.data;
  } catch (error) {
    console.error('Error fetching travel data:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * 여행 계획 삭제 API
 * @param {number} travelId - 삭제할 여행 계획의 ID
 * @returns {Promise} - API 응답 결과
 */
export const DeleteTravelApi = async (travelId) => {
  try {
    const response = await axiosInstance.delete(
      `/travel-service/auth/api/travels/${travelId}`,
      {
        headers: { skipAuthHandler: true }, // 이 요청은 401 처리 인터셉터 우회
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // 401 에러 시 특정 메시지 반환
      return { error: true, message: "권한이 없습니다." };
    }
    throw error; // 다른 에러는 그대로 throw
  }
};


