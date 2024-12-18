// src/api/travel-service/invitations.js

import axiosInstance from '../axios'; // axios 인스턴스 가져오기

export const sendInvitation = async (travelId, nickname) => {
  try {
    const response = await axiosInstance.post('travel-service/auth/api/invitations', {
      travelId: travelId,
      nickname: nickname,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending invitation:', error);
    throw error;
  }
};


// 지워야함. 초대한 목록 가져오기
export const fetchInvitations = async () => {
  try {
    const response = await axiosInstance.get('travel-service/auth/api/invitations/${travel}'); // GET 요청
    return response.data; // 데이터 반환
  } catch (error) {
    console.error('Error fetching invitations:', error); // 에러 로그
    throw error; // 에러 던지기
  }
};

// 초대한 목록 가져오기
export const fetchSentInvitations = async (travelId) => {
  try {

    const response = await axiosInstance.get(
      `/travel-service/auth/api/invitations/${travelId}`,
      {
        headers: {
          skipAuthHandler: true, // 401 에러 무시
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching sent invitations:", error);
    throw error; // UI에서 별도로 처리
  }
};


// 초대받은 목록 가져오기
export const gotInvitations = async () => {
  try {
    const response = await axiosInstance.get('travel-service/auth/api/invitations'); // GET 요청
    return response.data.data; // 응답의 data 필드만 반환 (배열 형태)
  } catch (error) {
    console.error('Error to get invitations:', error); // 에러 로그
    throw error; // 에러 던지기
  }
};

//초대 상태 변경
export const updateInvitationStatus = async (travelId, newStatus) => {
  try {
    // travelId는 문자열로 전송
    const response = await axiosInstance.put('travel-service/auth/api/invitations', {
      travelId: String(travelId),
      invitationStatus: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating invitation status:', error);
    throw error;
  }
};