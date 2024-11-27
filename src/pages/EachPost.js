import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns"; // date-fns 라이브러리 사용
import like_pic from "../assets/images/like.png";
import comment_pic from "../assets/images/comment.png";

const EachPost = ({
  key,
  title,
  content,
  image,
  tags,
  likeCount,
  commentCount,
  viewCount,
  createdAt,
  updatedAt,
  time,
}) => {
  const formattedCreatedAt = format(new Date(createdAt), "yyyy-MM-dd HH:mm");
  const formattedUpdatedAt = format(new Date(updatedAt), "yyyy-MM-dd HH:mm");

  if (formattedUpdatedAt == null) {
    time = formattedCreatedAt;
  } else {
    time = formattedUpdatedAt;
  }

  return (
    <div className="w-[1200px] h-[205px] rounded-md border-gray-300 border-[0.2px] shadow-lg box-border p-1 mt-4 cursor-pointer flex flex-row justify-start z-10">
      <div className="w-[80%] px-2">
        <div className="font-semibold text-black text-[2em] overflow-hidden">
          {title}
        </div>
        <div className="text-gray-500 text-[1.1em] h-[55px] overflow-hidden line-clamp-1">
          {content}
        </div>

        {/* 태그 */}
        <div className="flex space-x-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* 좋아요와 댓글 작성날짜 조회*/}
        <div className="mt-4 ml-0.5 flex space-x-3 justify-between">
          <div className="flex">
            <div className="flex">
              <img
                src={like_pic}
                alt="like"
                className="w-[18px] h-[16px] mt-[5px]"
              />
              <div className="ml-1">{likeCount}</div>
            </div>
            <div className="flex ml-3">
              <img
                src={comment_pic}
                alt="comment"
                className="w-[20px] h-[18px] mt-1"
              />
              <div className="ml-1">{commentCount}</div>
            </div>
          </div>
          <div className="flex">
            <div className="text-gray-500">{time}</div>
            <div className="text-gray-500 ml-2">조회 {viewCount}</div>
          </div>
        </div>
      </div>

      <div className="pt-1">
        <img
          src={image} // props로 전달된 image 사용
          alt={title}
          className="w-[300px] h-[200px] rounded-md"
        />
      </div>
    </div>
  );
};

EachPost.propTypes = {
  key: PropTypes.number, // React에서는 key prop은 실제로 propTypes에 정의할 필요는 없지만 참고용으로 남겨둠
  title: PropTypes.string.isRequired, // 제목은 필수값
  content: PropTypes.string.isRequired, // 내용도 필수값
  image: PropTypes.string.isRequired, // 이미지 URL도 필수값
  tags: PropTypes.object, // 태그는 필수가 아닐 수 있음
  likeCount: PropTypes.number, // 좋아요 개수
  commentCount: PropTypes.number, // 댓글 개수
  viewCount: PropTypes.number, // 조회수
  createdAt: PropTypes.string.isRequired, // 생성일(필수값)
  updatedAt: PropTypes.string, // 수정일(필수값이 아닐 수 있음)
};

export default EachPost;
