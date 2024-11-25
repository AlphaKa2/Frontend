import axiosInstance from "../../Config";

const SignupApi = async (
  email,
  name,
  phoneNumber,
  nickname,
  gender,
  birth,
  password
) => {
  try {
    // 회원가입 요청
    const response = await axiosInstance.post("/user-service/users/join", {
      email,
      name,
      phoneNumber,
      nickname,
      gender,
      birth,
      password,
    });

    // 요청이 성공한 경우
  } catch (error) {
    if (error.response) {
      // 서버가 응답했지만 상태 코드가 2xx 범위가 아닌 경우
      const { status, message } = error.response.data;

      // 상태 코드별 오류 처리
      if (status === 400) {
        if (message.includes("역직렬화 실패")) {
          throw new Error(
            "잘못된 데이터 형식입니다. 입력값을 다시 확인해주세요."
          );
        } else {
          throw new Error(`입력 오류: ${message}`);
        }
      } else if (status === 409) {
        if (message.includes("이메일")) {
          throw new Error("이미 사용 중인 이메일입니다.");
        } else if (message.includes("닉네임")) {
          throw new Error("이미 사용 중인 닉네임입니다.");
        }
      } else {
        // 기타 상태 코드 처리
        throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      throw new Error(
        "서버와의 연결에 실패했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      // 요청을 설정하는 중에 발생한 오류
      throw new Error("회원가입 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default SignupApi;
