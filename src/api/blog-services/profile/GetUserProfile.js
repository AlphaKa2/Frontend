import axiosInstance from "../../Config";

const GetUserProfileApi = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/user-service/auth/users/${userId}/profile`

    );
    const result = response.data;
    return result;

  } catch (error) {
    if (error.response) {
      const { status, code, message } = error.response.data;
      if (status == 404 && code == "USR018") {
        throw new Error(message);
      }
    } else if (error.request) {
      console.error("서버 응답 없음:", error.request);
      throw new Error(
        "서버와의 연결이 실패했습니다. 네트워크 상태를 확인해주세요"
      );
    } else {
      console.error("요청 오류:", error.message);
      throw new Error("프로필 불러오기 중 요청 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default GetUserProfileApi;

