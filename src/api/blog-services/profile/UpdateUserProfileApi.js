import axiosInstance from "../../Config";

const UpdateUserProfileApi = async (userId,nickname,profileDescription) => {
  try {
    const response = axiosInstance.put(
      "/user-service/users/{userId}/details", {
        nickname,
        profileDescription,
      }
    );
    return {message : "프로필 수정이 완료되었습니다."};

  } catch (error) {
    if (error.response) {
      const { status, code} = error.response.data;
      if (status == 409 && code == USR007) {
        throw new Error("이미 사용중인 닉네임입니다.");
      } else if (status == 401 && code == USR016) {
        throw new Error("유효하지 않은 토큰입니다.");
      }
    } else if (error.request) {
      console.error("서버 응답 없음:", error.request);
      throw new Error(
        "서버와의 연결이 실패했습니다. 네트워크 상태를 확인해주세요"
      );
    } else {
      console.error("요청 오류:", error.message);
      throw new Error("프로필 업데이트 중 요청 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default UpdateUserProfileApi;
