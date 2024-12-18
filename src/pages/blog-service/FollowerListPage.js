import React, { useState, useEffect } from "react";

const FollowerListPage = () => {
  const [followers, setFollowers] = useState([]); // 팔로우 목록 데이터
  const [totalCount, setTotalCount] = useState(0); // 팔로우 총 수
  const [page, setPage] = useState(1); // 현재 페이지
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 팔로우 데이터 가져오기 (서버 요청)
  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/followers?page=${page}&size=10`); // 서버 API
      const data = await response.json();

      // 서버 응답에서 데이터 추가
      setFollowers((prev) => [...prev, ...data.followers]);
      setTotalCount(data.totalCount); // 총 팔로워 수
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 첫 렌더링 시 데이터 가져오기
  useEffect(() => {
    fetchFollowers();
  }, [page]);

  // 무한 스크롤링 로직
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      !loading
    ) {
      setPage((prev) => prev + 1); // 페이지 증가
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* 팔로우 총 수 */}
      <h1 className="text-xl font-bold mb-6">
        <span className="text-black font-extrabold">{totalCount}</span>명을 팔로우 중
      </h1>

      {/* 팔로워 목록 */}
      <div className="space-y-4">
        {followers.map((follower, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-4"
          >
            {/* 유저 정보 */}
            <div className="flex items-center space-x-4">
              <img
                src={follower.profileImage}
                alt="프로필 이미지"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{follower.name}</p>
                <p className="text-gray-500">@{follower.username}</p>
              </div>
            </div>

            {/* 팔로우 버튼 */}
            <button
              className="text-blue-500 border border-blue-500 px-4 py-1 rounded-full hover:bg-blue-100"
              onClick={() => alert(`${follower.name}님을 팔로우합니다.`)}
            >
              팔로우
            </button>
          </div>
        ))}
      </div>

      {/* 로딩 중 표시 */}
      {loading && (
        <div className="text-center text-gray-500 mt-4">
          데이터를 가져오는 중...
        </div>
      )}
    </div>
  );
};

export default FollowerListPage;
