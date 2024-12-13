import React, { useState } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "최신순", value: "latest" },
    { label: "오래된순", value: "oldest" },
    { label: "조회수순", value: "views" },
  ];

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 옵션 클릭 핸들러
  const handleOptionClick = (option) => {
    
    if (option.value !== currentSort) {
      onSortChange(option.value); // 부모로 새로운 정렬 기준 전달
    }
    setIsOpen(false);
  };

   // 현재 선택된 옵션 라벨 가져오기
   const selectedOptionLabel =
   options.find((option) => option.value === currentSort)?.label || "최신순";

  return (
    <div className="inline-block text-left relative">
      {/* 드롭다운 버튼 */}
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-between w-[105px] pl-4 pr-1 py-2 text-md font-medium text-white bg-[#4B6BFB] rounded-lg shadow-sm z-10"
      >
        {selectedOptionLabel} {/* 버튼에 선택된 옵션 표시 */}
        <svg
          className="w-5 h-5 ml-1 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="mt-0.5">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className={`block w-[105px] pl-4 py-2 text-left text-md rounded-none border-black border-[0.2px]
          ${
            currentSort === option.value
              ? "bg-[#4B6BFB] text-white"
              : "bg-white text-black hover:bg-[#111e8d] hover:text-white"
          }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  currentSort: PropTypes.string.isRequired, // 현재 선택된 정렬 기준 (부모에서 전달)
  onSortChange: PropTypes.func.isRequired, // 정렬 변경 핸들러
};

export default Dropdown;