import axiosInstance from "../Config";

const LoginApi = async (email, password) => {

  try {
    const response = await axiosInstance.post("/auth-service/login", {
      email,
      password,
    });

  } catch (error) {
    console.error("로그인 오류:", error);
    alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
  }
};

export default LoginApi;



