import axiosInstance from "../../Config";

const GetFollowersListApi = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-service/users/${userId}/follower`);
    const user = response.data;

    return user;
  } catch (error) {
    if (error.response) {
      const { status, code } = error.response.data;
      if (status == 404 && code == "USR018") {

        throw new Error("존재하지 않는 사용자입니다.");
      }
    } else if (error.request) {
      console.error("서버 응답 없음:", error.request);
      throw new Error(
        "서버와의 연결이 실패했습니다. 네트워크 상태를 확인해주세요"
      );
    } else {
      console.error("요청 오류:", error.message);
      throw new Error("팔로워 목록 요청 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default GetFollowersListApi;
