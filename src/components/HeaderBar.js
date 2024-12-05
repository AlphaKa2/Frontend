import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import loginState from "../recoil/atoms/loginState"; // Recoil login 상태
import logo from "../assets/images/logo.png";
import logoText from "../assets/images/logoText.png";
import header_hamburger from "../assets/images/header_hamburger.png";
import HeaderMenu from "./HeaderMenu";
import { useNavigate } from "react-router-dom";

const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // 메뉴 열기/닫기 상태 토글
  };
  const closeMenu = () => {
    setIsMenuOpen(false); // 메뉴 닫기
  };

  const navigate = useNavigate();
  const handleLogoClick = () => navigate("/");

  // Recoil 로그인 상태 가져오기
  const user = useRecoilValue(loginState);

  return (
    <header className="bg-opacity-{100} border-transparent text-white fixed w-full top-0 z-30">
      <div className="w-full px-[5em] py-2 flex items-center justify-between">
        {/* 로고 */}
        <div className="flex flex-row">
          <button>
            <img
              src={logo}
              alt="로고"
              className="logo w-[4.5em] h-auto rounded-[1%]"
              onClick={handleLogoClick}
            />
          </button>
          <button>
            <img
              src={logoText}
              alt="로고 텍스트"
              className="logoText w-[4.5em] h-auto rounded-[1%] ml-[-1em] mt-[0.2em]"
              onClick={handleLogoClick}
            />
          </button>
        </div>

        {/* 버튼 */}
        <div className="flex flex-row">
          {user.isAuthenticated ? (
            // 로그인된 경우: 닉네임 표시
            <span className="bg-transparent text-blue-600 text-[1.3em] font-semibold py-2 px-4 rounded-full">
              {user.nickname} 님
            </span>
          ) : (
            // 로그인되지 않은 경우: 로그인 버튼 표시
            <button
              className="bg-transparent text-blue-600 text-[1.3em] font-semibold py-2 px-4 rounded-full"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          )}
          <button onClick={toggleMenu} className="mt-[-0.5em]">
            <img
              src={header_hamburger}
              alt="헤더메뉴"
              className="logoText w-[3em] h-auto rounded-[1%] ml-[2em] mt-[0.3em]"
            />
          </button>
          {/* 메뉴 */}
          {isMenuOpen && (
            <HeaderMenu
              toggleMenu={toggleMenu}
              closeMenu={closeMenu}
              isOpen={isMenuOpen}
              className="z-30"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
