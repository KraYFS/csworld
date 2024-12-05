import mongoose from "mongoose";

const Post = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: Array, required: true },
    postText: { type: String, required: true },
    pictures: { type: Array, require: true },
    description: { type: String },
    files: { type: Array, required: true },
    titleSecondLang: { type: String, required: true },
    descriptionSecondLang: { type: String },
    tagsSecondLang: { type: Array, require: true },
    authorSecondLang: { type: String, required: true },
    postTextSecondLang: { type: String, required: true }
})

export default mongoose.model('Post', Post)