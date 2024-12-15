import axiosInstance from "../../Config";

const RequestS3urlApi = async (fileName, contentType) => {
  try {
    const response = await axiosInstance.post(
      `/user-service/auth/users/profile/presigned-url`, {
        fileName,
        contentType,
      }
    );
    console.log("API Response:", response.data);
    const result = response.data;
    return result;

  } catch (error) {
    if (error.response) {
      const { status, code, message} = error.response.data;
      if (status == 400 && code == "USR009") {
        throw new Error(message);
      } else if (status == 401 && code == "USR016") {
        throw new Error(message);
      } else if ( status == 500 && code == "SYS001") {
        throw new Error (message); 
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

export default RequestS3urlApi;
