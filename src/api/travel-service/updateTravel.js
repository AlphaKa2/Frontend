import axios from "axios";
import axiosInstance from '../axios';

export const updateTravel = async (travelId, requestData) => {
  try {
    const response = await axiosInstance.put(`travel-service/auth/api/travels/${travelId}`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error updating travel:', error);
    throw error;
  }
};


