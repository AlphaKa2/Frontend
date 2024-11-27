import React, { useState } from "react";

const Dropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");

  const options = [
    { label: "최신순", value: "latest" },
    { label: "오래된순", value: "oldest" },
    { label: "조회수순", value: "views" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  // 옵션 클릭 핸들러
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onSortChange(option.value); // 정렬 옵션 변경 콜백 호출
  };

  return (
    <div className="inline-block text-left">
      {/* 드롭다운 버튼 */}
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-between w-[105px] pl-4 pr-1 py-2 text-md font-medium text-white bg-[#4B6BFB] rounded-lg shadow-sm"
      >
        {selectedOption} {/* 버튼에 선택된 옵션 표시 */}
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
            selectedOption === option.label
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

export default Dropdown;