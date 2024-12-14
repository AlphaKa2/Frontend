import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faKey } from "@fortawesome/free-solid-svg-icons";
import RequestAuthCodeApi from "../../../api/blog-services/common/RequestAuthCodeApi";
import VerifyAuthCodeApi from "../../../api/blog-services/common/VerifyAuthCodeApi";

const SignupPage = () => {
  const [smsConfirmation, setSmsConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [errors, setErrors] = useState({
    name: false,
    phoneNumber: false,
    authCode: false,
    agreements: false, // 약관 동의 에러 추가
  });

  useEffect(() => {
    if (smsConfirmation) {
      console.log("Updated smsConfirmation:", smsConfirmation);
    }
  }, [smsConfirmation]);
  

  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    location: false,
    marketing: false,
  });

  const navigate = useNavigate();

  // 전체 동의 및 개별 동의 상태 업데이트
  const handleAgreementChange = (field) => {
    setAgreements((prev) => {
      const updated = { ...prev, [field]: !prev[field] };

      // 전체 동의 체크 처리
      if (field === "all") {
        const allChecked = !prev.all;
        return {
          all: allChecked,
          age: allChecked,
          terms: allChecked,
          privacy: allChecked,
          location: allChecked,
          marketing: allChecked,
        };
      }

      // 전체 동의 상태 자동 업데이트
      const allChecked = ["age", "terms", "privacy", "location", "marketing"].every(
        (key) => key === field ? !prev[key] : updated[key]
      );

      return { ...updated, all: allChecked };
    });
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    const newErrors = {
      name: !name.trim(),
      phoneNumber: !phoneNumber.trim(),
      authCode: !authCode.trim(),
    };

    setErrors(newErrors);

    // 필수 항목 확인
    if (newErrors.name || newErrors.phoneNumber || newErrors.authCode) {
      return;
    }

    // 필수 약관 동의 확인
    if (!agreements.age || !agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    navigate("/signup/second", {
      state: { name, phoneNumber, smsConfirmation }});
  };

  const handleSendAuthCode = async () => {
    // 이름과 전화번호가 공백인지 확인
    const newErrors = {
      name: !name.trim(),
      phoneNumber: !phoneNumber.trim(),
    };

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    // 이름이나 전화번호가 공백이면 처리 중단
    if (newErrors.name || newErrors.phoneNumber) {
      return;
    }

    try {
      const response = await RequestAuthCodeApi(phoneNumber);
      if (response.status === 200) {
        alert("인증 번호를 전송했습니다.");
        return;
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleVerifyAuthCode = async () => {
    // 이름, 전화번호, 인증코드가 공백인지 확인
    const newErrors = {
      name: !name.trim(),
      phoneNumber: !phoneNumber.trim(),
      authCode: !authCode.trim(),
    };

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));

    // 하나라도 공백이면 처리 중단
    if (newErrors.name || newErrors.phoneNumber || newErrors.authCode) {
      return;
    }

    try {
      const response = await VerifyAuthCodeApi(phoneNumber, authCode);
      setSmsConfirmation(response.data.smsConfirmation);
      if (response.status === 202) {
        alert("인증이 완료되었습니다.");
        return;
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-full h-auto bg-white py-32">
      <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto">
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
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full flex items-center">
          {[
            { step: 1, label: "본인인증" },
            { step: 2, label: "정보입력" },
            { step: 3, label: "가입완료" },
          ].map((item, index) => {
            const isActiveStep = index + 1 === 1;

            return (
              <React.Fragment key={item.step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full border-2 ${
                      isActiveStep
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    <p className="text-xl font-medium">{item.step}</p>
                  </div>
                  <p
                    className={`text-sm mt-2 ${
                      isActiveStep ? "text-blue-600" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
                {index < 2 && (
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

        {/* 나머지 UI */}
        <div className="flex flex-col items-center max-w-4xl mx-auto mt-12">
          {/* 이름 입력 */}
          <div className="relative w-96 mt-28">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) {
                  setErrors((prev) => ({ ...prev, name: false }));
                }
              }}
              className="w-full border rounded-md p-2 pl-10"
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">* 필수항목을 입력해주세요</p>
            )}
          </div>

          {/* 전화번호 입력 */}
          <div className="relative w-96 mt-4">
            <div className="flex items-center">
              <input
                type="tel"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, phoneNumber: false }));
                  }
                }}
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
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-2">* 필수항목을 입력해주세요</p>
            )}
          </div>

          {/* 인증코드 입력 */}
          <div className="relative w-96 mt-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="인증코드"
                value={authCode}
                onChange={(e) => {
                  setAuthCode(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, authCode: false }));
                  }
                }}
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
            {errors.authCode && (
              <p className="text-red-500 text-sm mt-2">* 필수항목을 입력해주세요</p>
            )}
          </div>

          {/* 약관 동의 UI */}
          <div className="w-96 mt-28">
            <div className="flex items-center justify-between border-b pb-2 mb-1">
              <label className="text-lg font-medium">전체 동의합니다.</label>
              <input
                type="checkbox"
                checked={agreements.all}
                onChange={() => handleAgreementChange("all")}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">
                만 14세 이상입니다. <span className="text-red-500">(필수)</span>
              </label>
              <input
                type="checkbox"
                checked={agreements.age}
                onChange={() => handleAgreementChange("age")}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">
                <a
                  href="/terms/service"
                  className="underline text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  서비스 이용약관 <span className="text-red-500">(필수)</span>
                </a>
              </label>
              <input
                type="checkbox"
                checked={agreements.terms}
                onChange={() => handleAgreementChange("terms")}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">
                <a
                  href="/terms/privacy"
                  className="underline text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  개인정보 수집 및 이용 동의 <span className="text-red-500">(필수)</span>
                </a>
              </label>
              <input
                type="checkbox"
                checked={agreements.privacy}
                onChange={() => handleAgreementChange("privacy")}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">
                <a
                  href="/terms/location"
                  className="underline text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  위치 서비스 이용 동의(선택)
                </a>
              </label>
              <input
                type="checkbox"
                checked={agreements.location}
                onChange={() => handleAgreementChange("location")}
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">이벤트 및 할인 혜택 안내 동의(선택)</label>
              <input
                type="checkbox"
                checked={agreements.marketing}
                onChange={() => handleAgreementChange("marketing")}
              />
            </div>
          </div>

          <div className="w-full flex justify-evenly mt-12">
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
    </div>
  );
};

export default SignupPage;
