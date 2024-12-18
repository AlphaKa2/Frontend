import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns"; // date-fns 라이브러리 사용
import like_pic from "../../assets/images/like.png";
import comment_pic from "../../assets/images/comment.png";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/images/noImage.png";

const EachPost = ({ posts, nickname }) => {
  const navigate = useNavigate();

  // 상세 페이지 이동 함수
  const visitDetailPage = (postId) => {
    navigate(`/blog-service/api/posts/${postId}`, { state: { nickname, posts} });
  };

  return (
    <div>
      {posts.map((post) => {
        // 날짜 포맷 처리
        const formattedCreatedAt = format(new Date(post.createdAt), "yyyy-MM-dd HH:mm");
        const formattedUpdatedAt = post.updatedAt
          ? format(new Date(post.updatedAt), "yyyy-MM-dd HH:mm")
          : formattedCreatedAt;

        return (
          <div
            key={post.postId}
            className="w-[70vw] h-[22vh] rounded-md border-gray-300 border-[0.2px] shadow-lg box-border px-[0.5vw] py-[1vh] mt-[2vh] cursor-pointer flex flex-row justify-between z-10"
            onClick={() => visitDetailPage(post.postId)}
          >
            {/* 게시글 내용 */}
            <div className="w-[80vw] h-[20vh] px-[0.5vw] space-y-[0.3vh] flex flex-col justify-between">
              {/* 게시글 제목 */}
              <div className="font-semibold text-black h-[5vh] text-[2em] overflow-hidden">
                {post.title}
              </div>
              {/* 게시글 내용 스니펫 */}
              <div className="text-gray-500 text-[1.1em] h-[8vh] overflow-hidden line-clamp-1">
                {post.contentSnippet}
              </div>
              {/* 태그 목록 */}
              <div className="flex space-x-[0.4vw]">
                {post.tags?.map((tag, index) => (
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
                  <div className="ml-1">{post.likeCount}</div>
                </div>
                {/* 댓글 */}
                <div className="flex">
                  <img
                    src={comment_pic}
                    alt="comment"
                    className="w-[20px] h-[18px] mt-[0.5vh]"
                  />
                  <div className="ml-1">{post.commentCount}</div>
                </div>
              </div>
            </div>

            {/* 이미지 또는 날짜/조회수 */}
            <div className="flex flex-col justify-end items-end w-[20vw] px-[0.5vw]">
              {post.representativeImage ? (
                <img
                  src={post.representativeImage}
                  alt={post.title}
                  className="w-[15vw] h-[17vh] my-[0.5vh] mr-[0.5vw] p-[1px] rounded-md object-cover"
                />
              ) : <img
              src={noImage}
              className="w-[15vw] h-[17vh] my-[0.5vh] mr-[0.5vw] p-[1px] rounded-md object-cover"
            />}

              <div className="flex justify-center items-center text-gray-500 mr-[1vw]">
                <div className="w-auto mr-[1vw] text-[1em]">{formattedUpdatedAt}</div>
                <div className="w-auto text-[1em]">조회 {post.viewCount}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

EachPost.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      contentSnippet: PropTypes.string.isRequired,
      representativeImage: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      likeCount: PropTypes.number.isRequired,
      commentCount: PropTypes.number.isRequired,
      viewCount: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
    })
  ).isRequired,
  nickname: PropTypes.string.isRequired,
};

export default EachPost;
