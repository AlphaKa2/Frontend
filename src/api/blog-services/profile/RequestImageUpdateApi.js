import axios from "axios";

// S3에 이미지를 업로드하는 API
const RequestImageUpdateApi = async (presignedUrl, file) => {
  try {
    // PUT 요청으로 이미지 업로드
    const response = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type, // 파일 타입 지정
      },
    });
    return response.status; // 성공 시 상태 코드 반환
  } catch (error) {
    console.error("S3 업로드 실패:", error);
    throw new Error("이미지 업로드 중 오류가 발생했습니다.");
  }
};

export default RequestImageUpdateApi;
