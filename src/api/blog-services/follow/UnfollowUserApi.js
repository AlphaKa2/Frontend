import axiosInstance from "../../Config";

const UnfollowUserApi = async (targetUserId) => {
  try {
    const response = axiosInstance.delete(
      `/user-service/users/${targetUserId}/following`
    );
    return true;
  } catch (error) {
    if (error.response) {
      const { status, code, message } = error.response.data;
      if (status == 400 && code == USR009) {
        throw new Error("언팔로우 할 수 없습니다.");
      } else if (status == 404 && code == USR018) {
        throw new Error("존재하지 않는 사용자입니다.");
      }
    } else if (error.request) {
      console.error("서버 응답 없음:", error.request);
      throw new Error(
        "서버와의 연결이 실패했습니다. 네트워크 상태를 확인해주세요"
      );
    } else {
      console.error("요청 오류:", error.message);
      throw new Error("언팔로우 요청 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default UnfollowUserApi;

