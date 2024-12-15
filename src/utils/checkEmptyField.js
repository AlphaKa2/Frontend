// 공백 검사 함수
const checkEmptyField = (fieldString) => {
  const fields = fieldString.split(',').map((field) => field.trim()); // 문자열을 쉼표로 구분하고 양끝 공백 제거

  for (let field of fields) {
    if (!field) {
      return true;
    } else {
      return false;
    }
  }

  return ''; // 모든 필드가 채워져 있으면 빈 문자열 반환
};

export default checkEmptyField;
