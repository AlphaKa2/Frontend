import React from 'react';
import './Comment.css';

function Comment({ username, profileImage, content, timestamp, likes }) {
  return (
    <div className="comment">
      <div className="comment-header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="comment-info">
          <strong className="username">사용자</strong>
        </div>
      </div>
      <div className="comment-content">댓글내용입니다. 댓글내용입니다. 댓글내용입니다.</div>
      <div className="comment-meta">
        <span className="timestamp">{timestamp}</span>
        <button className="report-button">신고</button>
      </div>
      <div className="comment-footer">
        <button className="action-button">답글</button>
        <button className="like-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className="heart-icon"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
          {likes}
        </button>
      </div>
    </div>
  );
}

export default Comment;
