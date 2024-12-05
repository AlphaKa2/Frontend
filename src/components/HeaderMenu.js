import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import loginState from "../recoil/atoms/loginState"; // 경로 주의!
import axios from "../pages/axios";

const HeaderMenu = ({ closeMenu, isOpen }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const user = useRecoilValue(loginState); // Recoil 상태 가져오기
  const setLoginState = useSetRecoilState(loginState);

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

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 보내기
      const response = await axios.post("/auth-service/auth/logout", null, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`, // 토큰을 Authorization 헤더에 추가
        },
      });
  
      // 로그아웃 성공 시 상태 초기화
      setLoginState({
        isAuthenticated: false,
        userId: null,
        nickname: null,
        profileImageUrl: null,
        accessToken: null,
      });
  
      // 로그아웃 성공 메시지
      alert("로그아웃 되었습니다.");
      
      // 메뉴 닫기
      closeMenu();
      
      // 로그아웃 후 로컬 스토리지에서 accessToken 제거
      localStorage.removeItem("accessToken");
  
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };


  return (
    <div ref={menuRef} className="z-100">
      {isOpen && (
        <div className="absolute top-full right-11 mt-[-0.3em] w-[16em] bg-white border border-gray-200 shadow-lg rounded-xl">
          {/* 말풍선 꼬리 */}
          <div className="absolute top-[-8px] right-12 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

          {/* 로그인 상태에 따라 UI 변경 */}
          {user.isAuthenticated ? (
            <div className="px-7 pt-6 pb-4 mt-2">
              {/* 로그인된 사용자 정보 */}
              <p className="text-blue-600 font-bold text-[1.2em] text-left">
                {user.nickname}님, 안녕하세요!
              </p>
            </div>
          ) : (
            <div className="px-7 pt-6 pb-4 mt-2">
              {/* 로그인 버튼 */}
              <p
                className="text-blue-600 font-bold text-[1.2em] text-left cursor-pointer"
                onClick={() => handleNavigation("/login")}
              >
                로그인
              </p>
            </div>
          )}

          {/* 경계선 */}
          <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

          {/* 각 서비스 */}
          <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
            <p className="py-3" onClick={() => handleNavigation("/posts")}>
              내 블로그
            </p>
            <p className="py-3" onClick={() => handleNavigation("/create-plan1")}>
              여행 계획 생성
            </p>
            <p className="py-3" onClick={() => handleNavigation("/youtube-page")}>
              유튜버 따라가기
            </p>
            <p className="py-3" onClick={() => handleNavigation("/my-trip-list")}>
              내 여행
            </p>
            <p className="py-3" onClick={() => handleNavigation("/mbti-test")}>
              여행 MBTI 검사
            </p>
          </div>

          {/* 경계선 */}
          <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

          {/* 설정 및 로그아웃 */}
          <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
            <p className="py-3">설정</p>
            {user.isAuthenticated ? (
              <p className="py-3" onClick={() => handleLogout()}>
                로그아웃
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
