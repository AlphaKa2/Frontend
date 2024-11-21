import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/images/logo.png';
import SignupPage from './SignupPage';
import ForgotPassword from './ForgotPasswordPage';
import checkEmptyField from '../../utils/checkEmptyField';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (checkEmptyField(email) && checkEmptyField(password)) {
      setErrorMessage('이메일과 비밀번호를 입력해주세요.'); 
    } else if (checkEmptyField(email)) {                           
      setErrorMessage('이메일을 입력해주세요.');
    } else if (checkEmptyField(password)) {                      
      setErrorMessage('비밀번호를 입력해주세요.');       
    }
   else {                  
      setErrorMessage('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white"> {/* 전체 배경*/}
      <img src={logo} alt="온길 로고" className="mb-6 cursor-pointer" onClick={() => navigate('/')} /> {/* 온길로고*/}
      <h1 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => navigate('/')}>온길</h1> {/* 온길*/}

      <div className="w-80">  {/* 로그인 창 컴포넌트*/}
        <input   // 이메일 입력 폼
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  
          className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="relative"> 
          <input            // 비밀번호 입력 폼
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
               <button
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

        <button         // 비밀번호 찾기 버튼
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm text-blue-500 hover:underline float-right mb-4"
        >
          비밀번호 찾기
        </button>
        <button        // 로그인 버튼
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
        >
          로그인
        </button>
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      </div>

      <div className="flex items-center justify-center my-4"> {/* -connect with-*/}
        <hr className="w-20 border-gray-300" />
        <span className="px-2 text-gray-500">Connect With</span>
        <hr className="w-20 border-gray-300" />
      </div>

      <div className="flex space-x-4"> {/* 소셜 로그인 컴포넌트*/}
        <button className="flex items-center px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500">
          <img src="/assets/icons/kakao.svg" alt="Kakao Login" className="w-6 h-6 mr-2" />
          Login
        </button>
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          <img src="/assets/icons/naver.svg" alt="Naver Login" className="w-6 h-6 mr-2" />
          Log In
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200">
          <img src="/assets/icons/google.svg" alt="Google Login" className="w-6 h-6 mr-2" />
          Google
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        회원이 아니신가요?{' '}
        <button
          onClick={() => navigate('/signup')}
          className="text-blue-500 hover:underline"
        >
          회원가입
        </button>
      </p>
    </div>
  );
};

export default LoginPage;