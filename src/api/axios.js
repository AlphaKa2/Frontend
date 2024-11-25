// src/axios.js
import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://172.16.210.54:31214', // API 기본 URL
  timeout: 30000, // 요청 타임아웃 (30000초)
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
  withCredentials: true
});

// Define LOGIN object at the top
const LOGIN = {
  MESSAGE: {
    EXPIRED: '세션이 만료되었습니다. 다시 로그인해주세요.',
    ETC: '에러 발생',
  },
};

//refresh token api
export async function postRefreshToken() {
  const response = await axios.post('/auth-service/reissue', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  return response;
}

//토큰을 함께보내는 privateApi에 interceptor를 적용합니다
axios.interceptors.response.use(
  // 200번대 응답이 올때 처리
  (response) => {
    return response;
  },
  // 200번대 응답이 아닐 경우 처리
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    
	//토큰이 만료되을 때
    if (status === 401) {
      if (error.response.data.message === 'Unauthorized') {
        const originRequest = config;
        //리프레시 토큰 api
        const response = await postRefreshToken();
        //리프레시 토큰 요청이 성공할 때
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          localStorage.setItem('accessToken', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          //진행중이던 요청 이어서하기
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
        } else if (response.status === 404) {
          alert(LOGIN.MESSAGE.EXPIRED);
        } else {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    }
    return Promise.reject(error);
  },
);




instance.interceptors.request.use(
  function (config) {
    // 로컬 스토리지에서 accessToken 가져오기
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    
    
    // accessToken이 존재하면 Authorization 헤더에 추가
    if (accessToken) {
      
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    // 변경된 config 반환
    return config;
  },
  function (error) {
    // 요청 오류가 있는 경우 처리
    return Promise.reject(error);
  }
);

export default instance;