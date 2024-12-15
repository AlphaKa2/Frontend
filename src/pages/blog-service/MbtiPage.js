import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import loginState  from "../../recoil/atoms/loginState";
import HandIcon from "../../assets/images/hand_icon.png";
import UpdateUserMbtiApi from "../../api/blog-services/mbti/UpdateUserMbtiApi";
import { useNavigate } from "react-router-dom";


const MbtiPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const setUser = useSetRecoilState(loginState); // Recoil 유저 상태 업데이트
  const navigate = useNavigate();

  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Start animation after 100ms
    return () => clearTimeout(timer);
  }, []);

  const handleTest = async () => {
  const mbti = "ABLJ";
  // UpdateUserMbtiApi(setUser.userId, mbti);
    navigate('/mbti/test');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Header Section */}
      <div
        className={`flex flex-col items-center justify-center transition-opacity duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        <h2 className="text-xl font-semibold text-blue-600 mb-2 text-center">
          MBTI Test
        </h2>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          당신의 여행 MBTI는?
        </h1>
        <p className="text-gray-500 text-center mb-10">
          20가지 여행 MBTI 테스트 문항을 통해 나의 여행 취향 결과를 확인해보세요!
        </p>
      </div>

      {/* Icon Section */}
      <img
        src={HandIcon}
        alt="손가락 아이콘"
        className="h-40 w-auto mb-10"
      />

      {/* Options Section */}
      <div
        className={
          `transition-opacity duration-700 delay-400 
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`
        }
      >
        <div className="grid grid-cols-2 gap-6 mb-10">
          {/* Option 1 */}
          <div 
            className="p-6 border rounded-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
          >
            <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center text-gray-600 mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Active</h3>
            <p className="text-sm text-gray-500 text-center">
              활동적인 여행을 선호하는 성향의 답변
            </p>
          </div>
          {/* Option 2 */}
          <div
            className="p-6 border rounded-lg flex flex-col items-center transform transition-transform duration-300 hover:scale-105 bg-blue-100"
          >
            <div className="w-10 h-10 border border-blue-600 rounded-full flex items-center justify-center text-blue-600 mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-blue-600 mb-2">Relaxed</h3>
            <p className="text-sm text-gray-500 text-center">
              느긋한 여행을 선호하는 성향의 답변
            </p>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div
        className={`transition-opacity duration-700 delay-600 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        <button className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-600"
                onClick = {handleTest}>
          테스트 하러가기
        </button>
      </div>
    </div>
  );
};

export default MbtiPage;
