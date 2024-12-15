import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { followState } from "../../../recoil/atoms/followState";
import GetFollowingListApi from "../../../api/blog-services/follow/GetFollowingListApi";
import FollowUserApi from "../../../api/blog-services/follow/FollowUserApi";
import UnfollowUserApi from "../../../api/blog-services/follow/UnfollowUserApi";

const FollowingListPage = () => {
  const [followings, setFollowings] = useState([]); // 팔로잉 목록 데이터
  const [totalCount, setTotalCount] = useState(0); // 총 팔로잉 수
  const [page, setPage] = useState(1); // 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [globalFollowState, setGlobalFollowState] = useRecoilState(followState);

  const location = useLocation();
  const targetUserId = 3;

  // 팔로잉 목록 가져오기
  const fetchFollowings = async () => {
    setLoading(true);
    try {
      const { status, data } = await GetFollowingListApi(targetUserId);
      if (status === 200) {
        setFollowings(data);
        setTotalCount(data.length);

        // 전역 상태 초기화
        setGlobalFollowState((prevState) => {
          const newState = { ...prevState };
          data.forEach((following) => {
            if (newState[following.userId] === undefined) {
              newState[following.userId] = following.followStatus;
            }
          });
          return newState;
        });
      }
    } catch (error) {
      console.error("팔로잉 목록 가져오기 실패", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 팔로우 버튼 클릭
  const handleFollowClick = async (userId) => {
    setGlobalFollowState((prevState) => ({
      ...prevState,
      [userId]: true,
    }));

    try {
      const response = await FollowUserApi(userId);
      if (response.status !== 200) {
        throw new Error("팔로우 요청 실패");
      }
    } catch (error) {
      console.error("팔로우 실패:", error.message);
      alert("팔로우 요청 중 오류가 발생했습니다.");
      setGlobalFollowState((prevState) => ({
        ...prevState,
        [userId]: false,
      }));
    }
  };

  // 언팔로우 버튼 클릭
  const handleUnfollowClick = async (userId) => {
    setGlobalFollowState((prevState) => ({
      ...prevState,
      [userId]: false,
    }));

    try {
      const response = await UnfollowUserApi(userId);
      if (response.status !== 200) {
        throw new Error("언팔로우 요청 실패");
      }
    } catch (error) {
      console.error("언팔로우 실패:", error.message);
      alert("언팔로우 요청 중 오류가 발생했습니다.");
      setGlobalFollowState((prevState) => ({
        ...prevState,
        [userId]: true,
      }));
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
      {/* 총 팔로잉 수 */}
      <h1 className="text-xl font-bold mb-6 mt-20">
        <span className="text-black font-extrabold">{totalCount}</span>명을 팔로우 중
      </h1>

      {/* 팔로잉 목록 */}
      <div className="space-y-4">
        {followings.map((following) => (
          <div
            key={following.userId}
            className="flex justify-between items-center border-b pb-4"
          >
            {/* 유저 정보 */}
            <div className="flex items-center space-x-4">
              <img
                src={following.profileImage}
                alt="프로필 이미지"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-black">{following.nickname}</p>
                <p className="text-gray-500">@{following.userId}</p>
              </div>
            </div>

            {/* 팔로우/언팔로우 버튼 */}
            {globalFollowState[following.userId] ? (
              <button
                onClick={() => handleUnfollowClick(following.userId)}
                className="text-red-500 border border-red-500 px-4 py-1 rounded-full hover:bg-red-100"
              >
                언팔로우
              </button>
            ) : (
              <button
                onClick={() => handleFollowClick(following.userId)}
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
