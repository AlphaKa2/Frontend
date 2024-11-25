import axiosInstance from "../../Config";

const UpdatePasswordApi = async (userId, previousPassword, newPassword) => {
  try {
    const response = await axiosInstance.put(
      "/user-service/users/{userId}/password",
      {
        previousPassword,
        newPassword,
      }
    );

    return {
      message: "비밀번호 변경이 완료되었습니다.",
    };
  } catch (error) {
    if (error.response) {
      const { status, code, message } = error.response.data;

      // 토큰이 유효하지 않은 경우
      if (status === 401 && code === "USR016") {
        console.error("유효하지 않은 토큰:", message);
        throw new Error("권한이 없습니다. 다시 로그인해주세요.");
      }

      // 이전 비밀번호가 틀린 경우
      if (status === 400 && code === "USR005") {
        throw new Error("이전 비밀번호가 일치하지 않습니다.");
      }

      // 이전 비밀번호와 새 비밀번호가 동일한 경우
      if (status === 400 && code === "USR006") {
        throw new Error("새 비밀번호가 기존 비밀번호와 동일합니다.");
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
