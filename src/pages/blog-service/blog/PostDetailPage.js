import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import detail_2 from "../../../assets/images/report-card.png";
import detail_3 from "../../../assets/images/heart.png";
import detail_4 from "../../../assets/images/right-arrow.png";
import detail_5 from "../../../assets/images/left-arrow.png";
import detail_6 from "../../../assets/images/mountain.png";
import detail_7 from "../../../assets/images/beach.png";
import detail_8 from "../../../assets/images/snow.png";
import HeaderBar from "../../../components/HeaderBar";
import FooterBar from "../../../components/FooterBar";
import CommentSection from "../../../components/blog/CommentSection";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";





const PostDetailPage = () => {
  const { postId } = useParams(); // URL에서 postId 추출
  const [post, setPost] = useState(null); // 게시글 데이터 상태
  const [comments, setComments] = useState([]);
  const [isLocalLiked, setIsLocalLiked] = useState();
  const [localLikeCount, setLocalLikeCount] = useState(0);
  /* const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [commentLikeCount, setCommentLikeCount] = useState(0); */
  const navigate = useNavigate();

const handlePostReport = () => {
  navigate("/report/post", {state: postId});
}


const NextArrow = (props) => {


  const { onClick } = props;
  return (
    <button
      className="color-grey-600 absolute right-[-45px] top-[45%]"
      onClick={onClick}
    >
      <img src={detail_4} alt="detail_4" className="detail_4 w-8 h-6" />
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="color-grey-600 absolute left-[-40px] top-[45%]"
      onClick={onClick}
    >
      <img src={detail_5} alt="detail_5" className="detail_5 w-8 h-6" />
    </button>
  );
};

  const formattedCreatedAt = post?.createdAt
    ? format(new Date(post.createdAt), "yyyy-MM-dd HH:mm")
    : "작성일 정보 없음";

  const formattedUpdatedAt = post?.updatedAt
    ? format(new Date(post.updatedAt), "yyyy-MM-dd HH:mm")
    : formattedCreatedAt;

  useEffect(() => {
    // API 요청 보내기
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `/blog-service/auth/api/posts/${postId}`
        ); // 예상 API URL
        const postData = response.data.data; // 데이터 가져오기
        setPost(postData); // 응답 데이터 상태에 저장
        console.log(postData.liked);
        setIsLocalLiked(postData.liked);
        setLocalLikeCount(postData.likeCount);
        console.log(localLikeCount);
      } catch (error) {
        console.error("게시글을 가져오는데 실패", error);
      }
    };

    fetchPost();
  }, [postId]);

  // 댓글 데이터를 서버에서 가져오는 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `/blog-service/auth/api/comments/post/${postId}`
      );
      const commentsData = response.data.data;
      setComments(commentsData); // 서버에서 가져온 댓글 데이터
      
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };
  useEffect(() => {
    fetchComments(); // 컴포넌트 마운트 시 댓글 데이터 로드
  }, [postId]);

  const handleLikeClick = async () => {
    try {
      await axios.post(`/blog-service/auth/api/likes/post/${postId}`);
      setIsLocalLiked(!isLocalLiked); 
      console.log(isLocalLiked);
      if (isLocalLiked == false) {
        setLocalLikeCount((localLikeCount) => localLikeCount + 1);// 상태를 토글

      } else {
          setLocalLikeCount((localLikeCount) => localLikeCount - 1);
      }
    } catch (error) {
      console.error("좋아요 요청 중 오류 발생:", error);
    }
  };


  const handleEditPost = () => {
    alert("수정버튼 클릭됨");
    navigate(`/blog-service/auth/api/posts/${postId}/edit`); // 수정 페이지로 리디렉션
  };

  // 로딩 중 처리
  if (!post) {
    return (
      <div className="flex justify-center items-center text-[40px] font-bold mt-[9em]">
        Loading...
      </div>
    );
  }

  const handleDeletePost = async () => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `/blog-service/auth/api/posts/${postId}`
      );
      if (response.status === 200) {
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate("/blog-service/api/posts/blog/:nickname"); // 삭제 후 게시글 목록으로 이동
      } else {
        console.error("게시글 삭제 실패");
        alert("게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("삭제 요청 중 오류 발생:", error);
      alert("서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true, // 화살표가 항상 보이도록 설정
  };

  // HTML 태그를 제거하는 함수
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <>
      <HeaderBar></HeaderBar>
      <div className="justify-center items-center mt-[5em] px-[20em]">
        {/* 게시글 섹션 */}
        <div className="mb-[10em]">
          <p className="text-[2.5em] font-bold text-center mb-[1.2em]">
            {post.title}
          </p>
          <div className="flex justify-between">
            <div className="flex justify-left items-center space-x-1">
              {post.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-[#4B6BFB] text-white px-3 py-0.5 rounded-full"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-end space-x-2">
                <button onClick={handleEditPost} className="text-gray-600">
                  수정
                </button>
                <button onClick={handleDeletePost} className="text-gray-600">
                  삭제
                </button>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <p className="text-gray-600">{formattedUpdatedAt}</p>
                <p className="text-gray-600">|</p>
                <p className="text-gray-600">조회 {post.viewCount}</p>
              </div>
            </div>
          </div>

          <div className="w-[100%] border-t-[3px] border-t-gray-300 border-b-[3px] border-b-gray-300 z-20 mt-[0.7em] py-3 px-1">
            <p className="py-[1em]">{stripHtmlTags(post.content)}</p>
          </div>

          {/* 좋아요 및 신고하기 섹션 */}
          <div className="flex justify-end space-x-2 mt-[2em]">
            <div className="flex space-x-2">
              <button className="bg-[#F30F0F] text-white w-[7em] px-3 py-2 rounded-xl flex justify-center items-center">
                <img
                  src={detail_2}
                  alt="detail_2"
                  className="detail_2 w-5 h-5 mr-1"
                />
                <button onClick={handlePostReport}>신고하기</button>
              </button>
              <button
                onClick={handleLikeClick}
                className={`${
                  isLocalLiked ? "bg-[#4B6BFB]" : "bg-[#4B6BFB]"
                } text-white w-[8em] py-2 rounded-xl flex justify-center items-center space-x-1`}
              >
                <img
                  src={detail_3} // 조건에 따라 이미지 변경 가능
                  alt="detail_3"
                  className="detail_3 w-5 h-5 mr-1"
                />
                <div>좋아요</div>
                <div>{localLikeCount}</div>
              </button>
            </div>
          </div>
        </div>
        <CommentSection
          postId={postId}
          originComments={comments}
          fetchComments={fetchComments}
        />

        {/* 다른 게시글 보기 목록 섹션 */}
        <div className="mt-[10em] mb-[5em]">
          <p className="text-center font-semibold text-[2em]">
            이 블로그의 다른 게시글
          </p>
          <Slider
            {...sliderSettings}
            className="mt-[2em] flex items-center justify-center space-x-2 position-relative"
          >
            <div className="bg-transparent h-[25em] flex flex-col justify-center items-center overflow-hidden px-4">
              <div className="shadow-sm border-[0.1px] py-4">
                <img
                  src={detail_6}
                  alt="detail_6"
                  className="w-[100%] h-[15em]"
                />
                <div className="flex ml-4 space-x-1 mt-[-1em]">
                  <div className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3">
                    #산
                  </div>
                  <div className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3">
                    #언덕
                  </div>
                </div>
                <div className="h-[2em] overflow-hidden font-bold px-4 mt-3">
                  제주도의 숨은 명소 1
                </div>
                <div className="h-[4.5em] overflow-hidden px-4 ">
                  글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
                  글내용입니다. 글내용입니다. 글내용입니다.글내용입니다.
                  글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
                </div>
                <div className="w-[100%] border-[2px] border-[#4B6BFB] mt-3 z-20"></div>
              </div>
            </div>

            <div className="bg-transparent h-[25em] flex flex-col justify-center items-center overflow-hidden px-4">
              <div className="shadow-sm border-[0.1px] py-4">
                <img
                  src={detail_7}
                  alt="detail_7"
                  className="w-[100%] h-[15em]"
                />
                <div className="flex ml-4 space-x-1 mt-[-1em]">
                  <div className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3">
                    #산
                  </div>
                  <div className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3">
                    #언덕
                  </div>
                </div>
                <div className="h-[2em] overflow-hidden font-bold px-4 mt-3">
                  제주도의 숨은 명소 2
                </div>
                <div className="h-[4.5em] overflow-hidden px-4 ">
                  글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
                  글내용입니다. 글내용입니다. 글내용입니다.글내용입니다.
                  글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
                </div>
                <div className="w-[100%] border-[2px] border-[#4B6BFB] mt-3 z-20"></div>
              </div>
            </div>

            <div className="bg-transparent h-[25em] flex flex-col justify-center items-center overflow-hidden px-4">
              <div className="shadow-sm border-[0.1px] py-4">
                <img
                  src={detail_8}
                  alt="detail_8"
                  className="w-[100%] h-[15em]"
                />
                <div className="flex ml-4 space-x-1 mt-[-1em]">
                  <div className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3">
                    #산
                  </div>
                  <div className="text-[#5E7BFF] border-2 border-[#5E7BFF] rounded-full px-3">
                    #언덕
                  </div>
                </div>
                <div className="h-[2em] overflow-hidden font-bold px-4 mt-3">
                  제주도의 숨은 명소 3
                </div>
                <div className="h-[4.5em] overflow-hidden px-4 ">
                  글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
                  글내용입니다. 글내용입니다. 글내용입니다.글내용입니다.
                  글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.
                </div>
                <div className="w-[100%] border-[2px] border-[#4B6BFB] mt-3 z-20"></div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <FooterBar />
    </>
  );
};

export default PostDetailPage;
