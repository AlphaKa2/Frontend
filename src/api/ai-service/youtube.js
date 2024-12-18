import axios from 'axios';

export const processYoutubeLink = async (youtubeLink, userId) => {
  try {
    const response = await axios.post(

      'ai-service/auth/process-url',
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