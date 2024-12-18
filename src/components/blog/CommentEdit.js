import React, { useState } from "react";
import { updateComment } from "../../api/blog-services/blog/CommentApi";

const CommentEdit = ({ EditingCommentId, initialContent, onCancel, onSuccess }) => {
  const [editContent, setEditContent] = useState(initialContent); // 초기 내용 설정
  const [isSubmitting2, setIsSubmitting2] = useState(false); // 제출 상태 관리

  // 댓글 내용 변경 핸들러
  const handleContentChange = (e) => {
    setEditContent(e.target.value);
  };

  // 댓글 수정 제출 핸들러
  const handleEditSubmit = async () => {
    if (!editContent.trim()) {
      alert("댓글 내용을 입력하세요."); // 빈 입력 방지
      return;
    }

    setIsSubmitting2(true);
    try {
      const log = await updateComment(EditingCommentId, editContent); // 댓글 수정 API 호출
      console.log("EditingCommentId="+EditingCommentId)
      alert("댓글이 성공적으로 수정되었습니다!");
      console.log(log);
      onSuccess(); // 성공 시 부모 컴포넌트에서 댓글 목록 갱신
      
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting2(false); // 제출 상태 해제
    }
  };

  return (
    <div className="border p-4 rounded-lg bg-gray-50 shadow-sm">
      {/* 수정 내용 입력 */}
      <textarea
        value={editContent}
        onChange={handleContentChange}
        className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
        rows="3"
        disabled={isSubmitting2} // 제출 중일 때 비활성화
        placeholder="댓글 내용을 수정하세요."
      />

      {/* 버튼 영역 */}
      <div className="mt-3 flex justify-end space-x-2">
        {/* 취소 버튼 */}
        <button
          onClick={onCancel} // 수정 취소 핸들러
          className={`px-4 py-2 text-sm text-gray-600 border border-gray-400 rounded-lg hover:bg-gray-100 transition ${
            isSubmitting2 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting2} // 제출 중 비활성화
        >
          취소
        </button>

        {/* 수정 버튼 */}
        <button
          onClick={handleEditSubmit} // 수정 제출 핸들러
          className={`px-4 py-2 text-sm text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 transition ${
            isSubmitting2 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting2} // 제출 중 비활성화
        >
          {isSubmitting2 ? "수정 중..." : "수정하기"}
        </button>
      </div>
    </div>
  );
};

export default CommentEdit;
