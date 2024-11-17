
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
