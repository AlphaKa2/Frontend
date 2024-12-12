import axiosInstance from "../../Config";

const RequestAuthCodeApi = async (phoneNumber) => {
  try {
    const response = await axiosInstance.post(
      "/auth-service/sms/authentication",
      {
        phoneNumber,
      }
    );
    console.log(response.data);
    const result = response.data;
    return result;
     
  } catch (error) { 
    console.log("인증번호 전송 에러:",  error)
    let errorMessage = "인증번호를 받을 수 없습니다. 다시 시도해주세요.";
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);

      if (error.response.status === 400) {
        errorMessage = "잘못된 전화번호 형식이거나 등록되지 않은 번호입니다.";
      } else if (error.response.status === 404) {
        errorMessage = "해당 전화번호로 인증 요청을 처리할 수 없습니다.";
      } else if (error.response.status >= 500) {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else {
        errorMessage = "인증 요청 처리 중 문제가 발생했습니다.";
      }

      // 에러 메시지를 던짐
      throw new Error(errorMessage);
    } else if (error.request) {
      // 서버로 요청은 갔으나 응답이 없을 경우
      console.error("서버 응답 없음:", error.request);
      errorMessage =
        "서버 응답을 받을 수 없습니다. 네트워크 연결을 확인해주세요.";
      throw new Error(errorMessage);
    } else {
      // 요청 설정 중 오류가 발생한 경우
      console.error("요청 오류:", error.message);
      errorMessage = "인증 요청 처리 중 알 수 없는 오류가 발생했습니다.";
      throw new Error(errorMessage);
    }
  }
};

export default RequestAuthCodeApi;
