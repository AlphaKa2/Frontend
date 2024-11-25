import axios from 'axios';

export const processYoutubeLink = async (youtubeLink, userId) => {
  try {
    const response = await axios.post(
      'http://ec2-13-125-174-132.ap-northeast-2.compute.amazonaws.com:8000/process-url',
      null,
      {
        params: { url: youtubeLink, user_id: userId },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};