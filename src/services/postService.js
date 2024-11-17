const twitter = require('../api/x');
const facebook = require('../api/facebook');
const instagram = require('../api/instagram');
const tiktok = require('../api/tiktok');

exports.createPost = async (data) => {
    const { message } = data;
    
    
    await twitter.post(message);
    await facebook.post(message);
    await instagram.post(message);
    await tiktok.post(message);

    return { message, posted: true };
};
