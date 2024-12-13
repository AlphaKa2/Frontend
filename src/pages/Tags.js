import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../api/axios";


const Tags = ({ nickname, onFilterChange }) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all"); // 현재 선택된 태그 상태

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`/blog-service/api/tags/blog/${nickname}`);
        if (response.status === 200) {
          setTags(response.data.data); // API에서 가져온 태그 데이터를 상태에 저장
          console.log("태그요청이 정상작동됐습니다.");
          console.log(response.data.data);
        } else {
          console.error("태그 데이터를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("태그 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (nickname) {
      fetchTags();
    }
  }, [nickname]); // nickname이 변경될 때마다 요청 실행

  const handleTagClick = (tagName) => {
    setSelectedTag(tagName); // 선택된 태그 업데이트
    onFilterChange(tagName); // 상위 컴포넌트에 필터링 태그 전달
  };

  return (
    <div className="w-[100%] mt-6 text-left p-2 space-y-2">
      <div className="font-semibold text-[1.2em]">태그 목록</div>
      <div className="w-[100%] border-[0.5px] border-black"></div>
      <div className="w-[100%] space-y-2 h-[220px] overflow-y-scroll">
        <div
          onClick={() => handleTagClick("all")}
          className={`cursor-pointer hover:underline ${
            selectedTag === "all" ? "font-bold" : ""
          }`}
        >
          전체보기
        </div>
        {tags.map((tag) => (
          <div
            key={tag.tagName}
            onClick={() => handleTagClick(tag.tagName)}
            className={`cursor-pointer hover:underline ${
              selectedTag === tag.tagName ? "font-bold" : ""
            }`}
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
