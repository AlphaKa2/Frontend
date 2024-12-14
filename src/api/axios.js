// axios.js
import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://172.16.210.54:31214', // API 기본 URL
  timeout: 30000, // 요청 타임아웃 (30초)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송 활성화
});

// 응답 인터셉터 수정
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 응답 처리
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    // 401 Unauthorized 처리
    if (status === 401 && !config._retry) {
      config._retry = true; // 재시도 방지 플래그

      try {
        // Refresh Token으로 새 Access Token 요청
        const refreshResponse = await axiosInstance.post('/auth-service/reissue');
        const { accessToken } = refreshResponse.data;

        // 새 Access Token 저장 및 요청 헤더 업데이트
        localStorage.setItem('accessToken', accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;

        // 원래 요청 재시도
        return axiosInstance(config);
      } catch (refreshError) {
        console.error("Refresh Token 갱신 실패:", refreshError);
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // 로그인 페이지로 이동
      }
    }

    // 다른 오류는 그대로 반환
    return Promise.reject(error);
  }
);

// 요청 인터셉터: Access Token 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.url?.includes("s3.amazonaws.com")) {
      console.log("S3 요청 감지: Authorization 헤더 제거");
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
