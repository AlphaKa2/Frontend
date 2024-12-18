import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import VerifyAuthCodeApi from '../../../api/blog-services/common/VerifyAuthCodeApi';
import RequestAuthCodeApi from '../../../api/blog-services/common/RequestAuthCodeApi';
import ResetPasswordApi from '../../../api/blog-services/common/ResetPasswordApi';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import {
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [smsConfirmation, setSmsConfirmation] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [errors, setErrors] = useState({
    email: false,
    phoneNumber: false,
    authCode: false,
    newPassword: false,
    confirmPassword: false,
  });


  const navigate = useNavigate();

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSendAuthCode = async () => {
    const newErrors = {
      phoneNumber: !phoneNumber.trim(),
    };

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    if (newErrors.phoneNumber) {
      return;
    }
    try {
      const response = await RequestAuthCodeApi(phoneNumber);

      if (response.status === 200) {
        alert("인증 번호를 전송했습니다.");
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerifyAuthCode = async () => {
    const newErrors = {
      phoneNumber: !phoneNumber.trim(),
      authCode: !authCode.trim(),
    };

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    if (newErrors.phoneNumber || newErrors.authCode) {
      return;
    }

    try {
      const response = await VerifyAuthCodeApi(phoneNumber, authCode);
      console.log(response);
      if (response.status === 202) {
        setSmsConfirmation(response.data.smsConfirmation);
        alert("인증이 완료되었습니다.");
        return;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    // 공백검사
    const newErrors = {
      email: !email.trim(),
      phoneNumber: !phoneNumber.trim(),
      authCode: !authCode.trim(),
      newPassword: !newPassword.trim(),
      confirmPassword: !confirmPassword.trim(),
    };
    setErrors(newErrors);
    // 필수 항목 확인
    if (newErrors.email || newErrors.phoneNumber || newErrors.authCode || newErrors.newPassword || newErrors.confirmPassword) {
      return;
    }
    try {
      const response = await ResetPasswordApi(email, smsConfirmation, newPassword);
      if(response.status == 202) {
        alert("비밀번호 초기화가 완료되었습니다.");
        navigate("/");
      } 
    } catch (error) {
      console.error(error);
      alert(error.messasge);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white-50">

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

      <div className="mt-44 max-w-md w-full px-6">
        <h2 className="text-2xl font-semibold text-center">비밀번호 찾기</h2>
        <p className="text-center text-sm text-blue-500 mt-2">
          가입시 입력한 전화번호를 통해 인증 후 새로운 비밀번호를 설정해주세요.
        </p>

         {/* 이메일 입력란 */}
         <div className="mt-24">
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                className="w-full border rounded-md pl-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                * 필수 항목을 입력해주세요.
              </p>
            )}
          </div>
{/* 전화번호 입력 */}
<div className="mt-4">
  <div className="flex items-center space-x-2">
    <div className="relative flex-grow">
      <FontAwesomeIcon
        icon={faPhone}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="전화번호"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          if (e.target.value.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: false }));
          }
        }}
        className={`w-full border rounded-md pl-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
    <button
      onClick={handleSendAuthCode}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-32"
    >
      인증번호 전송
    </button>
  </div>
  {errors.phoneNumber && (
    <p className="text-red-500 text-sm mt-2">* 필수항목을 입력해주세요</p>
  )}
</div>

{/* 인증 코드 입력 */}
<div className="mt-4">
  <div className="flex items-center space-x-2">
    <div className="relative flex-grow">
      <FontAwesomeIcon
        icon={faLock}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="인증 코드"
        value={authCode}
        onChange={(e) => {
          setAuthCode(e.target.value);
          if (e.target.value.trim()) {
            setErrors((prevErrors) => ({ ...prevErrors, authCode: false }));
          }
        }}
        className={`w-full border rounded-md pl-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
    <button
      onClick={handleVerifyAuthCode}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-32"
    >
      인증
    </button>
  </div>
  {errors.authCode && (
    <p className="text-red-500 text-sm mt-2">* 필수항목을 입력해주세요</p>
  )}
</div>

<hr className="my-8 border-gray-300" />

{/* 새 비밀번호 입력 */}
<div className="mt-4">
  <div className="relative">
    <FontAwesomeIcon
      icon={faLock}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type={showPassword ? "text" : "password"}
      placeholder="새 비밀번호"
      value={newPassword}
      onChange={(e) => {
        setNewPassword(e.target.value);
        if (e.target.value.trim()) {
          setErrors((prevErrors) => ({ ...prevErrors, newPassword: false }));
        }
      }}
      className="w-full border rounded-md pl-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute right-3 top-1/2 transform -translate-y-1/2"
    >
      {showPassword ? (
        <EyeSlashIcon className="w-4 h-4 text-gray-500" />
      ) : (
        <EyeIcon className="w-4 h-4 text-gray-500" />
      )}
    </button>
  </div>
  {errors.newPassword && (
    <p className="text-red-500 text-sm mt-2">* 필수항목을 입력해주세요</p>
  )}
</div>

{/* 새 비밀번호 확인 */}
<div className="mt-4">
  <div className="relative">
    <FontAwesomeIcon
      icon={faLock}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type={showPassword ? "text" : "password"}
      placeholder="새 비밀번호 확인"
      value={confirmPassword}
      onChange={(e) => {
        setConfirmPassword(e.target.value);
        if (e.target.value.trim()) {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: false }));
        }
      }}
      className="w-full border rounded-md pl-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute right-3 top-1/2 transform -translate-y-1/2"
    >
      {showPassword ? (
        <EyeSlashIcon className="w-4 h-4 text-gray-500" />
      ) : (
        <EyeIcon className="w-4 h-4 text-gray-500" />
      )}
    </button>
  </div>
  {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-2">* 필수항목을 입력해주세요</p>
  )}
</div>


        {/* 버튼 그룹 */}
        <div className="flex justify-evenly mt-8">
          <button
            onClick={handleCancelClick}
            className="bg-gray-200 text-blue-500 py-2 px-6 rounded-md hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleResetPassword}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            비밀번호 재설정
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
