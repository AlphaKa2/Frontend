import React, { useState } from "react";
import axios from "../api/axios";
import { useRecoilValue } from "recoil";
import loginState from "../recoil/atoms/loginState";

const CommentWrite = ({ postId, originComments, fetchComments }) => {
  const [newComment, setNewComment] = useState(""); // 댓글 입력 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 관리
  const { profileImageUrl } = useRecoilValue(loginState);
  const { nickname } = useRecoilValue(loginState);

  // 댓글 입력 내용 변경 핸들러
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // 댓글 등록 버튼 클릭 핸들러
  const handleSubmit = async () => {
    if (!newComment.trim()) return; // 빈 값일 경우 요청하지 않음

    setIsSubmitting(true);
    try {
      const response = await axios.post("/blog-service/auth/api/comments", {
        postId, // 게시글 ID
        content: newComment, // 댓글 내용
        parentId: originComments.parentId || null, // 부모 댓글 ID (답글 아님)
        isPublic: true, // 공개 여부
      });

      // 성공적으로 등록되었을 경우 originComments에 추가
      console.log("등록된 댓글:", response.data);
      fetchComments();
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 등록 중 오류가 발생했습니다:", error);
    } finally {
      setIsSubmitting(false); // 제출 상태 해제
    }
  };

  return (
    <div className="mt-[7em]">
      <div className="flex justify-start items-center">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-[40px] h-[40px] rounded-[50%] mr-[12px]"
        />
        <strong className="text-[18px] font-bold text-[#333]">{nickname}</strong>
      </div>
      {/* 댓글 입력 */}
      <textarea
        className="w-full h-40 p-4 mt-4 border-2 border-[#ddd] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        placeholder="댓글 작성하기"
        value={newComment}
        onChange={handleCommentChange}
        aria-label="댓글 작성하기"
        disabled={isSubmitting} // 제출 중일 경우 비활성화
      />

      {/* 등록 버튼 */}
      <div className="mt-4 text-right">
        <button
          onClick={handleSubmit}
          className={`bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting} // 제출 중일 경우 비활성화
        >
          {isSubmitting ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </div>
  );
};

export default CommentWrite;
