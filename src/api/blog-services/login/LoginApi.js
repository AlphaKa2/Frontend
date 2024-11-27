import axiosInstance from "../../Config";

const LoginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth-service/login", {
      email,
      password,
    });
    
    const user = response.data;
    return user;
  } catch (error) {
    let errorMessage = "로그인 중 문제가 발생했습니다. 다시 시도해주세요.";

    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);

      if (error.response.status === 401) {
        errorMessage =
          "이메일 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요.";
      } else if (error.response.status >= 500) {
        errorMessage = "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else {
        errorMessage = "로그인 중 알 수 없는 오류가 발생했습니다.";
      }
      // 에러 메시지를 던짐
      throw new Error(errorMessage);
    } else if (error.request) {
      errorMessage =
        "서버 응답을 받을 수 없습니다. 네트워크 연결을 확인해주세요.";
      // 에러 메시지를 던짐
      throw new Error(errorMessage);
    } else {
      errorMessage = "로그인 중 알 수 없는 오류가 발생했습니다.";
      // 에러 메시지를 던짐
      throw new Error(errorMessage);
    }
  }
};

export default LoginApi;
