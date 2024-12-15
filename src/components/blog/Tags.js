import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTags } from "../../api/blog-services/blog/PostApi";


const Tags = ({ nickname, onFilterChange }) => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all"); // 현재 선택된 태그 상태

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await getTags(nickname); // 분리된 API 호출 함수 사용
        setTags(data); // 데이터 상태 업데이트
        console.log("태그요청이 정상작동됐습니다.");
        console.log(data);
      } catch (error) {
        console.error("태그 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    if (nickname) {
      loadTags(); // nickname이 있을 때만 호출
    }
  }, [nickname]); // nickname이 변경될 때마다 요청 실행

  const handleTagClick = (tagName) => {
    setSelectedTag(tagName); // 선택된 태그 업데이트
    onFilterChange(tagName); // 상위 컴포넌트에 필터링 태그 전달
  };

  return (
    <div className="w-[11vw] mt-[0.5vh] text-left px-[0.3vw] space-y-[1vh]">
      <div className="font-semibold text-[20px]">태그 목록</div>
      <div className="w-[11vw] border-[0.5px] border-black"></div>
      <div className="w-[11vw] space-y-2 h-[36vh] overflow-y-scroll">
        <div
          onClick={() => handleTagClick("all")}
          className={`cursor-pointer hover:underline ${
            selectedTag === "all" ? "font-semibold" : ""
          }`}
        >
          전체보기
        </div>
        {tags.map((tag) => (
          <div
            key={tag.tagName}
            onClick={() => handleTagClick(tag.tagName)}
            className={`cursor-pointer hover:underline ${
              selectedTag === tag.tagName ? "font-semibold" : ""
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
