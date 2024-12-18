import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import loginState from "../recoil/atoms/loginState";
import logoutApi from "../api/blog-services/login/LogoutApi.js";

const HeaderMenu = ({ closeMenu, isOpen }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const user = useRecoilValue(loginState);
  const setLoginState = useSetRecoilState(loginState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {

        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = async () => {
    try {

      // 로그아웃 API 호출
      await logoutApi();

      // 상태 초기화 및 리디렉션
      setLoginState({
        isAuthenticated: false,
        userId: null,
        nickname: null,
        profileImageUrl: null,
        accessToken: null,
      });
localStorage.removeItem("accessToken");
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);

      // 상태 초기화
      setLoginState({
        isAuthenticated: false,
        userId: null,
        nickname: null,
        profileImageUrl: null,
        accessToken: null,
      });
      localStorage.removeItem("accessToken");

      alert("로그아웃에 실패했지만 메인 페이지로 이동합니다.");
      navigate("/");
    }
  };

  return (


    <div
      ref={menuRef}
      className={`fixed top-0 right-0 mt-16 w-[16em] bg-white border border-gray-200 shadow-lg rounded-xl z-[9999]`}
    >
      <div className="absolute top-[-8px] right-12 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

      {user.isAuthenticated ? (
        <div className="px-7 pt-6 pb-4 mt-2">
          <p className="text-blue-600 font-bold text-[1.2em] text-left">
            {user.nickname}님, 안녕하세요!
          </p>
        </div>
      ) : (
        <div className="px-7 pt-6 pb-4 mt-2">
          <p
            className="text-blue-600 font-bold text-[1.2em] text-left cursor-pointer"
            onClick={() => handleNavigation("/login")}
          >
            로그인
          </p>
        </div>
      )}

      <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

      <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
        <p
          className="py-3"
          onClick={() =>
            handleNavigation(`/blog-service/api/posts/blog/${user.nickname}`)
          }
        >
          내 블로그
        </p>
        <p
          className="py-3"
          onClick={() => handleNavigation("/create-plan1")}
        >
          여행 계획 생성
        </p>
        <p
          className="py-3"
          onClick={() => handleNavigation("/youtube-page")}
        >
          유튜버 따라가기
        </p>
        <p
          className="py-3"
          onClick={() => handleNavigation("/my-trip-list")}
        >
          내 여행
        </p>
        <p className="py-3" onClick={() => handleNavigation("/mbti/test")}>
          여행 MBTI 검사
        </p>
        <p
          className="py-3"
          onClick={() => handleNavigation("/invitation-list")}
        >
          초대 목록
        </p>
      </div>

      <div className="w-[80%] border-[0.5px] border-gray-300 z-20 mx-auto"></div>

      <div className="text-gray-600 font-bold text-[1em] px-7 py-3 cursor-pointer">
        <p
          className="py-3"
          onClick={() => handleNavigation("/profile/edit")}
        >
          설정
        </p>
        {user.isAuthenticated ? (
          <p className="py-3" onClick={handleLogout}>
            로그아웃
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderMenu;
