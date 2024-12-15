import React from "react";
import logo from "../assets/images/logo.png";
import location from "../assets/images/footer_location.png";
import mail from "../assets/images/footer_mail.png";
import instagram from "../assets/images/footer_instagram.png";
import youtube from "../assets/images/footer_youtube.png";
import x from "../assets/images/footer_x.png";

const footerBar = () => {
  return (
    <footer className="bg-[#eaeaea] text-gray-600 h-[20em] z-10">
      <div className="flex flex-col items-center justify-center w-full h-full gap-[5em]">
        <div className="flex flex-row items-center justify-center gap-[20em] mt-[5em] text-left">
          <div className="leading-6 mb-[1.5em] text-bold text-[1.1em] text-center">
            <p>궁금하신 점이나 불편하신 점은</p>
            <p>언제든 연락바랍니다.</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-[1em]">
            <img
              src={location}
              alt="위치그림"
              className="logoText w-[2em] h-auto mb-[2.5em]"
            />
            <div>
              <p className="text-bold mb-[0.5em] text-[1.2em]">위치</p>
              <p>경기도 성남시 수정구 복정동 495</p>
              <p>461831</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-[1em]">
            <img
              src={mail}
              alt="위치그림"
              className="logoText w-[2.5em] h-auto mb-[2.5em]"
            />
            <div>
              <p className="text-bold mb-[0.5em] text-[1.2em]">
                도움이 필요하신가요?
              </p>
              <p>alphakaCS@gmail.com</p>
              <p>alphaka247@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="w-[100%] border-[0.5px] border-gray-300 mb-[-3em] z-20"></div>

        <div className="flex flex-row gap-[27em] items-center justify-center mr-[-33em] mt-[-1em]">
          <div className="flex flex-row items-center justify-center">
            <img
              src={logo}
              alt="로고"
              className="logo w-[4.5em] h-auto rounded-[1%] mr-[-0.5em]"
            />
            <p>ⓒ 2024. Alphaka - All Rights Reserved.</p>
          </div>
          <div className="flex flex-row gap-[1.5em] items-center justify-center">
            <button>
              <img
                src={instagram}
                alt="로고1"
                className="logo w-[1.7em] h-auto rounded-[1%]"
              />
            </button>
            <button>
              <img
                src={youtube}
                alt="로고2"
                className="logo w-[1.9em] h-auto rounded-[1%]"
              />
            </button>
            <button>
              <img
                src={x}
                alt="로고3"
                className="logo w-[1.5em] h-auto rounded-[1%]"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footerBar;