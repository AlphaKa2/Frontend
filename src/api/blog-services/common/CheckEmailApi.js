import axiosInstance from "../../Config"; // Axios 인스턴스를 import

// 닉네임 중복 확인 API 호출 함수
const CheckEmailApi = async (email) => {
  try {
    const response = await axiosInstance.get(`/user-service/users/email/${email}/exist`);
    const status = response.data.status;
    return status;

    }catch(error) {
      // 서버 연결 오류 처리
      if (error.response) {
        // 서버가 응답했지만 에러 상태 코드가 있는 경우
        if (error.response.data.status === 409 && error.response.data.code == "USR015") {
          // 닉네임 중복 오류 처리
          throw new Error("이미 사용중인 이메일입니다.");
        } else {
          // 그 외의 서버 오류 처리
          console.error(error.response.data.message)
          throw new Error("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      } else if (error.request) {
        // 요청은 했지만 응답을 받지 못한 경우
        throw new Error("서버 연결 오류가 발생했습니다. 네트워크 상태를 확인해주세요.");
      } else {
        // 요청을 설정하는 중에 발생한 오류
        throw new Error("중복 검사 중 알 수 없는 오류가 발생했습니다.");
      }
    }

    
};

export default CheckEmailApi;
