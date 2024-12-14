import axios from "../../axios";

// 게시글 목록 조회
export const fetchPosts = async (nickname, currentPage, postsPerPage, sort) => {
  try {
    const endpoint = `/blog-service/api/posts/blog/${nickname}`;
    const params = {
      page: currentPage,
      size: postsPerPage,
      sort,
    };

    const response = await axios.get(endpoint, { params });
    return response.data.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("게시글 데이터를 불러오는데 실패했습니다:", error);
    throw error;
  }
};

// 검색 결과 조회
export const fetchSearchResults = async (
  currentPage,
  postsPerPage,
  sort,
  keyword
) => {
  try {
    const endpoint = `/blog-service/api/posts/search`;
    const params = {
      page: currentPage,
      size: postsPerPage,
      sort,
      keyword,
    };

    const response = await axios.get(endpoint, { params });
    return response.data.data; // 필요한 데이터 반환
  } catch (error) {
    console.error("검색 데이터를 불러오는데 실패했습니다:", error);
    throw error;
  }
};
