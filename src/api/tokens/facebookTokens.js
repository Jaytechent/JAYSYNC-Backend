import dotenv from 'dotenv';
import storage from 'node-persist';
import axios from 'axios';

dotenv.config();

await storage.init();

const facebookToken = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Email is required to authenticate with Facebook.');
  }

  try {
    // Generate Facebook OAuth URL
    // const redirectUri = `${process.env.FACEBOOK_CALLBACK_URL}?email=${encodeURIComponent(email)}`;
    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(process.env.FACEBOOK_CALLBACK_URL)}&state=${email}`;

    // Store email in node-persist for managing session state
    await storage.setItem(email, { initialized: true });

    // Send the auth URL to the frontend
    res.status(200).json({
      authUrl
    });

    console.log("Facebook OAuth URL generated for:", email);

  } catch (error) {
    console.error('Error initiating Facebook auth:', error);
    res.status(500).send('Facebook authentication initiation failed.');
  }
};

export default facebookToken;
