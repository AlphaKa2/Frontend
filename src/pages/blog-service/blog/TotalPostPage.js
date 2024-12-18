import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import AtomicPost from "../../../components/blog/AtomicPost";
import HeaderBar from "../../../components/HeaderBar";
import Dropdown from "../../../components/blog/DropdownButton";

const TotalPostPage = () => {
  const [posts, setPosts] = useState(null); // 게시글 데이터
  const [paginationInfo, setPaginationInfo] = useState({}); // 페이지네이션 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [sort, setSort] = useState("latest"); // 정렬 기준
  const [postsPerPage, setPostsPerPage] = useState(16); // 페이지당 게시글 수
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 여부

// 게시글 목록 가져오기
const fetchPosts = async () => {
  try {
    const endpoint = `/blog-service/api/posts/all`;
    const params = {
      page: currentPage,
      size: postsPerPage,
      sort,
    };

    const response = await axios.get(endpoint, { params });
    const { content, isFirst, isLast, totalPages, totalElements } = response.data.data;

    setPosts(content);
    setPaginationInfo({ isFirst, isLast, totalPages, totalElements });
  } catch (error) {
    console.error("게시글 데이터를 불러오는데 실패했습니다:", error);
  }
};

useEffect(() => {
  fetchPosts();
}, [currentPage, sort]);

  

  const fetchSearch = async () => {
    try {
      const endpoint = `/blog-service/api/posts/search`;
      console.log("검색 엔드포인트 URL:", endpoint);

      const params = {
        page: currentPage,
        size: postsPerPage,
        sort,
        keyword,
      };

      const response = await axios.get(endpoint, { params });
      const { content, isFirst, isLast, totalPages, totalElements } =
        response.data.data;

      setPosts(content);
      setPaginationInfo({ isFirst, isLast, totalPages, totalElements });
    } catch (error) {
      console.error("검색 데이터를 불러오는데 실패했습니다:", error);
    }
  };

  const handleSortChange = (sort) => {
    setSort(sort);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    if (keyword.trim().length < 2) {
      alert("검색어는 최소 2글자 이상 입력해주세요.");
      return;
    }

    setIsSearching(true);
    fetchSearch();
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setIsSearching(false);
    setKeyword("");
    setCurrentPage(1);
    fetchPosts();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!posts) {
    return (
      <div className="flex justify-center items-center text-[40px] font-bold mt-[9em]">
        Loading...
      </div>
    );
  }

  return (
    <>
  <HeaderBar />
  <div className="w-screen h-screen relative">
    <div className="flex px-[2.5vw] flex-col justify-center space-y-[1vh] overflow-x-hidden relative">
      {/* 검색 바 */}
      <div className="relative">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="absolute top-[12vh] left-[0vw] p-[10px] rounded-full border-[2px] border-[#ccc] w-[300px] text-[16px]"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="absolute top-[12.8vh] left-[17.5vw] border-gray-500 border-[1px] rounded-xl ml-2 px-2 h-[35px]"
          onClick={handleSearch}
        >
          검색
        </button>
        {isSearching && (
          <button
            className="absolute top-[12.8vh] left-[20.5vw] border-blue-500 border-[1px] rounded-xl ml-2 px-2 h-[35px] text-blue-500"
            onClick={clearSearch}
          >
            전체보기
          </button>
        )}
      </div>

      {/* 정렬 드롭다운 */}
      <div className="absolute top-[11.5vh] right-[2.5vw] z-20">
        <Dropdown currentSort={sort} onSortChange={handleSortChange} />
      </div>

      {/* 게시글 목록 */}
      <div className="flex flex-col justify-center w-[100%] pt-[19vh]">
          {posts && <AtomicPost posts={posts} />}
        

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-[5vh]">
          {[...Array(paginationInfo.totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-[4px] px-[10px] py-[3px] rounded-[4px] transition-colors mb-[2vh] ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-[#e3f6f7] hover:bg-[#b3e0e3]"
              }`}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
</>


  );
};

export default TotalPostPage;
