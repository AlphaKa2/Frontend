import axiosInstance from '../axios';

// 참여자 목록 보기
export const participantsList = async (travelId) => {
    try {
      const response = await axiosInstance.get(`travel-service/auth/api/participants/${travelId}`);
      return response.data.data; 
    } catch (error) {
      console.error('Error to get participants:', error);
      throw error;
    }
  };

// 참여자 권한 변경
export const updateParticipantPermission = async (participantId, permission) => {
  try {
    const response = await axiosInstance.put('travel-service/auth/api/participants', {
      participantId,
      permission,
    }); // PUT 요청
    return response.data; // 서버 응답 반환
  } catch (error) {
    console.error('Error updating participant permission:', error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

// 참여자 삭제
export const deleteParticipants = async (participantId) => {
  try {
    const response = await axiosInstance.delete(`travel-service/auth/api/participants/${participantId}`);
    return response.data.data; 
  } catch (error) {
    console.error('Error to get participants:', error);
    throw error;
  }
};
