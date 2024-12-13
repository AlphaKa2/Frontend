import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns"; // date-fns 라이브러리 사용
import like_pic from "../assets/images/like.png";
import comment_pic from "../assets/images/comment.png";
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
      className="w-[1200px] h-[205px] rounded-md border-gray-300 border-[0.2px] shadow-lg box-border p-1 mt-4 cursor-pointer flex flex-row justify-start z-10"
      onClick={visitDetailPage}
    >
      <div className={`w-[${image ? "80%" : "100%"}] px-2`}>
        {/* 게시글 제목 */}
        <div className="font-semibold text-black h-[50px] text-[2em] overflow-hidden ">
          {title}
        </div>

        {/* 게시글 내용 스니펫 */}
        <div className="text-gray-500 text-[1.1em] h-[55px] overflow-hidden line-clamp-1 ">
          {content}
        </div>

        {/* 태그 목록 */}
        <div className="flex space-x-2 mt-2">
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* 좋아요, 댓글 */}
        <div className="mt-4 flex justify-between">
          <div className="flex space-x-3">
            {/* 좋아요 */}
            <div className="flex">
              <img
                src={like_pic}
                alt="like"
                className="w-[18px] h-[16px] mt-[5px]"
              />
              <div className="ml-1">{likeCount}</div>
            </div>
            {/* 댓글 */}
            <div className="flex">
              <img
                src={comment_pic}
                alt="comment"
                className="w-[20px] h-[18px] mt-1"
              />
              <div className="ml-1">{commentCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 또는 시간/조회수 */}
      {image ? (
        <div className="flex">
          <div className="flex justify-center items-end text-gray-500">
            <div className="w-[9em] h-[2em] overflow-hidden">
              {formattedUpdatedAt}
            </div>
            <div className="w-[5em] h-[2em] overflow-hidden">
              조회 {viewCount}
            </div>
          </div>
          <div className="pt-3 pr-3">
            <img
              src={image}
              alt={title}
              className="w-[450px] h-[175px] rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-end text-gray-500">
          <div className="w-[9em] h-[2em] overflow-hidden">
            {formattedUpdatedAt}
          </div>
          <div className="w-[5em] h-[2em] overflow-hidden">
            조회 {viewCount}
          </div>
        </div>
      )}
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
