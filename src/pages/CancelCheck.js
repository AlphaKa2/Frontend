import React from "react";


const CancelCheck = ({onCancel, onConfirm}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <p className="text-lg font-medium text-gray-800">
          게시글 작성을 취소하시겠습니까?
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
}; 

export default CancelCheck;
