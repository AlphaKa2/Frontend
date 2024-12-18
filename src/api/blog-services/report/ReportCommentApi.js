import axiosInstance from "../../Config";

const ReportCommentApi = async (targetId, reason, details) => {
  try {
    const response = await axiosInstance.post(
      "blog-service/auth/api/reports/comments", {

      targetId,
      reason,
      details,
      }
    );
    const result = response.data;
    return result;


  } catch (error) {
    if (error.response) {
      const {status, code, message } = error.response;
      if (status == 400 && code == "CMT001") {
        throw new Error(message);
      } 

    } else if (error.request) {
      console.error("서버 응답 없음:", error.request);
      throw new Error(
        "서버와의 연결이 실패했습니다. 네트워크 상태를 확인해주세요"
      );
    } else {
      console.error("요청 오류:", error);
      throw new Error("신고 요청 중 알 수 없는 오류가 발생했습니다.");
    }
  }
};

export default ReportCommentApi;
