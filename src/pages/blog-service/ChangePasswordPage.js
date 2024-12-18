import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import UpdatePasswordApi from "../../api/blog-services/common/UpdatePasswordApi";
import loginState from "../../recoil/atoms/loginState"; 
import { useRecoilState } from "recoil";

const PasswordChangePage = () => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [userData, setUserId] = useRecoilState(loginState);
  const [errors, setErrors] = useState({
    previousPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const navigate = useNavigate();
  const userId = userData.userId;

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setIsModalOpen(false);
    navigate("/profile/edit");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleNext = async () => {
    const newErrors = {
      previousPassword: !previousPassword.trim(),
      newPassword: !newPassword.trim(),
      confirmNewPassword: !confirmNewPassword.trim(),
    };
    setErrors(newErrors);
    // 필수 항목 확인
    if (newErrors.previousPassword || newErrors.newPassword || newErrors.confirmNewPassword) {
      return;
    }

    try {
    const response = await UpdatePasswordApi(userId, previousPassword, newPassword);

    if(response.status == 200) {
      alert("비밀번호 변경이 완료되었습니다.");
    }
    } catch (error) {
      alert(error);
    }

  };



  return (

    <div className="flex flex-col items-center w-full h-screen bg-gray-50">
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
        <h2 className="text-2xl font-semibold text-center">비밀번호 변경</h2>
        <p className="text-center text-sm text-blue-500 mt-2">
          현재 비밀번호를 입력한 후 새로운 비밀번호를 변경해주세요.
        </p>

     {/* 현재 비밀번호 */}
<div className="mt-24">
  <div className="relative">
    <FontAwesomeIcon
      icon={faLock}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type={showPassword ? "text" : "password"}
      placeholder="현재 비밀번호"
      value={previousPassword}
      onChange={(e) => {
        setPreviousPassword(e.target.value);
        if (e.target.value.trim()) {
          setErrors((prevErrors) => ({ ...prevErrors, previousPassword: false }));
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
        <EyeSlashIcon className="w-5 h-5 text-gray-400" />
      ) : (
        <EyeIcon className="w-5 h-5 text-gray-400" />
      )}
    </button>
  </div>
  {errors.previousPassword && (
    <p className="text-red-500 text-sm mt-2">* 필수 항목을 입력해주세요.</p>
  )}
</div>
{/* 구분선 */}
<hr className="my-8 border-gray-300" />

{/* 새 비밀번호 */}
<div className="mt-6">
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
        <EyeSlashIcon className="w-5 h-5 text-gray-400" />
      ) : (
        <EyeIcon className="w-5 h-5 text-gray-400" />
      )}
    </button>
  </div>
  {errors.newPassword && (
    <p className="text-red-500 text-sm mt-2">* 필수 항목을 입력해주세요.</p>
  )}
</div>

{/* 새 비밀번호 확인 */}
<div className="mt-6">
  <div className="relative">
    <FontAwesomeIcon
      icon={faLock}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type={showPassword ? "text" : "password"}
      placeholder="새 비밀번호 확인"
      value={confirmNewPassword}
      onChange={(e) => {
        setConfirmNewPassword(e.target.value);
        if (e.target.value.trim()) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmNewPassword: false,
          }));
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
        <EyeSlashIcon className="w-5 h-5 text-gray-400" />
      ) : (
        <EyeIcon className="w-5 h-5 text-gray-400" />
      )}
    </button>
  </div>
  {errors.confirmNewPassword && (
    <p className="text-red-500 text-sm mt-2">* 필수 항목을 입력해주세요.</p>
  )}
</div>

        {/* 버튼 그룹 */}
        <div className="flex justify-evenly mt-8">
          <button
            onClick={handleCancelClick}
            className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangePage;
