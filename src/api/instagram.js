import axios from 'axios';

const instagram = {
  postToInstagram: async (accessToken, imageUrl, caption) => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v10.0/me/media`,
        {
          image_url: imageUrl,
          caption: caption,
          access_token: accessToken,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Error posting to Instagram: ' + error.message);
    }
  },
};

export default instagram;
