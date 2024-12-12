import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GetFollowingListApi from "../../api/blog-services/follow/GetFollowingListApi";
import FollowUserApi from "../../api/blog-services/follow/FollowUserApi";
import UnfollowUserApi from "../../api/blog-services/follow/UnfollowUserApi";

const FollowingListPage = () => {
  const [followers, setFollowers] = useState([]); // 팔로잉 목록 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 팔로잉 수
  const [page, setPage] = useState(1); // 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태
  const location = useLocation();
  // const { userId } = location.state || {}; // 다른 페이지에서 전달된 userId
  const [isFollowing, setIsFollowing] = useState(false);

  const userId= 3;
  // 데이터 가져오기
  const fetchFollowings = async () => {
    setLoading(true);
    try {
      const response = await GetFollowingListApi(userId); // API 호출
      if (response.status === 200) {
        // 서버에서 반환된 데이터에 targetUserId 추가
        const data = response.data.map((follower) => ({
          ...follower, // 기존 필드 유지
          targetUserId: follower.userId, // userId를 targetUserId로 매핑
        }));
        setFollowers((prev) => [...prev, ...data]); // 이전 데이터에 새 데이터 추가
        setTotalCount((prev) => prev + data.length); // 총 팔로잉 수 누적
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // 팔로우 버튼 클릭
  const handleFollowClick = async (targetUserId) => {
    try {
      const response = await FollowUserApi(targetUserId);
      if (response.status === 200) {
        setFollowers((prev) =>
          prev.map((follower) =>
            follower.targetUserId === targetUserId
              ? { ...follower, isFollowing: true }
              : follower
          )
        );
      }
    } catch (error) {
      console.error("팔로우 실패:", error);
    }
  };

  // 언팔로우 버튼 클릭
  const handleUnfollowClick = async (targetUserId) => {
    try {
      const response = await UnfollowUserApi(targetUserId);
      if (response.status === 200) {
        setFollowers((prev) =>
          prev.map((follower) =>
            follower.targetUserId === targetUserId
              ? { ...follower, isFollowing: false }
              : follower
          )
        );
      }
    } catch (error) {
      console.error("언팔로우 실패:", error);
    }
  };

  // 무한 스크롤 핸들러
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      !loading
    ) {
      setPage((prev) => prev + 1); // 페이지 번호 증가
    }
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  // 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    fetchFollowings();
  }, [page]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white">
      {/* 총 팔로우 수 */}
      <h1 className="text-xl font-bold mb-6 mt-8">
        <span className="text-black font-extrabold">{totalCount}</span>명을 팔로우 중
      </h1>

      {/* 팔로잉 목록 */}
      <div className="space-y-4">
        {followers.map((follower) => (
          <div
            key={follower.userId}
            className="flex justify-between items-center border-b pb-4"
          >
            {/* 유저 정보 */}
            <div className="flex items-center space-x-4">
              <img
                src={follower.profileImage}
                alt="프로필 이미지"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-black">{follower.nickname}</p>
                <p className="text-gray-500">@{follower.targetUserId}</p>
              </div>
            </div>

            {/* 팔로우/언팔로우 버튼 */}
            {isFollowing ? (
              <button
                onClick={() => handleUnfollowClick(follower.targetUserId)}
                className="text-red-500 border border-red-500 px-4 py-1 rounded-full hover:bg-red-100"
              >
                언팔로우
              </button>
            ) : (
              <button
                onClick={() => handleFollowClick(follower.targetUserId)}
                className="text-blue-500 border border-blue-500 px-4 py-1 rounded-full hover:bg-blue-100"
              >
                팔로우
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center text-gray-500 mt-4">로딩 중...</div>
      )}
    </div>
  );
};

export default FollowingListPage;
