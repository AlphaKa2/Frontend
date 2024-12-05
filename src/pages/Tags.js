import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { fetchTags } from "./path/to/api";

const dummyTags = [
  { tagName: "경기", postCount: 15 },
  { tagName: "강원", postCount: 8 },
  { tagName: "충북", postCount: 10 },
  { tagName: "충남", postCount: 5 },
  { tagName: "제주", postCount: 12 },
  { tagName: "제주", postCount: 12 },
  { tagName: "강원", postCount: 8 },
  { tagName: "충북", postCount: 10 }
  
];

const Tags = ({ nickname, onFilterChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // 실제 API 호출 시 주석을 해제하고 사용
    // const loadTags = async () => {
    //   const data = await fetchTags(nickname);
    //   setTags(data);
    // };

    // loadTags();

    // 더미 데이터 사용
    setTags(dummyTags);
  }, [nickname]);

  return (
    <div className="w-[100%] mt-6 text-left p-2 space-y-2">
      <div className="font-semibold text-[1.2em]">태그 목록</div>
      <div className="w-[100%] border-[0.5px] border-black"></div>
      <div className="w-[100%] space-y-2 h-[220px] overflow-y-scroll">
        <div onClick={() => onFilterChange("all")}>전체보기</div>
        {tags.map((tag) => (
          <div
            key={tag.tagName}
            onClick={() => onFilterChange(tag.tagName)}
            className="cursor-pointer hover:underline"
          >
            {`${tag.tagName} (${tag.postCount})`}
          </div>
        ))}
      </div>
    </div>
  );
};

Tags.propTypes = {
  nickname: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Tags;
