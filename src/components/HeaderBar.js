import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import { useNavigate, useLocation } from "react-router-dom";
import loginState from "../recoil/atoms/loginState";
import logo from "../assets/images/logo.png";
import logoText from "../assets/images/logoText.png";
import header_hamburger from "../assets/images/header_hamburger.png";
import HeaderMenu from "./HeaderMenu";


const HeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => navigate("/");

  // 흰색 배경을 적용할 페이지 경로 목록
  const backgroundPages = [
    "/itinerary/:recommendation_trip_id",
    "/register-itinerary/:travelId",
    "/edit-itinerary/:travelId",
    "/completed-itinerary/:travelId",
    
  ];
  
  // 현재 페이지가 흰색 배경 페이지인지 확인
  const isBackgroundPage = backgroundPages.some((path) => {
    const regex = new RegExp(
      `^${path.replace(/:[^\s/]+/g, "([^/]+)")}$` // :param을 동적 값으로 매칭
    );
    return regex.test(location.pathname);
  });

  const headerStyle = isBackgroundPage
    ? "bg-white" // 흰색 배경 및 그림자
    : "bg-transparent"; // 투명

  return (
    <header className={`fixed w-full top-0 z-30 ${headerStyle}`}>
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


        {/* 로그인 상태에 따른 버튼 */}
        <div className="flex flex-row">
          {user.isAuthenticated ? (
            <>
              <span className="bg-transparent text-blue-600 text-[1.3em] font-semibold py-2 px-4 rounded-full">
                {user.nickname} 님
              </span>
              <button onClick={toggleMenu} className="mt-[-0.5em]">
                <img
                  src={header_hamburger}
                  alt="헤더메뉴"
                  className="logoText w-[3em] h-auto rounded-[1%] ml-[2em] mt-[0.3em]"
                />
              </button>
              {isMenuOpen && (
                <HeaderMenu
                  toggleMenu={toggleMenu}
                  closeMenu={closeMenu}
                  isOpen={isMenuOpen}
                  className="z-30"
                />
              )}
            </>
          ) : (
            <button
              className="bg-transparent text-blue-600 text-[1.3em] font-semibold py-2 px-4 rounded-full"
              onClick={() => navigate("/login")}
            >
              로그인
            </button>
          )}

        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
