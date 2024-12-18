import React, { useState, useEffect } from "react";
import EachComment from "./EachComment";
import CommentWrite from "./CommentWrite";
import { fetchCommentsByPostId } from "../../api/blog-services/blog/CommentApi"; // 댓글 데이터 API 호출 함수

const CommentSection = ({ postId}) => {
  const [comments, setComments] = useState([]); // 댓글 상태 관리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  // 댓글 데이터 불러오기 함수
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetchCommentsByPostId(postId);
      setComments(response); // 댓글 상태 갱신
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 댓글 불러오기
  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="max-w-4xl mx-auto mt-4">
      {isLoading ? (
        <p className="text-center text-gray-500">댓글을 불러오는 중...</p>
      ) : (
        <div>
          {comments.map((eachComment) => (
            <EachComment
              key={eachComment.commentId}
              postId={postId}
              commentId={eachComment.commentId}
              parentId={eachComment.parentId || null}
              authorId={eachComment.authorId}
              author={eachComment.author}
              authorProfileImage={eachComment.authorProfileImage || ""}
              content={eachComment.content}
              replies={eachComment.children || []}
              likeCount={eachComment.likeCount || 0}
              liked={eachComment.liked || false}
              isPublic={eachComment.isPublic || true}
              createdAt={eachComment.createdAt}
              updatedAt={eachComment.updatedAt}
              fetchComments={fetchComments} // 댓글 새로고침 함수 전달
            />
          ))}
        </div>
      )}

      {/* 댓글 작성 컴포넌트 */}
      <CommentWrite
  postId={postId}
  fetchComments={fetchComments}
/>

    </div>
  );
};

export default CommentSection;

