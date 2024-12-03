// src/api/invitations.js

/**
 * 친구 초대 API 호출 함수
 * @param {string} nickname - 초대하려는 사용자의 닉네임
 * @returns {Promise<Object>} - API 응답 데이터
 */
export const inviteFriend = async (nickname) => {
    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      });
  
      if (!response.ok) {
        throw new Error('초대 요청에 실패했습니다.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('친구 초대 API 오류:', error);
      throw error;
    }
  };
  
  /**
   * 닉네임으로 친구 검색 API 호출 함수
   * @param {string} nickname - 검색하려는 닉네임
   * @returns {Promise<Object>} - API 응답 데이터
   */
  export const searchFriend = async (nickname) => {
    try {
      const response = await fetch(`/api/friend/search?nickname=${nickname}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('닉네임 검색 요청에 실패했습니다.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('닉네임 검색 API 오류:', error);
      throw error;
    }
  };
  