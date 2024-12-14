import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import loginState from "../../recoil/atoms/loginState";
import LoginApi from "../../api/blog-services/login/LoginApi";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/images/logo.png";
import kakaologo from "../../assets/images/kakao.webp";
import naverlogo from "../../assets/images/naver.png";
import googlelogo from "../../assets/images/google.png";

const LoginPage = () => {
  const [userState, setUserState] = useRecoilState(loginState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 이메일과 비밀번호 공백 확인 로직
    if (!email.trim() && !password.trim()) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    try {
      // 로그인 API 호출
      const { userId, nickname, profileImageUrl, accessToken } = await LoginApi(
        email,
        password
      );
      // Access Token을 localStorage에 저장
      localStorage.setItem("accessToken", accessToken);

      // Recoil 상태 업데이트
      setUserState({
        isAuthenticated: true,
        userId,
        nickname,
        profileImageUrl,
        accessToken,
      });
      // 상태 확인 로그
      console.log("User State Updated:", {
        isAuthenticated: true,
        userId,
        nickname,
        profileImageUrl,
        accessToken,
      });
      // 홈 화면으로 이동
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {" "}
      {/* 전체 배경*/}
      <img
        src={logo}
        alt="온길 로고"
        className="mb-6 cursor-pointer"
        onClick={() => navigate("/")}
      />{" "}
      {/* 온길로고*/}
      <h1
        className="text-2xl font-bold mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        온길
      </h1>{" "}
      {/* 온길*/}
      <div className="w-80">
        {" "}
        {/* 로그인 창 컴포넌트*/}
        <input // 이메일 입력 폼
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="relative">
          <input // 비밀번호 입력 폼
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button // 토글 아이콘
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <EyeIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
        <button // 비밀번호 찾기 버튼
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-blue-500 hover:underline float-right mb-4"
        >
          비밀번호 찾기
        </button>
        <button // 로그인 버튼
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
        >
          로그인
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
      <div className="flex items-center justify-center my-4">
        {" "}
        {/* -connect with-*/}
        <hr className="w-36 border-gray-300" />
        <span className="px-2 text-gray-500"> OR </span>
        <hr className="w-36 border-gray-300" />
      </div>
      <div className="flex items-center space-x-4">
        <div
          className="w-12 h-12 rounded-full bg-center bg-cover"
          style={{ backgroundImage: `url(${kakaologo})` }}
        ></div>
        <div
          className="w-12 h-12 rounded-full bg-center bg-cover"
          style={{ backgroundImage: `url(${naverlogo})` }}
        ></div>
        <div
          className="w-12 h-12 rounded-full bg-center bg-cover"
          style={{ backgroundImage: `url(${googlelogo})` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-6">
        회원이 아니신가요?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-blue-500 hover:underline"
        >
          회원가입
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
