import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import loginState from "../../recoil/atoms/loginState";
import { submitComment } from "../../api/blog-services/blog/CommentApi";

const CommentWrite = ({ postId,parentId ,fetchComments}) => {
  const [commentValue, setNewComment] = useState(""); // 댓글 입력 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 관리
  const { profileImageUrl, nickname } = useRecoilValue(loginState); // 로그인 상태 값 가져오기

  // 댓글 입력 내용 변경 핸들러
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // 댓글 등록 버튼 클릭 핸들러
  const handleSubmit = async () => {
    if (!commentValue.trim()) {
      alert("댓글 내용을 입력하세요.");
      return; // 빈 값일 경우 요청하지 않음
    }

    setIsSubmitting(true);
    try{
      await submitComment(postId, commentValue, parentId); 
      alert("댓글이 등록되었습니다!");
      setNewComment(""); // 입력 필드 초기화
      fetchComments(); // 댓글 데이터 새로고침
    } catch (error) {
      console.error("댓글 등록 중 오류가 발생했습니다:", error);
      alert("댓글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false); // 제출 상태 해제
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-start items-center">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-[40px] h-[40px] rounded-full mr-3"
        />
        <strong className="text-[18px] font-bold text-[#333]">{nickname}</strong>
      </div>

    
      <textarea
        className="w-full h-32 p-4 mt-4 border border-[#ddd] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        placeholder="댓글 작성하기"
        value={commentValue}
        onChange={handleCommentChange}
        aria-label="댓글 작성하기"
        disabled={isSubmitting} // 제출 중일 경우 비활성화
      />

      
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
