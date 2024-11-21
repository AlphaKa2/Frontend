// 이메일 유효성 검사 함수
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);  // 이메일 형식이 맞으면 true, 아니면 false 반환
};

export default validateEmail;

