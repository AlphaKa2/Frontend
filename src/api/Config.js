import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.16.210.54:31214", // API 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000, // 요청 제한 시간 설정
});

// 요청 인터셉터: AccessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // LocalStorage에서 AccessToken 가져오기
    const token = localStorage.getItem("accessToken");
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
      // 토큰 갱신 로직
      originalRequest._retry = true; // 재시도 방지 플래그

      try {
        // 리프레시 토큰으로 새 AccessToken 요청
        const refreshResponse = await axiosInstance.post(
          "/auth-service/reissue",
          { withCredentials: true } // HttpOnly 쿠키 포함 요청
        );

        // 새 AccessToken 저장
        const { accessToken } = refreshResponse.data;
        localStorage.setItem("accessToken", accessToken);

        // 실패한 요청에 새 AccessToken 추가
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // 요청 재시도
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken"); // 기존 토큰 삭제
        window.location.href = "/login"; // 로그인 페이지로 이동
      }
    }

    // 다른 오류는 그대로 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;
