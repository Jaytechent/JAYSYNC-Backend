import got from 'got';
import qs from 'querystring';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import dotenv from 'dotenv';
import storage from '../utils/storage.js';

dotenv.config();

// Set up OAuth 1.0a client
const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_API_KEY,
    secret: process.env.TWITTER_API_SECRET_KEY,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

const twitterCallback = async (req, res) => {
  const { oauth_token, oauth_verifier, email } = req.query;
  // const email = req.query.email || req.session?.userEmail; // Retrieve email from query or session
  const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${oauth_verifier}&oauth_token=${oauth_token}`;

  // Generate OAuth headers
  const authHeader = oauth.toHeader(oauth.authorize({ url: path, method: 'POST' }));

  try {
    // Ensure email is available to store tokens
    if (!email) {
      console.error('Email is missing; unable to store access tokens.');
      return res.status(400).send('Email is required in callback.');
    }

    // Make the request to get the access token using `got`
    const response = await got.post(path, {
      headers: {
        Authorization: authHeader['Authorization'],
      },
    });

    // Parse the response to get access tokens
    const accessTokens = qs.parse(response.body);
    const accessToken = accessTokens.oauth_token;
    const accessSecret = accessTokens.oauth_token_secret;

    console.log('Access Token:', accessToken);
    console.log('Access Secret:', accessSecret);

    // Store the access tokens in node-persist using the email as the key
    await storage.setItem(email, { accessToken, accessSecret });
    console.log('Access tokens stored successfully for:', email);

    // Send success message to the frontend
    const success = true;
    res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage("${success ? 'success' : 'failed'}", "*");
          window.close();
        } else {
          console.error("No opener window found");
        }
      </script>
    `);
  } catch (error) {
    console.error('Error exchanging OAuth tokens:', error);
    res.send(`
      <script>
        localStorage.setItem("twitter_auth_status", "failed");
        window.close(); 
      </script>
    `);
  }
};

export default twitterCallback;



// import got from 'got';
// import qs from 'querystring';
// import OAuth from 'oauth-1.0a';
// import crypto from 'crypto';
// import dotenv from 'dotenv';
// import User from '../models/Users.js';

// dotenv.config();

// // Set up OAuth 1.0a client
// const oauth = OAuth({
//   consumer: {
//     key: process.env.TWITTER_API_KEY,
//     secret: process.env.TWITTER_API_SECRET_KEY,
//   },
//   signature_method: 'HMAC-SHA1',
//   hash_function(base_string, key) {
//     return crypto.createHmac('sha1', key).update(base_string).digest('base64');
//   },
// });

// const twitterCallback = async (req, res) => {
//   const { oauth_token, oauth_verifier } = req.query;
//   const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${oauth_verifier}&oauth_token=${oauth_token}`;


//   const userEmail = req.query.email || req.session.userEmail;
//   if (!userEmail) return res.status(400).send('User email is required.');
//   // Generate OAuth headers
//   const authHeader = oauth.toHeader(oauth.authorize({ url: path, method: 'POST' }));

//   try {
//     // Make the request to get the access token using `got`
//     const response = await got.post(path, {
//       headers: {
//         Authorization: authHeader['Authorization'],
//       },
//     });

//     const accessTokens = qs.parse(response.body);
//     const accessToken = accessTokens.oauth_token;
//     const accessSecret = accessTokens.oauth_token_secret;

//     console.log('Access Token:', accessToken);
//     console.log('Access Secret:', accessSecret);

//     const userEmail = req.query.email || req.session.userEmail;
//     if (!userEmail) return res.status(400).send('User email is required.');
    
//     await User.findOneAndUpdate(
//       { email: userEmail },
//       { twitterToken: accessToken, twitterSecret: accessSecret },
//       { new: true, upsert: true }
//     );

//     res.send('Authentication successful! You can now post tweets on behalf of the user.');
//   } catch (error) {
//     console.error('Error exchanging OAuth tokens:', error);
//     res.status(500).send('Callback authentication failed.');
//   }
// };

// export default twitterCallback;




// // twitterCallback.js
// import { TwitterApi } from 'twitter-api-v2';
// import User from '../models/Users.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const twitterClient = new TwitterApi({
//   appKey: process.env.TWITTER_API_KEY,
//   appSecret: process.env.TWITTER_API_SECRET_KEY,
// });

// const twitterCallback = async (req, res) => {
//   const { oauth_token, oauth_verifier } = req.query;
//   console.log('OAuth tokens received in callback:', { oauth_token, oauth_verifier });

//   try {
//     console.log('Session data at callback:', req.session);
//     const { accessToken, accessSecret } = await twitterClient.login(oauth_token, oauth_verifier);
//     console.log('Access Token:', accessToken);
//     console.log('Access Secret:', accessSecret);
//     console.log('ouath token during exchange:', oauth_token,);
//     const userEmail = req.query.email || req.session.userEmail;
//     if (!userEmail) return res.status(400).send('User email is required.');
// console.log('user email:', userEmail)
    
//     await User.findOneAndUpdate(
//       { email: userEmail },
//       { twitterToken: accessToken, twitterSecret: accessSecret },
//       { new: true, upsert: true }
//     );

//     res.send('Authentication successful! You can now post tweets on behalf of the user.');
//   } catch (error) {
//     console.error('Twitter callback error:', error);
//     res.status(500).send('Callback authentication failed.');
//   }
// };

// export default twitterCallback;
