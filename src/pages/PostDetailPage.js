import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import detail_1 from "../assets/images/surf.png";
import detail_2 from "../assets/images/report-card.png";
import detail_3 from "../assets/images/heart.png";
import detail_4 from "../assets/images/right-arrow.png";
import detail_5 from "../assets/images/left-arrow.png";
import detail_6 from "../assets/images/mountain.png";
import detail_7 from "../assets/images/beach.png";
import detail_8 from "../assets/images/snow.png";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import Comment from "./Comment";

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

const PostDetailPage = () => {
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

  return (
    <>
      <HeaderBar></HeaderBar>
      <div className="justify-center items-center mt-[5em] px-[20em]">
        {/* 게시글 섹션 */}
        <div>
          <p className="text-[2.5em] font-bold text-center mb-[1.2em]">
            ‘낭만바다’ 만나는 곳 ‘양양’
          </p>

          <div className="flex justify-left items-center space-x-1">
            <button className="bg-[#4B6BFB] text-white px-3 py-0.5 rounded-full">
              서핑
            </button>
            <button className="bg-[#4B6BFB] text-white px-3 py-0.5 rounded-full">
              강원도
            </button>
          </div>

          <div className="w-[100%] border-[2px] border-[#4B6BFB] z-20 mt-[0.7em]"></div>

          <p className="py-[1em]">
            여행 시작 새벽 6시, 양양으로 향하는 첫 기차를 타고 설렘을 가득 안고
            출발했습니다. 산속의 상쾌한 공기는 피곤한 일상에서 벗어나 새로운
            활력을 불어넣어 주는 듯했어요. 도착하자마자 눈앞에 펼쳐진 설악산의
            장엄한 풍경은 마치 한 폭의 그림 같았습니다.
          </p>
          <img
            src={detail_1}
            alt="detail_1"
            className="detail_1 w-[100%] h-[100%] py-[1em]"
          />
          <p className="py-[1em]">
            파란 바다가 드넓은 해변. 여느 해수욕장과는 다른 특별함이 느껴지는
            곳. 양양의 명소인 서피비치. 즐기기 위해 떠난 이들은 한적한 바다와
            모래사장을 만끽하며 여유로운 시간을 보낼 수 있습니다.
          </p>

          <div className="w-[100%] border-[2px] border-[#4B6BFB] mt-[1em] z-20"></div>

          {/* 좋아요 및 신고하기 섹션 */}
          <div className="flex justify-end space-x-2 mt-[2em]">
            <button className="bg-[#F30F0F] text-white w-[7em] px-3 py-2 rounded-xl flex justify-center items-center">
              <img
                src={detail_2}
                alt="detail_2"
                className="detail_2 w-5 h-5 mr-1"
              />
              <span>신고하기</span>
            </button>

            <button className="bg-[#003DA0] text-white w-[7em] px-3 py-2 rounded-xl flex justify-center items-center">
              <img
                src={detail_3}
                alt="detail_3"
                className="detail_3 w-5 h-5 mr-1"
              />
              <span>좋아요</span>
            </button>
          </div>
        </div>
        <Comment/>
        {/* 댓글 작성 섹션 */}
        <div className="mt-[4em] p-[15px] mx-[3em]">
          <div className="flex items-center text-[#888] ml-[1em]">
            <span className="font-[20px] mr-[5px]">👤</span>
            <span className="font-bold mr-[10px]">카카오</span>
          </div>
          <div className="border-[1.4px] border-[#4B6BFB] mt-[0.5em] z-20 mx-[0.2em]"></div>

          <textarea
            className="w-[100%] resize-y h-[20em] p-[1.5em] mt-[1em] border-[2.3px] border-[#4B6BFB] rounded-xl text-[14px] resize-y"
            placeholder="댓글 작성하기"
          />
          <div className="mt-[0.7em] text-right">
            <button className="bg-[#4B6BFB] text-white border-none rounded-xl cursor-pointer px-4 py-2">
              등록하기
            </button>
          </div>
        </div>

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
                <div className="h-[2em] overflow-hidden font-bold px-4 mt-3">제주도의 숨은 명소 1</div>
                <div className="h-[4.5em] overflow-hidden px-4 ">글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.</div>
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
                <div className="h-[2em] overflow-hidden font-bold px-4 mt-3">제주도의 숨은 명소 2</div>
                <div className="h-[4.5em] overflow-hidden px-4 ">글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.</div>
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
                <div className="h-[2em] overflow-hidden font-bold px-4 mt-3">제주도의 숨은 명소 3</div>
                <div className="h-[4.5em] overflow-hidden px-4 ">글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다. 글내용입니다.</div>
                <div className="w-[100%] border-[2px] border-[#4B6BFB] mt-3 z-20"></div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <FooterBar></FooterBar>
    </>
  );
};

export default PostDetailPage;