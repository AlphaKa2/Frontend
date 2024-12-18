// Config.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://172.16.210.54.nip.io:32085", // API 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 요청 제한 시간 설정
  withCredentials: true
});

// 요청 인터셉터: AccessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // LocalStorage에서 AccessToken 가져오기
    const token = localStorage.getItem("accessToken");
    // console.log("Current accessToken:", token); // 토큰 값 확인
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 오류 처리
  }
);

// 응답 인터셉터: 오류 처리 및 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 응답 그대로 반환
  async (error) => {
    const originalRequest = error.config; // 실패한 요청 정보

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 방지 플래그

      try {
        const refreshResponse = await axiosInstance.post(
          "/auth-service/reissue",
          { withCredentials: true }
        );

        const { accessToken } = refreshResponse.data;
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // 요청 재시도
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);

        // 갱신 실패 이유에 따라 처리
        if (refreshError.response?.status === 401) {
          console.warn("리프레시 토큰 만료: 로그아웃 처리");
          localStorage.removeItem("accessToken"); // 리프레시 토큰 만료 시 토큰 삭제
          window.location.href = "/login"; // 로그인 페이지로 이동
        } else {
          console.warn("일시적인 갱신 실패: 기존 토큰 유지");
          // 여기서는 accessToken을 삭제하지 않음
        }
      }
    }

    return Promise.reject(error);
  }
);


// 요청 및 응답 인터셉터 추가는 생략 (axios.js와 중복)
export default axiosInstance;
