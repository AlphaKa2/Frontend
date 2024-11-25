import React, { useEffect, useState } from "react";
import ScrollMagic from "scrollmagic";
import wallpaper from "../assets/images/main1_1.png";
import picture1_2 from "../assets/images/main1_2.png";
import video from "../assets/videos/gv70.mp4";
import picture3_1 from "../assets/images/main3_1.png";
import picture3_2 from "../assets/images/main3_2.png";
import picture3_3 from "../assets/images/main3_3.png";
import picture3_4 from "../assets/images/main3_4.png";
import picture4_1 from "../assets/images/main4_1.png";
import picture4_2 from "../assets/images/main4_2.png";
import picture4_3 from "../assets/images/main4_3.png";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";


const MainPage = () => {
  const [showDelayedText, setShowDelayedText] = useState(false);

  const scrollToNextPage = () => {
    window.scrollTo({
      top: window.innerHeight, // 1 페이지 아래로 스크롤
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayedText(true);
    }, 800);

    const controller = new ScrollMagic.Controller();
    const revealElements = document.getElementsByClassName("animation");

    for (const element of revealElements) {
      new ScrollMagic.Scene({
        triggerElement: element,
        triggerHook: 1,
        duration: 0,
        reverse: false,
      })
        .on("start", () => {
          element.classList.add("opacity-100");
        })
        .addTo(controller);
    }

    // Clean-up function
    return () => {
      clearTimeout(timer);
      controller.destroy(); // ScrollMagic controller 해제
    };
  }, []);

  return (
    <div>
      <HeaderBar></HeaderBar>
      {/* Page-1 섹션 */}
      <section
        className="page-1 flex justify-center items-center bg-cover bg-center bg-no-repeat w-screen h-screen"
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        {showDelayedText && (
          <>
            <div className="box-1 z-1 opacity-0 animate-appear whitespace-nowrap mb-[10em] transition-opacity duration-700 ease-in">
              <h2 className="text-black text-left text-[3.3em] font-bold">
                계획은 온길에게
                <br />
                추억은 당신에게
              </h2>
              <br />
              <h4 className="text-[#787878] text-left text-[1.5em] ease-in">
                빠르게 완성하는 여행 계획, 즐기는 데 집중하면 됩니다.
              </h4>
            </div>
            <div className="main_travel ml-[12em] mb-[3em]">
              <img
                src={picture1_2}
                alt="여행계획사진"
                className="picture1_2 w-[35em] h-auto rounded-[1%]"
              />
            </div>
          </>
        )}
        {/* <div className="arrow-container absolute bottom-[20px] left-1/2 transform -translate-x-1/2">
          <div className="arrow w-[30px] h-[30px] border-solid border-0 border-r-[4px] border-b-[4px] border-[#151515] rotate-45 animate-bounce"></div>
        </div> */}
        <div
          className="arrow-container absolute bottom-[40px] left-1/2 transform -translate-x-1/2"
          onClick={scrollToNextPage} // 클릭 시 스크롤 실행
        >
          <div className="arrow w-[30px] h-[30px] border-solid border-0 border-r-[4px] border-b-[4px] border-[#151515] rotate-45 animate-bounce cursor-pointer"></div>
        </div>
      </section>
      {/* Page-2 섹션 */}
      <section className="page-2 h-screen flex justify-center items-center bg-white p-2">
        <div className="box-2-1 mb-[7em] text-center">
          <p className="animation mb-[0.7em] text-[2em] text-[#3758F9] text-center font-bold opacity-0 transition-opacity duration-500 ease-in delay-[0ms]">
            Plan AI
          </p>
          <p className="animation text-[2.6em] text-black text-left font-bold opacity-0 transition-opacity duration-500 ease-in delay-[200ms]">
            복잡한 여행 계획
          </p>
          <p className="animation text-[2.6em] text-black text-left font-bold opacity-0 transition-opacity duration-500 ease-in delay-[200ms]">
            2분만에 완성하세요
          </p>
          <p className="animation mt-[1em] text-[#787878] text-[1.5em] text-left opacity-0 transition-opacity duration-500 ease-in delay-[400ms]">
            여행은 좋지만 복잡함은 싫은 당신을 위하여
          </p>
          <p className="animation mt-[0.1em] text-[#787878] text-[1.5em] text-left opacity-0 transition-opacity duration-500 ease-in delay-[550ms]">
            AI가 여행 날짜, 장소, 인원, 이동수단 등
          </p>
          <p className="animation mt-[0.1em] text-[#787878] text-[1.5em] text-left opacity-0 transition-opacity duration-500 ease-in delay-[700ms]">
            9가지 요소를 고려하여 여행 계획을 생성합니다.
          </p>
          <button className="animation shadow-xl text-lg text-center text-white font-bold rounded bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] mt-[5em] px-6 py-3 opacity-0 transition-opacity hover:bg-black hover:text-white transform hover:-translate-y-1 active:translate-y-0 duration-500 ease-in delay-[900ms]">
            + 계획 생성하기
          </button>
        </div>
        <div className="box-2-2 ml-[7em] mr-[-3em] mb-[3em]">
          <div className="animation opacity-0 transition-opacity duration-500 delay-[300ms]">
            <video
              className="w-[50em] rounded-xl"
              src={video} // 영상 파일 경로를 여기에 추가
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>
      {/* Page-3 섹션 */}
      <section className="page-3 h-screen flex justify-center items-center bg-[#f8f8f8] p-2">
        <div className="box-3 text-center">
          <p className="animation mb-[0.7em] text-[2em] text-[#3758F9] text-center font-bold opacity-0 transition-opacity duration-500 ease-in delay-[0ms]">
            Youtube AI
          </p>
          <p className="animation text-[2.6em] text-black text-center font-bold opacity-0 transition-opacity duration-500 ease-in delay-[200ms]">
            영상 속 여행지, 내 일정으로 바로 생성
          </p>

          <p className="animation mt-[1em] text-[#787878] text-[1.5em] text-center opacity-0 transition-opacity duration-500 ease-in delay-[400ms]">
            원하는 여행지를 검색하고 일정을 짜는 과정없이, 유튜브 링크를
            삽입하면
          </p>
          <p className="animation mt-[0.1em] ml-[2.2em] text-[#787878] text-[1.5em] text-center opacity-0 transition-opacity duration-500 ease-in delay-[600ms]">
            AI가 유튜버의 여행 코스를 그대로 추천하여 특별한 여정을 시작할 수
            있습니다.
          </p>
          <div className="box-3-1 mt-[3em] flex flex-col items-center gap-[2.5em]">
            <div className="animation opacity-0 transition-opacity duration-500 ease-in delay-[700ms] flex gap-[2.5em]">
              <img
                src={picture3_1}
                alt="유튜브검색"
                className="picture3_1 w-[8em] rounded-lg"
              />
              <img
                src={picture3_2}
                alt="유튜브검색"
                className="picture3_2 w-[8em] rounded-lg"
              />
            </div>
            <div className="animation opacity-0 transition-opacity duration-500 ease-in delay-[700ms] flex gap-[2.5em]">
              <img
                src={picture3_3}
                alt="유튜브검색"
                className="picture3_3 w-[8em] rounded-lg"
              />
              <img
                src={picture3_4}
                alt="유튜브검색"
                className="picture3_4 w-[8em] rounded-lg"
              />
            </div>
            <button
              className="animation shadow-xl text-lg text-center text-white font-bold rounded bg-gradient-to-r from-[#FF0000] to-[#990000] mt-[1.5em] px-6 py-3 
            opacity-0 transition-opacity hover:bg-black hover:text-white transform hover:-translate-y-1 active:translate-y-0 duration-500 ease-in delay-[400ms]"
            >
              + 일정 생성하기
            </button>
          </div>
        </div>
      </section>

      {/* page-4 섹션*/}
      <section className="page-4 h-screen flex justify-center items-center bg-white p-2">
        <div className="box-4 text-center">
          <p className="animation mb-[0.7em] text-[2em] text-[#3758F9] text-center  font-bold opacity-0 transition-opacity duration-500 ease-in delay-[0ms]">
            Blogs
          </p>
          <p className="animation text-[2.6em] text-black text-center font-bold opacity-0 transition-opacity duration-500 ease-in delay-[200ms]">
            생생한 여행후기를 만나보세요
          </p>
          <p className="animation mt-[1em] text-[#787878] text-[1.5em] text-center opacity-0 transition-opacity duration-500 ease-in delay-[400ms]">
            다양한 유저들의 여행 포스트를 둘러보고 완벽한 여행 계획을 세워보세요
          </p>
          <div className="box-4-1 mt-[7em] flex flex-row items-start gap-[2em]">
            <div className="animation opacity-0 transition-opacity duration-500 delay-[700ms] flex flex-col items-start">
              <img
                src={picture4_1}
                alt="블로그 사진1"
                className="picture4_1 w-[28em] rounded-lg"
              />
              <div className="flex flex-row mt-[-1em] mb-[0.5em]">
                <div className="text-[#5E7BFF] ml-[1.5em] border-2 border-[#5E7BFF] rounded-full pr-3 pl-3">
                  #산
                </div>
                <div className="text-[#5E7BFF] ml-[0.3em] border-2 border-[#5E7BFF] rounded-full pr-3 pl-3">
                  #언덕
                </div>
              </div>
              <p className="text-black ml-[1.1em] text-[1.5em]">Mountain</p>
            </div>
            <div className="animation opacity-0 transition-opacity duration-500 delay-[700ms] flex flex-col items-start">
              <img
                src={picture4_2}
                alt="블로그 사진2"
                className="picture4_2 w-[28em] rounded-lg"
              />
              <div className="flex flex-row mt-[-1em] mb-[0.5em]">
                <div className="text-[#5E7BFF] ml-[1.5em] border-2 border-[#5E7BFF] rounded-full pr-3 pl-3">
                  #바다
                </div>
                <div className="text-[#5E7BFF] ml-[0.3em] border-2 border-[#5E7BFF] rounded-full pr-3 pl-3">
                  #일몰
                </div>
              </div>
              <p className="text-black ml-[1.1em] text-[1.5em]">See Beach</p>
            </div>

            <div className="animation opacity-0 transition-opacity duration-500 delay-[700ms] flex flex-col items-start">
              <img
                src={picture4_3}
                alt="블로그 사진3"
                className="picture4_3 w-[28em] rounded-lg"
              />
              <div className="flex flex-row mt-[-1em] mb-[0.5em]">
                <div className="text-[#5E7BFF] ml-[1.5em] border-2 border-[#5E7BFF] rounded-full pr-3 pl-3">
                  #바다
                </div>
                <div className="text-[#5E7BFF] ml-[0.3em] border-2 border-[#5E7BFF] rounded-full pr-3 pl-3">
                  #일몰
                </div>
              </div>
              <p className="text-black ml-[1.1em] text-[1.5em]">Ice land</p>
            </div>
          </div>
          <button className="animation mt-[4em] shadow-xl text-lg text-center text-white font-bold rounded bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] px-6 py-3 opacity-0 transition-opacity hover:bg-black hover:text-white transform hover:-translate-y-1 active:translate-y-0 duration-500 ease-in delay-[400ms]">
            게시글 보러가기
          </button>
        </div>
      </section>

      <FooterBar></FooterBar>
    </div>
  );
};

export default MainPage;
