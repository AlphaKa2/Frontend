import axiosInstance from "../../Config";

const UpdateUserMbtiApi = async (userId,mbti) => {
  try {
    const response = await axiosInstance.put(

      `/user-service/auth/users/${userId}/mbti`, {
        mbti,
      }
    );
    return response;

  } catch (error) {
    if (error.response) {
      const { status, code } = error.response.data;
      if (status == 401 && code == "USR016") {
        throw new Error("권한이 없습니다.");
      } else if (status == 400 && code == "USR009") {
        throw new Error("알 수 없는 mbti입니다.");
      }
    } else if (error.request) {
      console.error("서버 응답 없음:", error.request);
      throw new Error(
        "서버와의 연결이 실패했습니다. 네트워크 상태를 확인해주세요"
      );
    } else {
      console.error("요청 오류:", error.message);
      throw new Error("mbti 검사 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default UpdateUserMbtiApi;
