import axiosInstance from "../../Config";

const ResetPasswordApi = async (email, smsConfirmation, newPassword) => {
  try {
    const response = await axiosInstance.post(
      "/user-service/users/password/reset",
      {
        email,
        smsConfirmation,
        newPassword,
      }
    );
    const result = response.data;
    return result;
    
  } catch (error) {
    if (error.response) {
      const response = error.response;

      // 토큰이 유효하지 않은 경우
      if (response.status === 400 && response.code === "USR009") {
        console.error("유효하지 않은 토큰:", response.message);
        throw new Error("읽을 수 없는 요청입니다.");
      } else if(response.status === 401 && response.code === "USR016") {
        console.error("유효하지 않은 토큰:", response.message);
        throw new Error("권한이 없습니다."); 
      } else if(response.status === 404 && response.code === "USR018") {
        console.error("유효하지 않은 토큰:", response.message);
        throw new Error("존재하지 않는 사용자입니다.");
      }
    } else if (error.request) {
      // 요청이 전송되었지만 응답이 없을 경우
      console.error("서버 응답 없음:", error.request);
      throw new Error(
        "서버와의 연결이 실패했습니다. 네트워크 상태를 확인해주세요."
      );
    } else {
      console.error("요청 오류:", error.message);
      throw new Error("비밀번호 변경 요청 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default ResetPasswordApi;
