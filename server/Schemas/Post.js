import mongoose from "mongoose";

const Post = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: Array, required: true },
    postText: { type: String, required: true },
    pictures: { type: Array, require: true }
})

export default mongoose.model('Post', Post)