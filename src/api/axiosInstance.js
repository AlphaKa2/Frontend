import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://172.16.210.54.nip.io:32085", // API 기본 URL
  timeout: 30000, // 요청 타임아웃 (30초)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 전송 활성화
});

// 응답 인터셉터 수정
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 응답 처리
  async (error) => {
    const originalRequest = error.config;

    // 요청에 skipAuthHandler가 포함된 경우 401 처리 스킵
    if (originalRequest.headers?.skipAuthHandler) {
      console.warn("401 에러 스킵됨: skipAuthHandler 사용.");
      return Promise.reject(error); // 오류를 UI에서 처리하도록 그대로 반환
    }

    // 401 Unauthorized 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token 요청
        const refreshResponse = await axiosInstance.post("/auth-service/reissue");
        const { accessToken } = refreshResponse.data;

        // 새 Access Token 저장 및 요청 헤더 업데이트
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh Token 갱신 실패:", refreshError);

        // 세션 만료 처리
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // 로그인 페이지로 이동
      }
    }

    // 기타 에러 반환
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
