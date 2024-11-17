import Post from '../../models/post.js';
import twitter from '../../api/x.js';
import facebook from '../../api/facebook.js';
import instagram from '../../api/instagram.js';
import tiktok from '../../api/tiktok.js';

const createPost = async (req, res) => {
    const { message, platforms } = req.body;
    const userId = req.user.id;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message content is required' });
    }
    if (!Array.isArray(platforms) || platforms.length === 0) {
        return res.status(400).json({ error: 'At least one platform must be selected' });
    }

    const newPost = new Post({ message, platforms, userId });
    await newPost.save();

    const postPromises = platforms.map(async (platform) => {
        try {
            let result;
            switch (platform) {
                case 'twitter':
                    result = await twitter(req, message);
                    break;
                case 'facebook':
                    result = await facebook(req.user.accessToken, message);
                    break;
                case 'instagram':
                    result = await instagram.post(message);
                    break;
                case 'tiktok':
                    result = await tiktok.post(message);
                    break;
                default:
                    throw new Error(`Unsupported platform: ${platform}`);
            }
            return { platform, success: true, result };
        } catch (error) {
            console.error(`Error posting to ${platform}:`, error);
            return { platform, success: false, error: error.message };
        }
    });

    const results = await Promise.allSettled(postPromises);

    const successfulPosts = results.filter((result) => result.status === 'fulfilled' && result.value.success);
    const failedPosts = results.filter((result) => result.status === 'rejected' || !result.value.success);

    if (successfulPosts.length > 0) {
        res.status(201).json({
            message: failedPosts.length > 0 ? 'Post partially created' : 'Post created successfully on all platforms',
            data: { message, platforms, results: results.map(r => r.value || r.reason) },
        });
    } else {
        res.status(400).json({
            message: 'Post failed on all selected platforms',
            data: { message, platforms, results: results.map(r => r.value || r.reason) },
        });
    }
};

  export default createPost;

// import Post from '../../models/post.js';
// import twitter from '../../api/x.js';
// import facebook from '../../api/facebook.js';
// import instagram from '../../api/instagram.js';
// import tiktok from '../../api/tiktok.js';
// const createPost = async (req, res) => {
//     const { message, platforms } = req.body;
//     const userId = req.user.id;
//     console.log("Session data:", req.session);
//     console.log("Tokens stored:", req.session.oauth_token, req.session.oauth_token_secret);

//     try {
//         if (!message || typeof message !== 'string' || message.trim().length === 0) {
//             return res.status(400).json({ error: 'Message content is required' });
//         }
//         if (!Array.isArray(platforms) || platforms.length === 0) {
//             return res.status(400).json({ error: 'At least one platform must be selected' });
//         }

//         const newPost = new Post({ message, platforms, userId });
//         await newPost.save();

//         const results = [];
//         const errors = [];

//         // Attempt posting to each selected platform
//         for (const platform of platforms) {
//             try {
//                 let result;
//                 switch (platform) {
//                     case 'twitter':
//                         result = await twitter(req, message); // Pass `req` to access session data
//                         break;
//                     case 'facebook':
//                         result = await facebook(req.user.accessToken, message);
//                         break;
//                     case 'instagram':
//                         result = await instagram.post(message);
//                         break;
//                     case 'tiktok':
//                         result = await tiktok.post(message);
//                         break;
//                     default:
//                         throw new Error(`Unsupported platform: ${platform}`);
//                 }
//                 results.push({ platform, success: true, result });
//             } catch (error) {
//                 console.error(`Error posting to ${platform}:`, error);
//                 errors.push({ platform, success: false, error: error.message });
//             }
//         }

//         res.status(201).json({
//             message: errors.length === 0 ? 'Post created successfully on all platforms' : 'Post partially created',
//             data: { message, platforms, results, errors },
//         });
//     } catch (error) {
//         console.error('Error creating post:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// export default createPost;









