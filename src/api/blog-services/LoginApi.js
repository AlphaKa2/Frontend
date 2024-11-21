import axiosInstance from "../Config";

const LoginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth-service/login", {
      email,
      password,
    });

  } catch (error) {
    console.error("로그인 오류:", error);
    alert("잘못된 이메일 또는 비밀번호입니다.");
  }
};

export default LoginApi;



