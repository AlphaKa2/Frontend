import axiosInstance from '../axios'; // 상대 경로 주의

export const registerTravel = async (requestData) => {
  try {
    // 서버에서 발급받은 유효한 액세스 토큰
    const accessToken =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjozLCJuaWNrbmFtZSI6ImltVGhpcmQiLCJwcm9maWxlIjoiL2ltZy9kZWZhdWx0Iiwicm9sZSI6IlVTRVIiLCJleHAiOjE3MzMyODIzODV9.oSMke2iW3h7eMlzIfjtdhcv0vuqzLBzJ_rMUOUe0DuFinCjvdztTWHuwa3pZ-To0KuIkIHbGsJRErmuJR8celQ';

    const response = await axiosInstance.post(
      'travel-service/auth/api/travels',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer 뒤에 유효한 토큰 추가
        },
      }
    );

    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    console.error('Error registering travel:', error.response?.data || error.message);
    throw error; // 호출한 쪽에서 에러 처리하도록 전달
  }
};
