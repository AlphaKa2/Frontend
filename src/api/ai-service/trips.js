import axios from 'axios';
import axiosInstance from '../axios'; // 상대 경로 주의

/**
 * Fetch unregistered trips
 * @returns {Promise} - Axios response
 */
export const fetchUnregisteredTrips = async () => {
  const accessToken = localStorage.getItem('accessToken');
  return axios.get('http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations/all', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-User-Id': '1',
      'X-User-Role': 'admin',
      'X-User-Profile': 'profile_data',
      'X-User-Nickname': 'nickname',
    },
  });
};



export const fetchRegisteredTrips = async () => {
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImlkIjozLCJuaWNrbmFtZSI6ImltVGhpcmQiLCJwcm9maWxlIjoiaHR0cHM6Ly9hbHBoYWthLXN0b3JhZ2UuczMuYW1hem9uYXdzLmNvbS9wcm9maWxlLzgwOTI0MDk5LTkyMjAtNGI4Mi05ZjQ5LTI4MzMyYWU2YmI1M2RlZmF1bHRQcm9maWxlIiwicm9sZSI6IlVTRVIiLCJleHAiOjE3MzM2NDEzMjR9.sNFp-3O5K8TkzvM32b0TBZBjoHMXJSiFxR9eF34Q5qzd9B3YnKfRRicr6HBJLGyqdJYMx1hzl-kp6ExRsUovzA';
  try {
    const response = await axiosInstance.get('travel-service/auth/api/travels/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('API Response:', response); // 응답 구조 확인
    const plannedTrips = response.data?.data?.filter((trip) => trip.status === 'PLANNED');
    return plannedTrips || [];
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error; // 에러를 호출자에게 전달
  }
};



/**
 * Fetch completed trips
 * @returns {Promise} - Axios response
 */
export const fetchCompletedTrips = async () => {
  const accessToken = '<유효한 토큰>';
  try {
    const response = await axiosInstance.get('travel-service/auth/api/travels/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Response Status:', response.status); 
    console.log('Response Data:', response.data);

    const trips = response.data?.data || [];
    const completedTrips = trips.filter((trip) => trip.status === 'COMPLETED');
    return completedTrips;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Unexpected Error:', error.message);
    }
    return [];
  }
};