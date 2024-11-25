import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faKey } from "@fortawesome/free-solid-svg-icons";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    authCode: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    phoneNumber: false,
    authCode: false,
  });
  const currentStep = 1; // 현재 본인인증 단계

  const navigate = useNavigate();

  // 취소 버튼 클릭
  const handleCancelClick = () => {
    setIsModalOpen(true); // 모달 열기
  };

  // 취소 버튼 => "취소하기" 클릭 시 동작
  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    }); // 폼 데이터 초기화
    setIsModalOpen(false); // 모달 닫기
    navigate("/login");
  };

  // 취소버튼 => "돌아가기" 클릭 시 동작
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  // 다음 버튼 클릭 시 동작
  const handleNext = () => {
    // 필수 입력 체크
    let isValid = true;
    const newErrors = {
      name: !name,
      phoneNumber: !phoneNumber,
      authCode: !authCode,
    };

    setErrors(newErrors);

    // 폼이 비어있는 항목이 있으면 유효하지 않음
    if (newErrors.name || newErrors.phoneNumber || newErrors.authCode) {
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // 입력 데이터 저장
    setFormData({
      name,
      phoneNumber,
      authCode,
    });

    // "다음" 버튼 클릭 시, 특정 페이지로 이동 (예: 약관동의 페이지)
    navigate("/signup/second"); // 이동할 페이지 경로로 수정
  };

  const handleSendAuthCode = () => {
    if (!phoneNumber) {
      setErrorMessage("전화번호를 입력하세요.");
      return;
    }
  };

  const handleVerifyAuthCode = () => {
    if (!authCode) {
      alert("인증 코드를 입력하세요.");
      return;
    }
    console.log("인증 코드 확인됨:", authCode);
  };

  return (
    <div className="w-full h-auto bg-white py-24">
      <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="w-full flex items-center">
          {[
            { step: 1, label: "본인인증" },
            { step: 2, label: "약관동의" },
            { step: 3, label: "정보입력" },
            { step: 4, label: "가입완료" },
          ].map((item, index) => {
            const isActiveStep = currentStep === item.step;

            return (
              <React.Fragment key={item.step}>
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full border-2 ${
                      isActiveStep
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    <p className="text-xl font-medium">{item.step}</p>
                  </div>
                  {/* Step Label */}
                  <p
                    className={`text-sm mt-2 ${
                      isActiveStep ? "text-blue-600" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
                {/* Connecting Line */}
                {index < 3 && (
                  <div className="flex-grow relative">
                    <div
                      className="absolute top-1/2 w-full border-t-2 border-gray-300"
                      style={{ transform: "translateY(-50%)" }}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto mt-12">
          {/* 이름 입력 */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 pl-10 mb-4"
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* 전화번호 입력 */}
          <div className="relative w-96 flex items-center">
            <input
              type="tel"
              placeholder="전화번호"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-grow border rounded-md p-2 pl-10"
            />
            <FontAwesomeIcon
              icon={faPhone}
              className="absolute left-3 text-gray-400"
            />
            <button
              onClick={handleSendAuthCode}
              className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 w-32"
            >
              인증번호 전송
            </button>
          </div>

          {/* 인증코드 입력 */}
          <div className="relative w-96 flex items-center">
            <input
              type="text"
              placeholder="인증코드"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              className="flex-grow border rounded-md p-2 pl-10"
            />
            <FontAwesomeIcon
              icon={faKey}
              className="absolute left-3 text-gray-400"
            />
            <button
              onClick={handleVerifyAuthCode}
              className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 w-32"
            >
              인증
            </button>
          </div>

          <div className="flex justify-between w-full gap-0.5">
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

        {/* 모달(알림창) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-2">
                회원가입을 취소하시겠습니까?
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                취소하면 입력사항이 저장되지 않습니다.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  돌아가기
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
