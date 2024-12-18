import React from "react";
import { format } from "date-fns"; // date-fns 라이브러리 사용
import like_pic from "../../assets/images/like.png";
import comment_pic from "../../assets/images/comment.png";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/images/noImage.png";

const AtomicPost = ({
  /* postId, // 고유 ID
  title, // 게시글 제목
  nickname,
  image, // 대표 이미지 URL
  tags, // 태그 배열
  likeCount, // 좋아요 수
  commentCount, // 댓글 수
  viewCount, // 조회수
  createdAt, // 작성 시간
  updatedAt, // 수정 시간 (optional) */
  posts
}) => {
  const navigate = useNavigate();

  // 상세 페이지 이동 함수
  const visitDetailPage = (postId) => {
    navigate(`/blog-service/api/posts/${postId}`, { state: { posts} });
  };

  return(
    <div className="grid grid-cols-4 gap-[1vw] w-full">
    {posts.map((post) => {
      // 날짜 포맷 처리
      const formattedCreatedAt = format(new Date(post.createdAt), "yyyy-MM-dd HH:mm");
      const formattedUpdatedAt = post.updatedAt
        ? format(new Date(post.updatedAt), "yyyy-MM-dd HH:mm")
        : formattedCreatedAt;

  return (
    
    <div
    key={post.postId}
    className="w-[23vw] h-[32vh] rounded-md border-gray-300 border-[0.2px] shadow-lg box-border px-[0.5vw] py-[1vh] mt-[1vh] cursor-pointer flex flex-row justify-between z-10
    hover:scale-105 transition-transform duration-300 ease-in-out"
    onClick={() => visitDetailPage(post.postId)}
  >
  
      {/* 게시글 내용 */}
      <div className="px-[0.5vw] space-y-[0.3vh] flex flex-col justify-end">
        {/* 이미지 또는 날짜/조회수 */}

        {post.representativeImage ? (
          <img
            src={post.representativeImage}
            alt={post.title}
            className="w-[21vw] h-[17vh] my-[0.5vh] mr-[0.5vw] p-[1px] rounded-md object-cover"
          />
        ) : <img src={noImage} className="w-[21vw] h-[17vh] my-[0.5vh] mr-[0.5vw] p-[1px] rounded-md object-cover"/>}

        <div className="flex flex-row justify-between items-center space-x-[1vh]">
        {/* 게시글 제목 */}
        <div className="font-semibold text-black w-[10vw] h-[5vh] text-[18px] overflow-hidden whitespace-normal break-all ">
          {post.title}
        </div>
        <div className="flex justify-end items-center font-semibold text-gray-500 text-right w-[10vw] h-[5vh] text-[20px] overflow-hidden whitespace-normal break-all">
            {post.nickname}
        </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            {/* 태그목록 */}
            <div className="flex space-x-[0.3vw] mt-[0.3vh] w-[13vw] h-[3vh] overflow-hidden">
              {post.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="text-[#5E7BFF] border-2 border-[#5E7BFF] h-[3vh] rounded-full px-[0.3vw] py-[0.1vh] text-[0.9em] overflow-hidden"
                >
                  {tag}
                </div>
              ))}
            </div>
            {/* 좋아요, 댓글 */}
            <div className="flex space-x-[1vw] mt-[0.7vh]">
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

          <div className="flex flex-col justify-start items-end text-gray-500 mt-[1vh]">
            <div className="mr-[0.1vw] text-[1em]">
              {formattedUpdatedAt}
            </div>
            <div className="text-[1em]">조회 {post.viewCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
    })}
</div>
  )
};


export default AtomicPost;
