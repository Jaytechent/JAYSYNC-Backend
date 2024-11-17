import { TwitterApi } from 'twitter-api-v2';
import storage from 'node-persist';
import dotenv from 'dotenv';

dotenv.config();

const twitter = async (req, message) => {
  try {
    const email = req.user.email;
    const tokens = await storage.getItem(email);

    if (!tokens || !tokens.accessToken || !tokens.accessSecret) {
      throw new Error('User is not authenticated with Twitter');
    }

    const userClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET_KEY,
      accessToken: tokens.accessToken,
      accessSecret: tokens.accessSecret,
    });

    console.log('Tokens from storage:', tokens.accessToken, tokens.accessSecret);
    
    const tweet = await userClient.v2.tweet(message);
    console.log('Posted to Twitter:', tweet);
    return tweet;
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    throw error;
  }
};

export default twitter;


// postTweet.js
// import User from '../models/User.js';
// import { TwitterApi } from 'twitter-api-v2';

// const postTweet = async (userEmail, message) => {
//   try {
//     const user = await User.findOne({ email: userEmail });
//     if (!user || !user.twitterToken || !user.twitterSecret) {
//       throw new Error('Twitter tokens not found for user.');
//     }

//     const twitterClient = new TwitterApi({
//       appKey: process.env.TWITTER_API_KEY,
//       appSecret: process.env.TWITTER_API_SECRET_KEY,
//       accessToken: user.twitterToken,
//       accessSecret: user.twitterSecret,
//     });

//     const tweet = await twitterClient.v2.tweet(message);
//     console.log('Posted to Twitter:', tweet);
//     return tweet;
//   } catch (error) {
//     console.error('Error posting to Twitter:', error);
//     throw error;
//   }
// };

// export default postTweet;
