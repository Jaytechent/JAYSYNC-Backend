import axios from 'axios';

const tiktok = {
  postToTikTok: async (accessToken, videoData) => {
    try {
      const response = await axios.post(
        'https://open-api.tiktok.com/video/create/', 
        videoData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Error posting to TikTok: ' + error.message);
    }
  },
};

export default tiktok;
