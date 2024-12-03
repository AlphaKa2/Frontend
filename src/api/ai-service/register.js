// src/api/ai-service/register.js
import axiosInstance from '../../api/axios'; // axios 인스턴스 가져오기

export const registerTravel = async (requestData) => {
  try {
    const response = await axiosInstance.post('/api/travels', requestData);
    return response.data;
  } catch (error) {
    console.error('Error registering travel:', error);
    throw error;
  }
};
