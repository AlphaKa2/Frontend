import axios from 'axios';

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

/**
 * Fetch registered trips
 * @returns {Promise} - Axios response
 */
export const fetchRegisteredTrips = async () => {
  const accessToken = localStorage.getItem('accessToken');
  return axios.get('http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/api/travels/all', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-User-Id': '1',
      'X-User-Role': 'admin',
      'X-User-Profile': 'profile_data',
      'X-User-Nickname': 'nickname',
    },
  });
};

/**
 * Fetch completed trips
 * @returns {Promise} - Axios response
 */
export const fetchCompletedTrips = async () => {
  const accessToken = localStorage.getItem('accessToken');
  return axios.get('http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/recommendations/completed', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-User-Id': '1',
      'X-User-Role': 'admin',
      'X-User-Profile': 'profile_data',
      'X-User-Nickname': 'nickname',
    },
  });
};