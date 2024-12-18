import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingGif from '../../assets/videos/Loading.gif'; // 로딩 GIF 경로

const LoadingCard = () => {
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(true); // 2초 후 성공 메시지 표시
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (showSuccess) {
      const navigateTimer = setTimeout(() => {
        navigate('/'); // 성공 메시지 2초 후 홈으로 이동
      }, 2000);

      return () => clearTimeout(navigateTimer);
    }
  }, [showSuccess, navigate]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full h-auto overflow-hidden">
        {showSuccess ? (
          <>
            <h2 className="text-lg font-bold">여행 계획 요청이 성공했습니다!</h2>
            <p className="mt-4 text-gray-700">잠시 후 메인 페이지로 이동합니다.</p>
          </>
        ) : (
          <img
            src={LoadingGif}
            alt="Loading"
            className="w-full h-64 object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default LoadingCard;
