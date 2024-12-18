import axiosInstance from "../../Config";

const UpdatePasswordApi = async (userId, previousPassword, newPassword) => {
  try {
    const response = await axiosInstance.put(
      `/user-service/auth/users/${userId}/password`,
      {
        previousPassword,
        newPassword,
      }
    );
    const result = response.data;
    console.log(response.data);
    return result;
    
  } catch (error) {
    if (error.response) {
      const { status, code, message } = error.response.data;
      console.error(error.response.data);

      // 토큰이 유효하지 않은 경우
      if (status === 400 && code === "USR006" || status ===401 && code == "USR016" || status ===404 && code == "USR018") {
        console.error(message);
        throw new Error(message);
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

export default UpdatePasswordApi;
