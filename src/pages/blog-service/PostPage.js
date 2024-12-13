import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import Profile from "../Profile";
import EachPost from "../EachPost";
import HeaderBar from "../../components/HeaderBar";
import Dropdown from "../DropdownButton";
import Tags from "../Tags";
import { useRecoilValue } from "recoil";
import loginState from "../../recoil/atoms/loginState";
import authorState from "../../recoil/atoms/authorState"; // Recoil atom 가져오기


const PostPage = () => {
  const [posts, setPosts] = useState([]); // 게시글 데이터
  const [paginationInfo, setPaginationInfo] = useState({}); // 페이지네이션 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [sort, setSort] = useState("latest"); // 정렬 기준
  const [postsPerPage, setPostsPerPage] = useState(5); // 페이지당 게시글 수
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 여부
  const [selectedTag, setSelectedTag] = useState("all"); // 필터링 태그 상태
  const {nickname} = useRecoilValue(loginState);
  const {author} = useRecoilValue(authorState); // Recoil 상태에서 author 값 가져오기

const fetchPosts = async () => {
  try {
    const endpoint = `/blog-service/api/posts/blog/${nickname}`; // author가 있으면 author 사용, 없으면 nickname 사용
    console.log("엔드포인트 URL:", endpoint); // 디버깅용

    const params = {
      page: currentPage,
      size: postsPerPage,
      sort,
    };

    const response = await axios.get(endpoint, { params });
    const { content, isFirst, isLast, totalPages, totalElements } =
      response.data.data;

    setPosts(content);
    setPaginationInfo({ isFirst, isLast, totalPages, totalElements });
  } catch (error) {
    console.error("데이터를 불러오는데 실패했습니다:", error);
  }
};

// 검색 결과 요청 함수
const fetchSearch = async () => {
  try {
    const userNickname = nickname; // nickname은 props로 받음
    const endpoint = `/blog-service/api/posts/search`; // 검색 요청 URL
    console.log("검색 엔드포인트 URL:", endpoint); // 디버깅용

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


  useEffect(() => {
    if (author || nickname) {
      fetchPosts(); // author 또는 nickname이 존재하면 요청 실행
    }
  }, [author, nickname, currentPage, postsPerPage, sort]);


  // 정렬 변경 핸들러
  const handleSortChange = (sort) => {
    setSort(sort);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  // 검색 핸들러
  const handleSearch = () => {
    if (keyword.trim().length < 2) {
      alert("검색어는 최소 2글자 이상 입력해주세요.");
      return;
    }

    setIsSearching(true); // 검색 상태로 전환
    fetchSearch();
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // 검색 초기화 핸들러
  const clearSearch = () => {
    setIsSearching(false); // 검색 상태 해제
    setKeyword(""); // 검색어 초기화
    setCurrentPage(1); // 첫 페이지로 이동
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleFilterChange = (tagName) => {
    setSelectedTag(tagName); // 선택된 태그 업데이트
    setCurrentPage(1); // 첫 페이지로 초기화
  };

  return (
    <>
      <HeaderBar />
      <div className="w-[100vw] h-[150vh] flex justify-center">
        <div className="w-[20%] h-screen px-12 py-12">
        <div className="border-[0.1px] border-gray-400 shadow-md rounded-2xl h-[90%] p-4 mt-16 text-center">
          <Profile />
          <Tags nickname={nickname} onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="w-[80%] h-[100%] flex px-12 flex-col justify-center space-y-4 overflow-x-hidden">
          {/* 검색 바 */}
          <div className="flex">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="absolute top-[6em] left-[25em] p-[10px] rounded-full border-[2px] border-[#ccc] w-[300px] text-[16px]"
              value={keyword} // 검색어 상태
              onChange={(e) => setKeyword(e.target.value)} // 입력 값 변경
            />
            <button
              className="absolute top-[6.5em] left-[43.7em] border-gray-500 border-[1px] rounded-xl ml-2 px-2 h-[35px]"
              onClick={handleSearch} // 검색 요청
            >
              검색
            </button>
            {isSearching && (
              <button
                className="absolute top-[6.5em] left-[47em] border-blue-500 border-[1px] rounded-xl ml-2 px-2 h-[35px] text-blue-500"
                onClick={clearSearch} // 검색 초기화
              >
                전체보기
              </button>
            )}
          </div>

          {/* 정렬 드롭다운 */}
          <div className="absolute top-[6em] right-[8em] z-20">
            <Dropdown currentSort={sort} onSortChange={handleSortChange} />
          </div>

          {/* 게시글 목록 */}
          <div className="absolute top-[16%] right-[7%] space-y-8">
            {posts.map((post) => (
              <EachPost
                key={post.postId}
                postId={post.postId}
                title={post.title}
                content={post.contentSnippet}
                image={post.representativeImage}
                tags={post.tags}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                viewCount={post.viewCount}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
              />
            ))}

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-12">
              {[...Array(paginationInfo.totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-[4px] px-[10px] py-[3px] rounded-[4px] transition-colors ${
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

export default PostPage;
