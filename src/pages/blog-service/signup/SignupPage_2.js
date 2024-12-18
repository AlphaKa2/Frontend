import React, { useState } from "react";
import CheckEmailApi from "../../../api/blog-services/common/CheckEmailApi";
import CheckNicknameApi from "../../../api/blog-services/common/CheckNicknameApi";
import SignupApi from "../../../api/blog-services/signup/SignupApi";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  faEnvelope,
  faUser,
  faLock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const SignupSecondPage = () => {
  const location = useLocation();
  const { name, phoneNumber, smsConfirmation } = location.state || {}; // 전달된 state가 없을 경우 대비
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birth, setBirthdate] = useState(""); // 문자열로 사용
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false,
    birth: false,
    gender: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const navigate = useNavigate();

  const handleEmailVerify = async () => {
    const newErrors = {
      email: !email
    };

    setErrors( (prev) => ({
      ...prev,
      ...newErrors,
    }));
    
    if (newErrors.email) {
      return;
    }

    try {
      const status = await CheckEmailApi(email);
      if (status == 200) {
        alert("사용할 수 있는 이메일입니다.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNicknameVerify = async () => {
    const newErrors = {
      email: !email,
      nickname: !nickname
    };

    setErrors( (prev) => ({
      ...prev,
      ...newErrors,
    }));
    
    if (newErrors.email || newErrors.nickname) {
      return;
    }
    try {
      const response = await CheckNicknameApi(nickname);
      if (response.status === 200) {
        alert("사용할 수 있는 닉네임입니다.");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleNext = async () => {
    const newErrors = {
      email: !email.trim(),
      nickname: !nickname.trim(),
      password: !password.trim(),
      confirmPassword:
        password !== confirmPassword || !confirmPassword.trim(),
      birth: !birth.trim(),
      gender: !gender.trim(),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      console.log(email, name, phoneNumber, birth, gender, nickname, password, smsConfirmation);
      const response = await SignupApi(
        email,
        name,
        phoneNumber,
        birth,
        gender,
        nickname,
        password,
        smsConfirmation,
      );
      if (response.status === 201)
        
        navigate("/signup/third", { state: { nickname, email, password} });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full h-auto bg-white py-32 relative">
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg">
            <p className="text-gray-800 font-medium text-lg mb-4">
              정말 취소하시겠습니까?
            </p>
            <div className="flex mt-6 justify-evenly">
              <button
                onClick={handleCloseModal}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
              >
                돌아가기
              </button>
              <button
                onClick={handleConfirmCancel}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="w-full flex items-center">
          {[
            { step: 1, label: "본인인증" },
            { step: 2, label: "정보입력" },
            { step: 3, label: "가입완료" },
          ].map((item, index) => {
            const isActiveStep = index + 1 === 2;
            const isCompletedStep = index + 1 < 2;

            return (
              <React.Fragment key={item.step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full border-2 ${
                      isActiveStep || isCompletedStep
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
                        isCompletedStep
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

        {/* Form Fields */}
        <div className="flex flex-col items-center mt-28">
          {/* 이메일 입력란 */}
          <div className="relative w-96 mb-6">
            <div className="flex">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, email: false }));
                  }
                }}
                className="flex-grow border rounded-md p-3 pl-10"
              />
              <button
                className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleEmailVerify}
              >
                중복 확인
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                * 필수 항목을 입력해주세요.
              </p>
            )}
          </div>

          {/* 닉네임 입력란 */}
          <div className="relative w-96 mb-6">
            <div className="flex">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-3.5 text-gray-400"
              />
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, nickname: false }));
                  }
                }}
                className="flex-grow border rounded-md p-3 pl-10"
              />
              <button
                className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleNicknameVerify}
              >
                중복 확인
              </button>
            </div>
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-2">
                * 필수 항목을 입력해주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 입력란 */}
          <div className="relative w-96 mb-6">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-3.5 text-gray-400"
            />
            <input
              type={showPassword? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, password: false }));
                }
              }}
              className="w-full border rounded-md p-3 pl-10"
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                * 필수 항목을 입력해주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 확인 입력란 */}
          <div className="relative w-96 mb-6">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-3.5 text-gray-400"
            />
            <input
              type={showPassword? "text" : "password"}
              placeholder="비밀번호 확인"
              value={confirmPassword}
             
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (
                  e.target.value.trim() &&
                  e.target.value === password
                ) {
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: false,
                  }));
                }
              }}
              className="w-full border rounded-md p-3 pl-10"
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                * 필수 항목을 입력해주세요.
              </p>
            )}
          </div>

          {/* 생년월일 입력란 */}
          <div className="relative w-96 mb-6">
            <FontAwesomeIcon
              icon={faCalendar}
              className="absolute left-3 top-3.5 text-gray-400 z-10"
            />
            <input
              type="text"
              placeholder="생년월일 (yyyy-mm-dd)"
              value={birth}
              onChange={(e) => {
                setBirthdate(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, birth: false }));
                }
              }}
              className="w-full border rounded-md p-3 pl-10"
            />
            {errors.birth && (
              <p className="text-red-500 text-sm mt-2">
                * 필수 항목을 입력해주세요.
              </p>
            )}
          </div>

          {/* 성별 선택 */}
          <div className="relative w-96 mb-6">
            <p className="mb-2 text-gray-700 font-medium">성별</p>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setGender("MALE");
                  setErrors((prev) => ({ ...prev, gender: false }));
                }}
                className={`w-1/2 border p-3 rounded-l-md ${
                  gender === "MALE"
                    ? "bg-blue-500 text-white"
                    : "bg-white-200"
                }`}
              >
                남
              </button>
              <button
                onClick={() => {
                  setGender("FEMALE");
                  setErrors((prev) => ({ ...prev, gender: false }));
                }}
                className={`w-1/2 border p-3 rounded-r-md ${
                  gender === "FEMALE"
                    ? "bg-blue-500 text-white"
                    : "bg-white-200"
                }`}
              >
                여
              </button>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-2">
                * 성별을 선택해주세요.
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-96 flex justify-evenly mt-16">
          <button
            onClick={handleCancelClick}
            className="bg-gray-200 text-blue-500 hover:bg-gray-300 w-1/3 rounded-md py-2 px-4"
          >
            취소
          </button>
          <button
            onClick={handleNext}
            className="w-1/3 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupSecondPage;
