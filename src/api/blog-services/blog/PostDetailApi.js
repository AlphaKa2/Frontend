import axios from "../../axios";

// 게시글 데이터를 가져오는 함수
const fetchPostData = async (postId) => {
  try {
    const response = await axios.get(`/blog-service/auth/api/posts/${postId}`);
    return response.data.data;
  } catch (error) {
    console.error("게시글을 가져오는데 실패", error);
    throw error;
  }
};

// 댓글 데이터를 가져오는 함수
const fetchCommentsData = async (postId) => {
  try {
    const response = await axios.get(
      `/blog-service/auth/api/comments/post/${postId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("댓글 불러오기 실패:", error);
    throw error;
  }
};

// 좋아요 요청을 처리하는 함수
const sendLikeRequest = async (postId) => {
  try {
    await axios.post(`/blog-service/auth/api/likes/post/${postId}`);
  } catch (error) {
    console.error("좋아요 요청 중 오류 발생:", error);
    throw error;
  }
};

// 게시글 삭제 요청 함수
const deletePostData = async (postId) => {
  try {
    const response = await axios.delete(
      `/blog-service/auth/api/posts/${postId}`
    );
    return response.status;
  } catch (error) {
    console.error("삭제 요청 중 오류 발생:", error);
    throw error;
  }
};

export { fetchPostData, fetchCommentsData, sendLikeRequest, deletePostData };
