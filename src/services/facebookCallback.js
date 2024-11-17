import axios from 'axios';
import dotenv from 'dotenv';
import storage from 'node-persist';

dotenv.config();

await storage.init();

const facebookCallback = async (req, res) => {
  const { code, email } = req.query;

  if (!code || !email) {
    console.error("Code or email is missing; unable to proceed with Facebook authentication.");
    return res.status(400).send("Code and email are required in callback.");
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await axios.get("https://graph.facebook.com/v12.0/oauth/access_token", {
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
        code,
      },
    });

    const facebookAccessToken = tokenResponse.data.access_token;

    if (!facebookAccessToken) {
      console.error("Failed to retrieve Facebook access token.");
      return res.status(500).send("Facebook authentication failed.");
    }

    console.log("Facebook Access Token:", facebookAccessToken);

    // Store the access token in node-persist
    await storage.setItem(email, { facebookAccessToken });
    console.log("Facebook access token stored successfully for:", email);

    // Notify the frontend of success
    res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage("success", "*");
          window.close();
        } else {
          console.error("No opener window found");
        }
      </script>
    `);
  } catch (error) {
    console.error("Error exchanging Facebook code for access token:", error);
    res.send(`
      <script>
        localStorage.setItem("facebook_auth_status", "failed");
        window.close();
      </script>
    `);
  }
};

export default facebookCallback;
