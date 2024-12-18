import React, { useState } from "react";
import ReportCommentApi from "../../api/blog-services/report/ReportCommentApi";
import { useNavigate, useLocation } from "react-router-dom";


const ReportPage = () => {
  const [details, setDetails] = useState("");
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [errors, setErrors] = useState({
    reason: false,
    details: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { targetId } = location.state || {}; // 전달된 props 수신


  // const targetId = 8; 테스트용 타겟 아이디 하드코딩

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const newErrors = {
      reason: !reason.trim(),
      details: !details.trim(),
    };
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).some((error) => error)) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
  
    // reason 변환 맵
    const reasonMap = {
      "스팸홍보/도배": "SPAM_ADVERTISEMENT",
      "음란물/선정적인 내용": "OBSCENE_CONTENT",
      "불법적인 내용": "ILLEGAL_INFORMATION",
      "혐오 발언": "HATE_SPEECH",
      "개인정보 침해": "VIOLATION_OF_PRIVACY",
      "사실과 다른 정보": "FALSE_INFORMATION",
      "부적절한 닉네임": "INAPPROPRIATE_NICKNAME",
      "부적절한 프로필": "INAPPROPRIATE_PROFILE",
      "부적절한 소개글": "INAPPROPRIATE_BIO",
      기타: "OTHER",
    };
  
    // 서버로 전송할 reason 변환
    const convertedReason = reasonMap[reason];
  
    try {
      console.log("Request Payload:", { targetId, reason: convertedReason, details });
      const {status} = await ReportCommentApi(targetId, convertedReason, details);
      if (status === 200) {
        alert("신고가 접수되었습니다.");
      }
    } catch (error) {
      alert(error.message);

    }
  };
  

  return (
    <div className="w-full h-auto bg-white py-32 flex flex-col items-center">
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
      <h1 className="text-2xl font-bold mb-8">신고하기</h1>
      <div className="w-96">
        {/* 신고 사유 선택 */}
        <div className="mb-6">
          <select
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, reason: false }));
              }
            }}
            className="w-full border rounded-md p-3 bg-white text-gray-700"
          >
            <option value="">신고 사유 선택</option>
            <option value="스팸홍보/도배">스팸홍보/도배</option>
            <option value="음란물/선정적인 내용">음란물/선정적인 내용</option>
            <option value="불법적인 내용">불법적인 내용</option>
            <option value="혐오 발언">혐오 발언</option>
            <option value="개인정보 침해">개인정보 침해</option>
            <option value="사실과 다른 정보">사실과 다른 정보</option>
            <option value="부적절한 닉네임">부적절한 닉네임</option>
            <option value="부적절한 프로필">부적절한 프로필</option>
            <option value="부적절한 소개글">부적절한 소개글</option>
            <option value="기타">기타</option>
          </select>
          {errors.reason && (
            <p className="text-red-500 text-sm mt-2">* 신고 사유를 선택해주세요.</p>
          )}
        </div>

        {/* 신고 내용 작성 */}
        <div className="mb-6">
          <textarea
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
              if (e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, details: false }));
              }
            }}
            placeholder="신고 내용을 작성해주세요."
            className="w-full border rounded-md p-3 h-32 resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">* 신고 내용을 작성해주세요.</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-evenly mt-8">
          <button
            onClick={handleCancelClick}
            className="bg-gray-200 text-blue-500 px-6 py-2 rounded-md hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
