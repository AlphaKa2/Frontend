import React, { useState, useEffect } from "react";
import CommentEdit from "./CommentEdit";
import { useRecoilValue } from "recoil";
import loginState from "../recoil/atoms/loginState";
import axios from "../api/axios";
import { format } from "date-fns";
import heart from "../assets/images/heart_black.png";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import authorState from "../recoil/atoms/authorState"; // Recoil atom 가져오기

const safeFormatDate = (dateString, fallback = "Invalid Date") => {
  const date = new Date(dateString);
  return isNaN(date) ? fallback : format(date, "yyyy-MM-dd HH:mm");
};

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
  updatedAt,
  fetchComments,
}) => {
  const setAuthor = useSetRecoilState(authorState); // Recoil 상태 업데이트 함수
  const navigate = useNavigate();
  const { userId } = useRecoilValue(loginState);
  const { nickname } = useRecoilValue(loginState);
  const { profileImageUrl } = useRecoilValue(loginState);
  const [Reply, setReply] = useState(""); // 댓글 입력 상태
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [editContent, setEditContent] = useState(content);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(0);

  useEffect(()=>{
    setIsCommentLiked(liked);
    setCommentLikeCount(likeCount);
    console.log(commentLikeCount);
    console.log(isCommentLiked);
  },[fetchComments]);

  const handleAuthorClick = () => {
    setAuthor(author); // 클릭된 author 값을 Recoil 상태에 저장
    navigate(`/blog-service/api/posts/blog/${author}`); 
    console.log(`Author set to: ${author}`);
  };
  

  const handleSubmit = async () => {
    if (!Reply.trim()) {
      alert("답글 내용을 입력하세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/blog-service/auth/api/comments", {
        postId,
        content: Reply,
        parentId: commentId,
        isPublic: true,
      });
      alert("답글이 등록되었습니다!");
      setReply("");
      setShowReplyInput(false);
      fetchComments();
    } catch (error) {
      console.error("답글 제출 오류:", error);
      alert("답글 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleDeleteComment = async () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/blog-service/auth/api/comments/${commentId}`);
        alert("댓글이 삭제되었습니다.");
        fetchComments();
      } catch (error) {
        console.error("댓글 삭제 중 오류가 발생했습니다:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  const handleCommentLikeClick = async () => {
    try {
      await axios.post(`/blog-service/auth/api/likes/comment/${commentId}`);
      console.log(likeCount);
      setIsCommentLiked(!isCommentLiked); // 상태를 토글
      if (isCommentLiked == false) {
        setCommentLikeCount((commentLikeCount) => (commentLikeCount + 1));
      } else {
        setCommentLikeCount((commentLikeCount) => (commentLikeCount - 1));
      }
    } catch (error) {
      console.error("좋아요 요청 중 오류 발생:", error);
    }
  };

  return (
    <div
  className={`${
    !parentId ? "border-b-[3px] border-[#ddd] mt-[2em] pb-3" : "pt-2 pb-4"
  }`}
>
  {isEditing ? (
    <CommentEdit
      commentId={commentId}
      initialContent={editContent}
      onCancel={handleCancelEdit}
      onSuccess={() => {
        setIsEditing(false);
      }}
      fetchComments={fetchComments}
    />
  ) : (
    <>
      <div className="flex justify-between items-center mb-[8px] px-1">
        <button onClick={handleAuthorClick} className="flex justify-center items-center">
          <img
            src={authorProfileImage}
            alt="Profile"
            className="w-[40px] h-[40px] rounded-[50%] mr-[12px]"
          />
          <strong className="text-[18px] font-bold text-[#333]">
            {author}
          </strong>
        </button>
        {userId === authorId && (
          <div className="flex">
            <button
              onClick={handleEditComment}
              className="text-gray-500 text-[12px] px-1 py-0.5 rounded-lg"
            >
              수정
            </button>
            <button
              onClick={handleDeleteComment}
              className="text-gray-500 text-[12px] px-1 py-0.5 rounded-lg"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="text-[18px] text-[#555] mb-[16px] leading-[1.6] px-1">
        {content}
      </div>

      <div className="flex justify-start items-center space-x-1 px-1">
        <div className="text-[12px] text-[#666]">
          {safeFormatDate(createdAt)}
        </div>
        <div className="text-[12px] text-[#666]">|</div>
        <button className="text-[12px] text-[#666]">신고</button>
      </div>

      {!parentId && (
        <div className="flex justify-between items-center space-x-1 mt-3 px-1">
          <button
            onClick={() => setShowReplyInput(!showReplyInput)}
            className="text-[12px] text-[#666] border-[0.1px] border-gray-300 px-1 py-0.5"
          >
            답글
          </button>
          <button onClick={handleCommentLikeClick} className="flex justify-center items-center text-[12px] text-[#666] border-[0.1px] border-gray-300 px-1 py-0.5">
            <img src={heart} alt="heart" className="w-3.5 h-3.5 mr-1" />
            {commentLikeCount}
          </button>
        </div>
      )}

      {replies && replies.length > 0 && (
        <div className="mt-1 border-l-[2px] border-gray-300 pl-5 mt-[1em] ml-[0.4em] mb-[0.5em]">
          {replies.map((reply) => (
            <EachComment
              key={reply.commentId}
              {...reply}
              fetchComments={fetchComments}
            />
          ))}
        </div>
      )}

      {showReplyInput && (
        <div className="mt-4 pl-4">
          <div className="flex justify-start items-center">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-[40px] h-[40px] rounded-[50%] mr-[12px]"
            />
            <strong className="text-[18px] font-bold text-[#333]">
              {nickname}
            </strong>
          </div>
          <textarea
            className="w-full h-40 p-4 mt-4 border-2 border-[#ddd] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="답글 작성하기"
            value={Reply}
            onChange={handleReplyChange}
            disabled={isSubmitting}
          />
          <div className="mt-4 text-right">
            <button
              onClick={handleSubmit}
              className={`bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </div>
      )}
    </>
  )}
</div>

  );
};

export default EachComment;
