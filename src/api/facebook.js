import pkg from 'fb'; 
const { Facebook } = pkg; 
import dotenv from 'dotenv';
dotenv.config();

const facebookClient = new Facebook({
  appId: process.env.FACEBOOK_APP_ID, 
  appSecret: process.env.FACEBOOK_APP_SECRET, 
});

const facebook = async (token, message) => {
  facebookClient.setAccessToken(token);

  return new Promise((resolve, reject) => {
    facebookClient.api('/me/feed', 'POST', { message }, (response) => {
      if (!response || response.error) {
        reject(response ? response.error : 'Error posting to Facebook');
      } else {
        resolve(response);
      }
    });
  });
};

export default facebook;


// import pkg from 'fb'; // Import the default export
// const { Facebook } = pkg; 

// const facebookClient = new Facebook({
//   appId: process.env.FACEBOOK_APP_ID, // Your App ID
//   appSecret: process.env.FACEBOOK_APP_SECRET, // Your App Secret
// });

// const facebook = async (accessToken, message) => {
//   try {
//     const response = await facebookClient.api(
//       '/me/feed',
//       'POST',
//       { message, access_token: accessToken }
//     );
//     return response;
  
//   } catch (error) {
//     throw new Error('Error posting to Facebook: ' + error.message);
//   }
// };

// export default facebook; 
