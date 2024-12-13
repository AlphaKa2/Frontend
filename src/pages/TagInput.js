import React, { useState } from "react";

function TagInput({ tags, setTags}) {
  const [inputValue, setInputValue] = useState(""); // 입력 값
  const [isComposing, setIsComposing] = useState(false); // IME 입력 상태 여부

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && !isComposing) {
      e.preventDefault(); // 기본 동작 방지

      const trimmedValue = inputValue.trim(); // 입력값 앞뒤 공백 제거
      if (trimmedValue && !tags.includes(trimmedValue)) {
        setTags((prevTags) => [...prevTags, trimmedValue]); // 태그 추가
      }

      setInputValue(""); // 입력값 초기화
    }

    // 백스페이스 키 입력 시
    if (e.key === "Backspace" && inputValue === "") {
      // 입력값이 비어있을 때 마지막 태그 제거
      setTags((prevTags) => prevTags.slice(0, -1));
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value); // 입력값 업데이트
  };

  const handleCompositionStart = () => {
    setIsComposing(true); // IME 입력 시작
  };

  const handleCompositionEnd = () => {
    setIsComposing(false); // IME 입력 종료
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove)); // 태그 제거
  };

  return (
    <div className="flex items-center flex-wrap border-[2px] border-gray-300 rounded-lg p-1.5 focus-within:ring-2 focus-within:ring-blue-500 mb-[0.7em]">
      {/* 태그 렌더링 */}
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-blue-500 text-white px-2 py-1 rounded flex items-center mr-2 mb-2"
        >
          {tag}
          <button
            className="ml-1 text-lg text-white hover:text-gray-200 focus:outline-none"
            onClick={() => removeTag(tag)}
          >
            &times;
          </button>
        </div>
      ))}

      {/* 입력 필드 */}
      <input
        type="text"
        className="flex-grow focus:outline-none p-1 text-lg"
        placeholder="Enter tags"
        value={inputValue}
        onChange={handleChange} // 입력값 변경
        onKeyDown={handleKeyDown} // 키 입력 이벤트
        onCompositionStart={handleCompositionStart} // IME 입력 시작
        onCompositionEnd={handleCompositionEnd} // IME 입력 종료
      />
    </div>
  );
}

export default TagInput;