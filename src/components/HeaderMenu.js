import { useRef, useEffect } from "react";

const HeaderMenu = ({ toggleMenu, closeMenu, isOpen }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu(); // 클릭이 메뉴 외부일 때 메뉴 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

 

  return (
    <div ref={menuRef}>
      {isOpen&& <div className="absolute top-full right-11 mt-[-0.3em] w-[16em] bg-white border border-gray-200 shadow-lg rounded-xl z-[999]">
        {/* 말풍선 꼬리 */}
        <div className="absolute top-[-8px] right-12 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

        {/* 로그인 */}
        <div className="px-7 pt-6 pb-4 mt-2">
          <p className="text-blue-600 font-bold text-[1.2em] text-left cursor-pointer">
            로그인/회원가입
          </p>
        </div>

        {/* 경계선 */}
        <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

        {/* 각 서비스 */}
        <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
          <p className="py-3">내 블로그</p>
          <p className="py-3">여행 계획 생성</p>
          <p className="py-3">유튜버 따라가기</p>
          <p className="py-3">내 여행</p>
          <p className="py-3">여행 MBTI 검사</p>
        </div>

        {/* 경계선 */}
        <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

        <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
          <p className="py-3">설정</p>
          <p className="py-3">로그아웃</p>
        </div>
      </div>}
    </div>
  );
};

export default HeaderMenu;
