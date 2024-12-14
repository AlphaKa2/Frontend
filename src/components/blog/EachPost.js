import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns"; // date-fns 라이브러리 사용
import like_pic from "../../assets/images/like.png";
import comment_pic from "../../assets/images/comment.png";
import { useNavigate } from "react-router-dom";

const EachPost = ({
  postId, // 고유 ID
  title, // 게시글 제목
  content, // 게시글 내용
  image, // 대표 이미지 URL
  tags, // 태그 배열
  likeCount, // 좋아요 수
  commentCount, // 댓글 수
  viewCount, // 조회수
  createdAt, // 작성 시간
  updatedAt, // 수정 시간 (optional)
}) => {
  const navigate = useNavigate();

  // 상세 페이지 이동 함수
  const visitDetailPage = () => {
    navigate(`/blog-service/auth/api/posts/${postId}`);
  };

  // 날짜 포맷 처리
  const formattedCreatedAt = format(new Date(createdAt), "yyyy-MM-dd HH:mm");
  const formattedUpdatedAt = updatedAt
    ? format(new Date(updatedAt), "yyyy-MM-dd HH:mm")
    : formattedCreatedAt;

  return (
    <div
      className="w-[70vw] h-[22vh] rounded-md border-gray-300 border-[0.2px] shadow-lg box-border px-[0.5vw] py-[1vh] mt-[2vh] cursor-pointer flex flex-row justify-between z-10"
      onClick={visitDetailPage}
    >
      {/* 게시글 내용 */}
      <div className="w-[80vw] h-[20vh] px-[0.5vw] space-y-[0.3vh] flex flex-col justify-between">
        {/* 게시글 제목 */}
        <div className="font-semibold text-black h-[5vh] text-[2em] overflow-hidden">
          {title}
        </div>
        {/* 게시글 내용 스니펫 */}
        <div className="text-gray-500 text-[1.1em] h-[8vh] overflow-hidden line-clamp-1">
          {content}
        </div>
        {/* 태그 목록 */}
        <div className="flex space-x-[0.4vw]">
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-[0.7vw]"
            >
              {tag}
            </div>
          ))}
        </div>
        {/* 좋아요, 댓글 */}
        <div className="flex space-x-[1vw]">
          {/* 좋아요 */}
          <div className="flex">
            <img
              src={like_pic}
              alt="like"
              className="w-[18px] h-[16px] mt-[0.5vh]"
            />
            <div className="ml-1">{likeCount}</div>
          </div>
          {/* 댓글 */}
          <div className="flex">
            <img
              src={comment_pic}
              alt="comment"
              className="w-[20px] h-[18px] mt-[0.5vh]"
            />
            <div className="ml-1">{commentCount}</div>
          </div>
        </div>
        
      </div>

      {/* 이미지 또는 날짜/조회수 */}
      <div className="flex flex-col justify-end items-end w-[20vw] px-[0.5vw]">
      {image ? (
      <img
        src={image}
        alt={title}
        className="w-[15vw] h-[17vh] my-[0.5vh] mr-[0.5vw] p-[1px] rounded-md object-cover"
      />
    ) : null}

        <div className="flex justify-center items-center text-gray-500 mr-[1vw]">
          <div className="w-auto mr-[1vw] text-[1em]">{formattedUpdatedAt}</div>
          <div className="w-auto text-[1em]">조회 {viewCount}</div>
        </div>
      </div>
    </div>
  );
};

EachPost.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string), // 태그는 문자열 배열
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  viewCount: PropTypes.number,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
};

export default EachPost;
