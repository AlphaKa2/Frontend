import axiosInstance from "../../Config";

const VerifyAuthCodeApi = async (phoneNumber, authenticationCode) => {
  try {
    const response = await axiosInstance.post(
      "/auth-service/sms/verification",
      {
        phoneNumber,
        authenticationCode,
      }
    );
    console.log("인증번호 검증 결과:",response);
    
    const result = response.data; // 인증 성공 시 반환되는 데이터
    return result;
    // return {
    //   success: true,
    //   message: "인증 번호가 전송되었습니다.", // 성공 메시지
    //   data: result,
    // };
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 했고, 상태 코드가 2xx 범위 외에 있을 경우
      console.log(error.response.data); // 서버 오류 메시지 출력
      console.log(error.response.status); // 상태 코드 출력

      // 오류 코드에 따른 메시지 설정
      let errorMessage = "인증에 실패했습니다. 다시 시도해주세요.";

      // 상태 코드가 400이면 잘못된 인증번호일 가능성 있음
      if (error.response.status === 400) {
        console.error(error.message);
        errorMessage = "잘못된 인증번호입니다. 다시 확인해주세요.";
      }

      // 상태 코드가 408이면 인증 만료일 가능성 있음
      else if (error.response.status === 408) {
        errorMessage =
          "인증 시간이 만료되었습니다. 새로운 인증번호를 요청해주세요.";
      }

      // 다른 서버 오류 상태 코드 처리
      else if (error.response.status >= 500) {
        errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }

      throw new Error(errorMessage); // 에러 메시지를 전달
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error("서버 연결 오류:", error.request);
      throw new Error(
        "서버와의 연결에 실패했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      // 요청을 설정하는 중에 발생한 오류
      console.error("오류 발생:", error.message);
      throw new Error("인증 요청 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default VerifyAuthCodeApi;
