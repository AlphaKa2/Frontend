import React, { useState, useEffect } from "react";
import CommentEdit from "./CommentEdit";
import { useRecoilValue, useSetRecoilState } from "recoil";
import loginState from "../../recoil/atoms/loginState";
import authorState from "../../recoil/atoms/authorState";
import { format } from "date-fns";
import heartIcon from "../../assets/images/heart_black.png";
import { useNavigate } from "react-router-dom";
import {
  deleteComment,
  submitComment,
  toggleCommentLike,
} from "../../api/blog-services/blog/CommentApi";
import CommentWrite from "./CommentWrite";

const EachComment = ({
  postId,
  commentId,
  parentId,
  authorId,
  author,
  authorProfileImage,
  content,
  likeCount,
  replies,
  liked,
  isPublic,
  createdAt,
  fetchComments,
}) => {
  const { userId, nickname, profileImageUrl } = useRecoilValue(loginState);
  const setAuthor = useSetRecoilState(authorState);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isCommentLiked, setIsCommentLiked] = useState(liked);
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount);
  const [repliesState, setRepliesState] = useState(replies || []);

  useEffect(() => {
    setIsCommentLiked(liked);
    setCommentLikeCount(likeCount);
    setRepliesState(replies || []);
    console.log("EachComment postId"+postId)
  }, [liked, likeCount, replies]);

  const handleAuthorClick = () => {
    setAuthor(author);
    navigate(`/blog-service/api/posts/blog/${author}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : format(date, "yyyy-MM-dd HH:mm");
  };

  const handleDeleteComment = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(commentId);
        alert("댓글이 삭제되었습니다.");
        fetchComments();
      } catch (error) {
        console.error("댓글 삭제 오류:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  const handleCommentLikeToggle = async () => {
    try {
      await toggleCommentLike(commentId);
      setIsCommentLiked((prev) => !prev);
      setCommentLikeCount((prev) => (isCommentLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("좋아요 토글 오류:", error);
    }
  };

  return (
    <div
      className={`${
        parentId ? "pt-2 pb-4" : "border-b-2 border-gray-300 mt-6 pb-3"
      }`}
    >
      {isEditing ? (
        <CommentEdit
          EditingCommentId={commentId}
          initialContent={editContent}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false);
            fetchComments();
            console.log("댓글수정: "+commentId);
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-2 px-1">
            <button onClick={handleAuthorClick} className="flex items-center">
              <img
                src={authorProfileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3"
              />
              <strong className="text-lg font-bold text-gray-800">
                {author}
              </strong>
            </button>
            {userId === authorId && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-500 text-sm px-2 py-1 rounded-md"
                >
                  수정
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="text-gray-500 text-sm px-2 py-1 rounded-md"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-700 text-sm mb-4 px-1">{content}</p>
          <div className="flex items-center space-x-2 px-1 text-sm text-gray-500">
            <span>{formatDate(createdAt)}</span>
            <span>|</span>
            <button>신고</button>
          </div>

          {!parentId && (
            <div className="flex justify-between items-center mt-3 px-1 space-x-2">
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="text-sm text-gray-500 border px-2 py-1 rounded-md"
              >
                답글
              </button>
              <button
                onClick={handleCommentLikeToggle}
                className="flex items-center text-sm text-gray-500 border px-2 py-1 rounded-md"
              >
                <img src={heartIcon} alt="Like" className="w-4 h-4 mr-1" />
                {commentLikeCount}
              </button>
            </div>
          )}

          {/* 답글 리스트 */}
          {repliesState.length > 0 && (
            <div className="mt-4 ml-4">
              {repliesState.map((reply) => (
                <EachComment
                  key={reply.commentId}
                  {...reply}
                  fetchComments={fetchComments}
                />
              ))}
            </div>
          )}
          {/* 답글 입력창 */}
          {showReplyInput && (
            <div className="mt-4 pl-4">
              <CommentWrite
                postId={postId}
                parentId={commentId} // 부모 댓글 ID 전달
                fetchComments={fetchComments}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EachComment;
