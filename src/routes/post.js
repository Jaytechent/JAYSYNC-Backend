// import { Router } from 'express';
// import createPost from '../lib/post/createpost.js'; 
// import authVerify from '../api/v1/auth/authVerify.js';
// import twitterToken from '../api/tokens/twitterTokens.js';
// import { TwitterApi } from 'twitter-api-v2'; 
// import dotenv from 'dotenv'; 

// dotenv.config();

// const twitterClient = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY,
//   appSecret: process.env.TWITTER_API_SECRET_KEY,
//   callback: process.env.CALLBACK_URL,
// });

// const router = Router();


// router.get('/auth/twitter', twitterToken);


// router.get('/auth/twitter/callback', async (req, res) => {
//   const { oauth_token, oauth_verifier } = req.query;
  
//   console.log("Session oauth_token:", req.session.oauth_token);
//     console.log("Callback oauth_token:", oauth_token);
//   try {
//     const { oauth_token: requestToken } = req.session;

//     if (!oauth_token || !oauth_verifier || oauth_token !== requestToken) {
//       return res.status(400).send('Invalid or expired tokens.');
//     }

//     // Obtain access tokens using Twitter's API
//     const { accessToken, accessSecret } = await twitterClient.login(oauth_token, oauth_verifier);


   
//     req.session.accessToken = accessToken;
//     req.session.accessSecret = accessSecret;
    

//     const userEmail = req.session.userEmail; 
//         await User.findOneAndUpdate(
//             { email: userEmail }, // Find the user by email or another unique identifier
//             { twitterToken: accessToken, twitterSecret: accessSecret }, // Save the tokens to the user document
//             { new: true } // Return the updated document
//         );

//     res.send('Authentication successful! You can now post tweets on behalf of the user.');
//   } catch (error) {
//     console.error('Twitter callback error:', error);
//     res.status(500).send('Callback authentication failed.');
//   }
// });


// router.post('/posts', authVerify, createPost);

// export default router;


















import { Router } from 'express';
import createPost from '../lib/post/createpost.js'; 
import authVerify from '../api/v1/auth/authVerify.js';
import twitterToken from '../api/tokens/twitterTokens.js';
import facebookToken from '../api/tokens/facebookTokens.js';
import twitterCallback from '../services/twittercallback.js';
import  facebookCallback from '../services/facebookCallback.js';
const router = Router();

router.post('/posts', authVerify, createPost); 
router.get('/auth/twitter',  twitterToken)
router.get('/auth/facebook',  facebookToken)
router.get('/auth/twitter/callback', twitterCallback);
router.get('/auth/facebook/callback', facebookCallback);
export default router;
