// PostsPage.js
import React, { useEffect, useState, useRef } from "react";
import ProfileTags from "./ProfileTags";
import EachPost from "./EachPost";
import HeaderBar from "../components/HeaderBar";
import Dropdown from "./DropdownButton";
import "./PostsPage.css";
import "./EachPost.css";
import Image_1 from "../assets/images/main4-1.png";
import Image_2 from "../assets/images/main4-2.png";
import Image_3 from "../assets/images/main4-3.png";

const PostPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("*"); // 필터 상태 추가
  const postsPerPage = 3;
  const postsRef = useRef(null);

  /* const handleNavigation = () => {
    navigate("/create-post"); // Define the navigation logic here
  };

  const handlePostNavigation = () => {
    // Navigate dynamically based on the postId or other parameters
    navigate("/posts/${postId}");
  }; */

  const posts = {
    status: 200,
    message: "요청이 성공적으로 처리되었습니다",
    data: {
      content: [
        {
          postId: 1,
          title: "제목 1",
          contentSnippet: "이것은 제목 1의 내용 요약입니다.",
          representativeImage: Image_1,
          tags: ["#경기도", "#여행", "#자연"],
          likeCount: 25,
          commentCount: 10,
          viewCount: 300,
          createdAt: "2024-11-22 10:30:00",
          updatedAt: "2024-11-23 15:00:00",
        },
        {
          postId: 2,
          title: "제목 2",
          contentSnippet: "이것은 제목 2의 내용 요약입니다.",
          representativeImage: Image_2,
          tags: ["#강원도", "#여행", "#바다"],
          likeCount: 40,
          commentCount: 15,
          viewCount: 450,
          createdAt: "2024-11-21 14:00:00",
          updatedAt: "2024-11-22 09:00:00",
        },
        {
          postId: 3,
          title: "제목 3",
          contentSnippet: "이것은 제목 3의 내용 요약입니다.",
          representativeImage: Image_3,
          tags: ["#제주도", "#여행", "#힐링"],
          likeCount: 35,
          commentCount: 12,
          viewCount: 400,
          createdAt: "2024-11-20 08:30:00",
          updatedAt: "2024-11-20 18:00:00",
        },
        {
          postId: 4,
          title: "제목 4",
          contentSnippet: "이것은 제목 4의 내용 요약입니다.",
          representativeImage: Image_1,
          tags: ["#서울", "#여행", "#문화"],
          likeCount: 50,
          commentCount: 20,
          viewCount: 600,
          createdAt: "2024-11-19 12:00:00",
          updatedAt: "2024-11-19 16:30:00",
        },
        {
          postId: 5,
          title: "제목 5",
          contentSnippet: "이것은 제목 5의 내용 요약입니다.",
          representativeImage: Image_2,
          tags: ["#충청북도", "#여행", "#산책"],
          likeCount: 20,
          commentCount: 8,
          viewCount: 250,
          createdAt: "2024-11-18 14:00:00",
          updatedAt: "2024-11-18 18:00:00",
        },
      ],
      pageNumber: 1,
      pageSize: 5,
      isFirst: true,
      isLast: true,
    },
  };

  // Pagination 관련
  const filteredPosts = posts.data.content.filter(
    (post) =>
      (filter === "*" || post.region === filter.replace(".", "")) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.contentSnippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.join(" ").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (region) => {
    const filterValue = region === "all" ? "*" : `.${region}`;
    setFilter(filterValue);
    setCurrentPage(1); // 필터를 변경할 때 첫 페이지로 이동
  };

  return (
    <>
      <HeaderBar></HeaderBar>
      <div className="w-screen h-screen flex justify-center">
        {/* <ProfileTags onFilterChange={handleFilterChange} onButtonClick={handleNavigation} /> */}
        <ProfileTags />
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
            <Dropdown></Dropdown>
          </div>

          <div className="absolute top-[15%]">
            <div ref={postsRef} className="space-y-8">
              {currentPosts.map((post) => (
                // <EachPost key={post.postId} region={post.region} title={post.title} description={post.content} image={post.image} tags={post.tags} handlePostClick={handlePostNavigation} />
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
            </div>
          </div>

          <div className="absolute bottom-[5%] right-[40%]">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-[4px] px-[10px] py-[3px] rounded-[4px] transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-[#e3f6f7] hover:bg-[#b3e0e3]"
                }`}
                style={{
                  display:
                    filteredPosts.length > index * postsPerPage
                      ? "inline-block"
                      : "none",
                }} // 조건부 렌더링
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;


