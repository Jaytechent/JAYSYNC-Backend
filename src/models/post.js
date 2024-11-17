import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    platforms: {
        type: [String],
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
