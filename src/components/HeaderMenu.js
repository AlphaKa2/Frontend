import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeaderMenu = ({ closeMenu, isOpen }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  const handleNavigation = (path) => {
    navigate(path); // 지정된 경로로 이동
    closeMenu(); // 메뉴 닫기
  };

 

  return (
    <div ref={menuRef}>
      {isOpen&& <div className="absolute top-full right-11 mt-[-0.3em] w-[16em] bg-white border border-gray-200 shadow-lg rounded-xl z-[999]">
        {/* 말풍선 꼬리 */}
        <div className="absolute top-[-8px] right-12 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

        {/* 로그인 */}
        <div className="px-7 pt-6 pb-4 mt-2">
          <p className="text-blue-600 font-bold text-[1.2em] text-left cursor-pointer"
          onClick={() => handleNavigation('/login')}>
            로그인/회원가입
          </p>
        </div>

        {/* 경계선 */}
        <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

        {/* 각 서비스 */}
        <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
          <p className="py-3" onClick={() => handleNavigation('/postpage')}>내 블로그</p>
          <p className="py-3" onClick={() => handleNavigation('/create-plan1')}>여행 계획 생성</p>
          <p className="py-3" onClick={() => handleNavigation('/youtube-page')}>유튜버 따라가기</p>
          <p className="py-3" onClick={() => handleNavigation('/my-trip-list')}>내 여행</p>
          <p className="py-3" onClick={() => handleNavigation('/mbti')}>여행 MBTI 검사</p>
        </div>

        {/* 경계선 */}
        <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

        <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
          <p className="py-3" onClick={() => handleNavigation('/profile/edit')} >설정</p>
          <p className="py-3">로그아웃</p>
        </div>
      </div>}
    </div>
  );
};

export default HeaderMenu;