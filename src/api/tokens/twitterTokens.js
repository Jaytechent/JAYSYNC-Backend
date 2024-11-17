import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import storage from '../../utils/storage.js';

dotenv.config();


const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  callback: process.env.CALLBACK_URL,
});

const twitterToken = async (req, res) => {
  const { email } = req.query; // Retrieve email from query parameters

  if (!email) {
    return res.status(400).send('Email is required to authenticate with Twitter.');
  }

  try {
    // Generate Twitter auth link and retrieve temporary OAuth tokens
    const callbackUrlWithEmail = `${process.env.CALLBACK_URL}?email=${encodeURIComponent(email)}`;
    const { url, oauth_token, oauth_token_secret } = await twitterClient.generateAuthLink(callbackUrlWithEmail);

    // Store email in node-persist
    await storage.setItem(email, { initialized: true });

    // Send the auth URL to the frontend
    res.status(200).json({
      authUrl: url, // Send the Twitter auth URL to the frontend
      oauth_token,  // Optionally send the oauth_token (if needed on the frontend)
      oauth_token_secret, // Optionally send the oauth_token_secret (if needed on the frontend)
    });

    console.log("Email stored in node-persist:", email);

  } catch (error) {
    console.error('Error initiating Twitter auth:', error);
    res.status(500).send('Authentication initiation failed.');
  }
};

export default twitterToken;






// import { TwitterApi } from 'twitter-api-v2';
// import dotenv from 'dotenv';

// dotenv.config();

// const twitterClient = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY,
//   appSecret: process.env.TWITTER_API_SECRET_KEY,
//   callback: process.env.CALLBACK_URL,
// });

// // The main function to initiate Twitter authentication
// const twitterToken = async (req, res) => {
//   try {
//     // Generate Twitter auth link and retrieve temporary OAuth tokens
//     const { url, oauth_token, oauth_token_secret } = await twitterClient.generateAuthLink(process.env.CALLBACK_URL);

//     // Store tokens and user email in the session
//     req.session.oauth_token = oauth_token;
//     req.session.oauth_token_secret = oauth_token_secret;
//     req.session.userEmail = req.user?.email; // Replace with the actual email source, if available

//     // Save the session and redirect
//     req.session.save((err) => {
//       if (err) {
//         console.error('Session save error:', err);
//         return res.status(500).send('Session save failed.');
//       }
//       res.redirect(url); // Redirect user to the Twitter authorization URL
//     });
//     console.log("Session saved with userEmail:", req.session.userEmail);
//   } catch (error) {
//     console.error('Error initiating Twitter auth:', error);
//     res.status(500).send('Authentication initiation failed.');
//   }
// };

// export default twitterToken;










