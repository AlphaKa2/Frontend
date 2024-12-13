// Config.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.16.210.54:31214", // API 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 요청 제한 시간 설정
  withCredentials: true, // 쿠키 전송 활성화
});

// Refresh Token 요청 함수
export async function postRefreshToken() {
  try {
    const response = await axiosInstance.post("/auth-service/reissue", {
      withCredentials: true,
    });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    console.error("Refresh Token 요청 중 오류:", error);
    throw error;
  }
}

// 요청 및 응답 인터셉터 추가는 생략 (axios.js와 중복)
export default axiosInstance;
