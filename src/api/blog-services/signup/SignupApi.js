import axiosInstance from "../../Config";

const SignupApi = async (
  email,
  name,
  phoneNumber,
  birth,
  gender,
  nickname,
  password,
  smsConfirmation,
) => {
  try {
    // 회원가입 요청
    const response = await axiosInstance.post("/user-service/users/join", {
      email,
      name,
      phoneNumber,
      birth,
      gender,
      nickname,
      password,
      smsConfirmation,
    });

    const result = response.data;
    return result ;

  } catch (error) {
    if (error.response) {
    const { status, code, message } = error.response.data;
      if (status === 400 && code == "USR009") {
          throw new Error(message);
       } else if (status === 401 && code == "USR016") {
          throw new Error(
            message
          );
       } else if (status === 409 && code == "USR015") {
        throw new Error(
          message
        );
       }
      }   
     else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error("No Response Received:", error.request);
      throw new Error(
        "서버와의 연결에 실패했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      // 요청을 설정하는 중에 발생한 오류
      console.error("Request Configuration Error:", error.message);
      throw new Error("회원가입 중 알 수 없는 오류가 발생했습니다.");
    }
  } 
  
};

export default SignupApi;
