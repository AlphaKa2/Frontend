import React from "react";

const ToggleButton = ({ isToggled, setIsToggled, onText, offText }) => {
  const handleToggle = () => {
    setIsToggled(!isToggled); // 토글 상태 변경
  };

  return (
    <div className="flex items-center justify-center my-0.5 mx-2">
      <div
        onClick={handleToggle}
        className={`relative inline-block w-12 h-6 rounded-full cursor-pointer transition-colors ${
          isToggled ? "bg-blue-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            isToggled ? "transform translate-x-6" : ""
          }`}
        ></div>
      </div>
      <span>{isToggled ? onText : offText}</span>
    </div>
  );
};

export default ToggleButton;