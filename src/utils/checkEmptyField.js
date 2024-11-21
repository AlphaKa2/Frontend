// 공백 검사 함수 
const checkEmptyField = (fields) => {
  for (let key in fields) {
    if (!fields[key]) {
      return `${key}을(를) 입력해주세요.`;
    }
  }
  return ''; // 모든 필드가 채워져 있으면 빈 문자열 반환
};


export default checkEmptyField;
