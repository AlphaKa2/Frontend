import React, { useEffect, useState } from "react";
import {
  fetchPosts,
  fetchSearchResults,
} from "../../../api/blog-services/blog/PostApi"; // API 호출 분리
import Profile from "../../../components/blog/Profile";
import EachPost from "../../../components/blog/EachPost";
import HeaderBar from "../../../components/HeaderBar";
import Dropdown from "../../../components/blog/DropdownButton";
import Tags from "../../../components/blog/Tags";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import loginState from "../../../recoil/atoms/loginState";

const PostPage = () => {
  const [posts, setPosts] = useState(null); // 게시글 데이터
  const [paginationInfo, setPaginationInfo] = useState({}); // 페이지네이션 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [sort, setSort] = useState("latest"); // 정렬 기준
  const [postsPerPage, setPostsPerPage] = useState(5); // 페이지당 게시글 수
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 여부
  const [selectedTag, setSelectedTag] = useState("all"); // 필터링 태그 상태
  const { nickname } = useParams();

  /*  const { nickname: urlNickname } = useParams(); // URL의 nickname
  const loginUser = useRecoilValue(loginState); // Recoil에서 로그인 사용자 정보 가져오기
  const [isSameNickname, setIsSameNickname] = useState(false); // 닉네임 비교 결과 상태

  useEffect(() => {
    // URL의 nickname과 로그인한 사용자 정보의 nickname 비교
    if (loginUser?.nickname && urlNickname) {
      setIsSameNickname(loginUser.nickname === urlNickname);
    } else {
      setIsSameNickname(false); // 하나라도 없으면 false
    }
  }, [loginUser, urlNickname]); */

  // 게시글 데이터 가져오기
  const loadPosts = async () => {
    try {
      const data = await fetchPosts(nickname, currentPage, postsPerPage, sort);
      const { content, isFirst, isLast, totalPages, totalElements } = data;
      setPosts(content);
      setPaginationInfo({ isFirst, isLast, totalPages, totalElements });
    } catch (error) {
      console.error(error);
    }
  };

  // 검색 결과 데이터 가져오기
  const loadSearchResults = async () => {
    try {
      const data = await fetchSearchResults(
        currentPage,
        postsPerPage,
        sort,
        keyword
      );
      const { content, isFirst, isLast, totalPages, totalElements } = data;
      setPosts(content);
      setPaginationInfo({ isFirst, isLast, totalPages, totalElements });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (nickname) {
      if (isSearching) {
        loadSearchResults(); // 검색 중이면 검색 결과 호출
      } else {
        loadPosts(); // 기본 게시글 호출
      }
    }
  }, [nickname, currentPage, postsPerPage, sort, isSearching]);

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
    setSelectedTag(tagName);
    setCurrentPage(1); // 첫 페이지로 초기화
  };

  // 로딩 중 처리
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
      <div className="w-[100vw] h-[100vh] flex justify-center">
        <div className="w-[20vw] h-screen px-[3vw] py-[9.5vh]">
          <div className="border-[2px] border-gray-400 shadow-md rounded-2xl h-[100vh] px-[1vw] text-center">
            <Profile />
            <Tags nickname={nickname} onFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="w-[80vw] h-screen flex px-12 flex-col justify-center space-y-4 overflow-x-hidden">
          {/* 검색 바 */}
          <div className="flex">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="absolute top-[10vh] left-[23vw] p-[10px] rounded-full border-[2px] border-[#ccc] w-[17.4vw] text-[16px]"
              value={keyword} // 검색어 상태
              onChange={(e) => setKeyword(e.target.value)} // 입력 값 변경
            />
            <button
              className="absolute top-[10.8vh] left-[40.5vw] border-gray-500 border-[1px] rounded-xl ml-2 px-2 h-[3.5vh]"
              onClick={handleSearch} // 검색 요청
            >
              검색
            </button>
            {isSearching && (
              <button
                className="absolute top-[10.8vh] left-[43.5vw] border-blue-500 border-[1px] rounded-xl ml-2 px-2 h-[3.5vh] text-blue-500"
                onClick={clearSearch} // 검색 초기화
              >
                전체보기
              </button>
            )}
          </div>

          {/* 정렬 드롭다운 */}
          <div className="absolute top-[10vh] right-[7vw] z-20">
            <Dropdown currentSort={sort} onSortChange={handleSortChange} />
          </div>

          {/* 게시글 목록 */}
          <div className="absolute top-[15vh] right-[7vw] space-y-[3vh]">
            {posts && <EachPost posts={posts} nickname={nickname} />}

            {/* 페이지네이션 */}
            <div className="flex justify-center">
              {[...Array(paginationInfo.totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-[0.7vw] py-[0.7vh] mx-[0.2vw] mt-[5vh] mb-[5vh] rounded-[4px] transition-colors ${
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
