import axiosInstance from '../axios'; // baseURL 설정된 axios 가져오기

// 여행 추천 생성 요청
export const createRecommendation = async (requestData,headers) => {
  try {
    const response = await axiosInstance.post(
      '/ai-service/auth/recommendations', // 슬래시로 경로 시작
      requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      } // 요청 데이터
    );
    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error creating recommendation:", error);
    throw error; // 호출한 쪽에서 에러 처리 가능
  }
};



