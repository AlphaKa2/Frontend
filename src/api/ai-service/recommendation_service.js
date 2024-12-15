import axios from "./axios"; // baseURL 설정된 axios 가져오기

// 여행 추천 생성 요청
export const createRecommendation = async (requestData, headers) => {
  try {
    const response = await axios.post("http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations", requestData, {
      headers: {
        "X-User-Id": headers.userId,
        "X-User-Role": headers.userRole,
        "X-User-Profile": headers.userProfile,
        "X-User-Nickname": headers.userNickname,
      },
    });
    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error creating recommendation:", error);
    throw error; // 호출한 쪽에서 에러 처리 가능
  }
};

// 알림 받기 (SSE)
export const subscribeToNotifications = (userId, callback) => {
  const eventSource = new EventSource(`http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations/notifications/${userId}`);
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data); // 알림 데이터를 처리할 콜백 함수 호출
  };
  eventSource.onerror = () => {
    console.error("Error with notification subscription");
    eventSource.close();
  };
  return eventSource; // 필요 시 호출한 쪽에서 연결 종료 가능
};