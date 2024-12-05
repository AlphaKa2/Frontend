import React, { useEffect, useState, useRef } from "react";
import axios from "../axios"; // Axios를 사용해 서버 요청
import Profile from "../Profile";
import EachPost from "../EachPost";
import HeaderBar from "../../components/HeaderBar";
import Dropdown from "../DropdownButton";


const PostPage = () => {

  const [posts, setPosts] = useState(null); // 게시글 데이터를 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filter, setFilter] = useState("*"); // 필터 상태
  const postsPerPage = 5; // 페이지당 게시글 수
  const postsRef = useRef(null);
  

  // 게시글 목록 요청 함수
  const fetchPosts = async () => {
    try {
      const nickname = "imThird"; // 블로그 주인의 닉네임
      const sort = "latest"; // 정렬 기준
      const response = await axios.get(
        `/blog-service/api/posts/blog/${nickname}`,
        {
          params: {
            page: currentPage, // 현재 페이지
            size: postsPerPage, // 페이지당 게시글 수
            sort, // 정렬 기준
          },
        }
      );
      setPosts(response.data); // 서버로부터 데이터를 받아와 상태 업데이트
    } catch (error) {
      console.error("게시글 목록을 불러오는데 실패했습니다:", error);
    }
  };

  // 검색 및 필터를 적용한 게시글 필터링
  const filteredPosts =
    posts?.data?.content.filter(
      (post) =>
        (filter === "*" ||
          post.tags
            .join(" ")
            .toLowerCase()
            .includes(filter.replace(".", ""))) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.contentSnippet
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          post.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

  const totalPages = posts?.data?.totalElements
    ? Math.max(Math.ceil(posts.data.totalElements / postsPerPage), 1) // 최소값 1로 설정
    : 0;

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    fetchPosts(); // 컴포넌트 로드 시 게시글 목록 요청
  }, [currentPage]); // 현재 페이지가 변경될 때마다 요청

  return (
    <>
      <HeaderBar></HeaderBar>
      <div className="w-[100vw] h-[150vh] flex justify-center">
        {/* <ProfileTags onFilterChange={handleFilterChange} onButtonClick={handleNavigation} /> */}
        <Profile />
        <div className="w-[80%] h-[100%] flex px-12 flex-col justify-center space-y-4 overflow-x-hidden">
          <div className="absolute top-[10%]">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchTerm}
              // onChange={handleSearchChange}
              className="p-[10px] rounded-full border-[2px] border-[#ccc] w-[300px] text-[16px]"
            />
          </div>
          <div className="absolute top-[10%] right-[10%] z-20">
            <Dropdown />
          </div>

          <div>
            <div
              ref={postsRef}
              className="space-y-8 absolute top-[18%] right-[7%]"
            >
              {filteredPosts.map((post) => (
                <EachPost
                  key={post.postId}
                  title={post.title}
                  content={post.contentSnippet}
                  image={post.representativeImage}
                  tags={post.tags} // 태그 배열을 문자열로 변환하여 표시
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  viewCount={post.viewCount}
                  createdAt={post.createdAt}
                  updatedAt={post.updatedAt}
                />
              ))}

              <div className="flex justify-center mt-12">
                {[...Array(totalPages || 0)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-[4px] px-[10px] py-[3px] rounded-[4px] transition-colors ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-[#e3f6f7] hover:bg-[#b3e0e3]"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
