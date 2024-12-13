import axios from "axios";

// S3에 이미지를 업로드하는 API
const RequestImageUpdateApi = async (presignedUrl, file) => {
  try {
    if (!(file instanceof Blob)) {
      throw new Error("file은 Blob 또는 File 객체여야 합니다.");
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB 제한
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다.");
    }

    // PUT 요청으로 이미지 업로드
    const response = await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type, // 파일 타입 지정
      },
    });

    if (response.status === 200) {
      console.log("S3 업로드 성공");
      return response;
    } else {
      throw new Error("S3 업로드가 실패했습니다.");
    }
  } catch (error) {
    if (error.response) {
      console.error("서버 오류:", error.response.data);
    } else if (error.request) {
      console.error("네트워크 오류: 요청이 전송되지 않았습니다.");
    } else {
      console.error("알 수 없는 오류:", error.message);
    }
    throw new Error("이미지 업로드 중 오류가 발생했습니다.");
  }
};

export default RequestImageUpdateApi;
