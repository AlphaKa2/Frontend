import axios from "axios";

// 특정 여행 추천 ID로 데이터 가져오기
export const fetchTripDetailsById = async (recommendation_trip_id) => {
  const accessToken = localStorage.getItem("accessToken"); // 토큰 가져오기

  // recommendationTripId 유효성 확인
  if (!recommendation_trip_id) {
    console.error("Invalid Recommendation Trip ID:", recommendation_trip_id);
    throw new Error("Recommendation Trip ID is required.");
  }

  try {
    const response = await axios.get(
      `http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations/${recommendation_trip_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-User-Id": "1", // 필요시 실제 값으로 교체
          "X-User-Role": "admin", // 필요시 실제 값으로 교체
          "X-User-Profile": "profile_data", // 필요시 실제 값으로 교체
          "X-User-Nickname": "nickname", // 필요시 실제 값으로 교체
        },
      }
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
      `http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations/${recommendationTripId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-User-Id": "1", // 필요시 실제 값으로 교체
          "X-User-Role": "admin", // 필요시 실제 값으로 교체
          "X-User-Profile": "profile_data", // 필요시 실제 값으로 교체
          "X-User-Nickname": "nickname", // 필요시 실제 값으로 교체
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting trip by ID:", error);
    throw error; // 에러 발생 시 호출한 쪽에서 처리 가능
  }
};