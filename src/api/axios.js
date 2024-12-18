
import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://172.16.210.54.nip.io:32085", // API 기본 URL
  timeout: 30000, // 요청 타임아웃 (30초)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // 쿠키 전송 활성화
});

// 응답 인터셉터 수정
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 응답 처리
  async (error) => {

    const originalRequest = error.config;

    // 401 Unauthorized 처리
    if (error.response?.status === 401) {
      const errorMessage = error.response.data?.message;

      if (errorMessage === "유효하지 않은 토큰입니다.") {
        console.error("세션 만료: 유효하지 않은 토큰.");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");

        // 세션 초기화
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // 로그인 페이지로 리다이렉션
      } else {
        console.warn("권한 문제 발생:", errorMessage);
        alert("권한 문제가 발생했습니다.");
      }

      return Promise.reject(error); // 에러 반환
    }

    // 다른 오류는 그대로 반환
    return Promise.reject(error);
  }
);

// 요청 인터셉터: Access Token 추가
axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
