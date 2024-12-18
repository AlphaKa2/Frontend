import axios from "../../axios";

// 게시글 목록 조회
export const fetchPosts = async (nickname, currentPage, postsPerPage, sort) => {
  try {
    const endpoint = `/blog-service/api/posts/blog/${nickname}`;
    const params = {
      page: currentPage,
      size: postsPerPage,
      sort,
    };

    const response = await axios.get(endpoint, { params });
    return response.data.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("게시글 데이터를 불러오는데 실패했습니다:", error);
    throw error;
  }
};

// 검색 결과 조회
export const fetchSearchResults = async (
  currentPage,
  postsPerPage,
  sort,
  keyword
) => {
  try {
    const endpoint = `/blog-service/api/posts/search`;
    const params = {
      page: currentPage,
      size: postsPerPage,
      sort,
      keyword,
    };

    const response = await axios.get(endpoint, { params });
    return response.data.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("검색 데이터를 불러오는데 실패했습니다:", error);
    throw error;
  }
};

export const fetchProfile = async (nickname) => {
  try {
    const response = await axios.get(`/user-service/users/nickname/${nickname}/profile`);
    return response.data.data;
  } catch (error) {
    console.error("태그 데이터를 가져오는 중 오류 발생:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

export const getTags = async (nickname) => {
  try {
    const response = await axios.get(`/blog-service/api/tags/blog/${nickname}`);
    return response.data.data; // 필요한 데이터만 반환
  } catch (error) {
    console.error("태그 데이터를 가져오는 중 오류 발생:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

export const fetchEditedPost = async (postId) => {
  try {
    const response = await axios.get(`/blog-service/auth/api/posts/${postId}/edit`);
    return response.data.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("게시글을 가져오는데 실패", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

// Presigned URL을 얻기 위한 API 요청
export const getPresignedUrl = async (fileName, contentType) => {
  try {
    const response = await axios.post("/blog-service/api/posts/presigned-url", {
      fileName,
      contentType,
    });
    return response.data.data.url; // Presigned URL 반환
  } catch (error) {
    console.error("Presigned URL 요청 실패:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

// S3에 파일을 업로드하는 API 요청
export const uploadToS3 = async (url, file) => {
  try {
    const response = await axios.put(url, file, {
      headers: { "Content-Type": file.type },
    });
    return response; // S3 업로드 응답 반환
  } catch (error) {
    console.error("S3 업로드 실패:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

// 게시글 수정 API 요청
export const submitEditedPost = async (postId, editedPost) => {
  try {
    const response = await axios.put(
      `/blog-service/auth/api/posts/${postId}`,
      editedPost,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response; // 전체 응답 반환
  } catch (error) {
    console.error("게시글 수정 중 오류가 발생했습니다:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

// 특정 게시글 정보 가져오기
export const fetchPostById = async (postId) => {
  try {
    const response = await axios.get(`/blog-service/auth/api/posts/${postId}`);
    return response.data.data; // 필요한 데이터만 반환
  } catch (error) {
    console.error("게시글을 가져오는 중 오류가 발생했습니다:", error);
    throw error; // 에러를 호출한 곳에서 처리하도록 던짐
  }
};

// API 분리: 게시글 좋아요 요청
export const togglePostLike = async (postId) => {
  try {
    const response = await axios.post(`/blog-service/auth/api/likes/post/${postId}`);
    return response.status === 200; // 성공 여부 반환
  } catch (error) {
    console.error("좋아요 요청 중 오류 발생:", error);
    throw error; // 에러를 다시 던져 호출한 곳에서 처리하도록 함
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`/blog-service/auth/api/posts/${postId}`);
    if (response.status === 200) {
      return true; // 삭제 성공
    } else {
      console.error("게시글 삭제 실패");
      return false; // 삭제 실패
    }
  } catch (error) {
    console.error("게시글 삭제 중 오류 발생:", error);
    throw error; // 에러를 호출한 곳에서 처리할 수 있도록 던짐
  }
};

export const savePost = async (postData) => {
  try {
    const response = await axios.post("/blog-service/auth/api/posts", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("게시글 저장 중 오류가 발생했습니다:", error);
    throw error;
  }
};

