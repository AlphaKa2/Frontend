import React, { useState } from "react";
import EachComment from "./EachComment";
import CommentWrite from "./CommentWrite";

const CommentSection = ({ postId, originComments, fetchComments}) => {
  return (
    <div className="max-w-4xl mx-auto mt-4">
      {/* 댓글 리스트 */}
      <div>
        {originComments.map((eachComment) => (
          <EachComment
          postId={postId}
          commentId={eachComment.commentId}
          parentId={eachComment.parentId || null} // 기본값 처리
          authorId={eachComment.authorId}
          author={eachComment.author}
          authorProfileImage={eachComment.authorProfileImage || ""}
          content={eachComment.content}
          replies={eachComment.children || []} // 기본값 처리
          likeCount={eachComment.likeCount || 0}
          liked={eachComment.liked || false}
          isPublic={eachComment.isPublic || true}
          createdAt={eachComment.createdAt}
          updatedAt={eachComment.updatedAt}
          fetchComments={fetchComments}
        />
        
        ))}
      </div>

      {/* 댓글 작성 컴포넌트 */}
      <CommentWrite postId={postId} originComments = {originComments} fetchComments={fetchComments}/>
    </div>
  );
};

export default CommentSection;