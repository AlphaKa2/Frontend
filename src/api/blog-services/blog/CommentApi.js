import axios from "../../axios";

export const submitComment = async (postId, content, parentId) => {
    try {
      const response = await axios.post("/blog-service/auth/api/comments", {
        postId,
        content,
        parentId: parentId ? parentId : null, // parentId가 존재하면 그대로 사용, 없으면 null
        isPublic: true, // 항상 true로 설정
      });
      return response.data; // 필요한 데이터만 반환
    } catch (error) {
      console.error("댓글 등록 중 오류가 발생했습니다:", error);
      throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
    }
  };
  

  // 특정 게시글의 댓글 가져오기
  export const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await axios.get(`/blog-service/auth/api/comments/post/${postId}`);
      return response.data.data; // 댓글 데이터만 반환
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류가 발생했습니다:", error);
      throw error; // 에러를 호출한 곳에서 처리할 수 있도록 던짐
    }
  };
  

export const updateComment = async (EditingCommentId, content) => {
    try {
      const response = await axios.put(
        `/blog-service/auth/api/comments/${EditingCommentId}`,
        {
          content,
        }
      );
      return response.data.data; // 필요한 데이터 반환
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
      throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
    }
  };
  
export const deleteComment = async (commentId) => {
  try {
    await axios.delete(`/blog-service/auth/api/comments/${commentId}`);
  } catch (error) {
    console.error("댓글 삭제 중 오류가 발생했습니다:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};


export const toggleCommentLike = async (commentId) => {
  try {
    const response = await axios.post(
      `/blog-service/auth/api/likes/comment/${commentId}`
    );
    return response.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("좋아요 요청 중 오류 발생:", error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};
