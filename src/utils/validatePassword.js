// 비밀번호 유효성 검사 함수 (6자 이상)
const validatePassword = (password) => {
  return password.length >= 6;  // 비밀번호가 6자 이상이면 true, 아니면 false 반환
};

export default validatePassword;
