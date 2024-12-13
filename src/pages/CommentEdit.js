import React, { useState } from "react";
import axios from "../api/axios";


const CommentEdit = ({ commentId, initialContent, onCancel, onSuccess, fetchComments}) => {
  const [editContent, setEditContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (!editContent.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.put(`/blog-service/auth/api/comments/${commentId}`, {
        content: editContent,
      });
      alert("댓글이 수정되었습니다.");
      fetchComments();
      onSuccess();
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
      alert("댓글 수정에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      <textarea
        value={editContent}
        onChange={handleContentChange}
        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
        rows="3"
        disabled={isSubmitting}
      ></textarea>
      <div className="mt-2 flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-400 rounded-md hover:bg-gray-100"
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          onClick={handleEditSubmit}
          className={`px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "수정 중..." : "수정하기"}
        </button>
      </div>
    </div>
  );
};

export default CommentEdit;
