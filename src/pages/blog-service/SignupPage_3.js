import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import loginState from "../../recoil/atoms/loginState";
import { useRecoilState } from "recoil";
import LoginApi from "../../api/blog-services/login/LoginApi";


const SignupCompletePage = () => {
  const location = useLocation();
  const { nickname, email, password } = location.state || { nickname: "" }; // 전달된 닉네임이 없을 경우 기본값
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(loginState);

  const handleGoHome = async () => {
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
      navigate("/"); 
    } catch (error) {
      alert(error.message);
      }
    };


  return (
    <div className="w-full h-auto bg-white py-32">
      <div className="flex flex-col items-center max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="w-full flex items-center">
          {[
            { step: 1, label: "본인인증" },
            { step: 2, label: "정보입력" },
            { step: 3, label: "가입완료" },
          ].map((item, index) => {
            const isActiveStep = index + 1 === 3; // 현재 단계는 3단계
            const isCompletedStep = index + 1 < 3; // 이전 단계는 완료 상태

            return (
              <React.Fragment key={item.step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full border-2 ${
                      isActiveStep
                        ? "border-blue-600 text-blue-600"
                        : isCompletedStep
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    <p className="text-xl font-medium">{item.step}</p>
                  </div>
                  <p
                    className={`text-sm mt-2 ${
                      isActiveStep || isCompletedStep
                        ? "text-blue-600"
                        : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
                {index < 2 && (
                  <div className="flex-grow relative">
                    <div
                      className={`absolute top-1/2 w-full border-t-2 ${
                        isCompletedStep || isActiveStep
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                      style={{ transform: "translateY(-50%)" }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 회원가입 완료 메시지 */}
        <div className="flex flex-col items-center mt-28">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-blue-600 text-6xl"
          />
          <h2 className="text-blue-600 font-bold text-2xl mt-4">회원가입 완료</h2>
          <p className="text-gray-600 text-center mt-2">
            {nickname}님의 회원가입이
            <br />
            성공적으로 완료되었습니다.
          </p>
        </div>

        {/* 홈으로 버튼 */}
        <div className="mt-12">
          <button
            onClick={handleGoHome}
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupCompletePage;
