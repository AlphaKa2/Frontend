import axios from '../axios'; // 상대 경로 수정


/**
 * 유튜브 링크를 백엔드로 전송하여 처리하는 함수
 * @param {string} youtubeLink - 사용자가 입력한 유튜브 링크
 * @param {number} userId - 사용자 ID
 * @returns {Promise<object>} - 백엔드에서 반환된 응답
 */
export const processYoutubeLink = async (youtubeLink, userId) => {
  try {
    // 기본 API 요청
    const response = await axios.post(
      'http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8001/process-url',
      null,
      {
        params: { url: youtubeLink, user_id: userId },
      }
    );

    // 리다이렉션 상태 처리
    if (response.status === 307) {
      const redirectUrl = response.headers.location; // 리다이렉션 URL 가져오기
      const redirectResponse = await axios.post(redirectUrl, {
        url: youtubeLink,
        user_id: userId,
      });
      return redirectResponse;
    }

    return response; // 기본 응답 반환
  } catch (error) {
    throw new Error(`유튜브 링크 처리 중 오류 발생: ${error.message}`);
  }
};
