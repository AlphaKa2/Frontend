// LoginAPI.js
import axiosInstance from "../../Config";

const LoginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth-service/login", {
      email,
      password,
    });

    // Access Token과 Refresh Token 저장
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);

    let errorMessage = "로그인 중 문제가 발생했습니다. 다시 시도해주세요.";
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "이메일 또는 비밀번호가 잘못되었습니다.";
      } else if (error.response.status >= 500) {
        errorMessage = "서버 오류입니다. 잠시 후 다시 시도해주세요.";
      }
    } else {
      errorMessage = "네트워크 오류입니다. 연결 상태를 확인해주세요.";
    }
    throw new Error(errorMessage);
  }
};

export default LoginApi;
