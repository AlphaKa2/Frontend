import apiClient from "../../axios";
import { v4 as uuidv4 } from "uuid";

// 게시글 수정 데이터 가져오기
export const fetchEditPost = async (postId) => {
  try {
    const response = await apiClient.get(`/blog-service/auth/api/posts/${postId}/edit`);
    return response.data.data; // 게시글 데이터 반환
  } catch (error) {
    console.error("게시글을 가져오는데 실패했습니다:", error);
    throw error; // 호출 측에서 에러를 처리할 수 있도록 던짐
  }
};

// 이미지 업로드
export const uploadImageToS3 = async (file) => {
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 10MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

  // 파일 검증
  const validateFile = (file) => {
    const fileType = file.type;
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      alert("jpg, jpeg, png, gif 형식의 파일만 업로드 가능합니다.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 최대 10MB까지 허용됩니다.");
      return false;
    }
    return true;
  };

  if (!validateFile(file)) {
    return null;
  }

  const uniqueIdentifier = uuidv4();
  const fileExtension = file.name.split(".").pop();
  const fileName = `${uniqueIdentifier}.${fileExtension}`;

  try {
    const { data: presignedData } = await apiClient.post(
      "/blog-service/api/posts/presigned-url",
      {
        fileName,
        contentType: file.type,
      }
    );

    const presignedUrl = presignedData.data.url;

    // S3에 파일 업로드
    await apiClient.put(presignedUrl, file, {
      headers: { "Content-Type": file.type },
    });

    // 최종 S3 이미지 URL 반환
    return `https://alphaka-storage.s3.amazonaws.com/posts/${fileName}`;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }
};

// 게시글 수정 저장
export const saveEditedPost = async (postId, editedPost) => {
  try {
    const response = await apiClient.put(
      `/blog-service/auth/api/posts/${postId}`,
      editedPost,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    throw error;
  }
};
