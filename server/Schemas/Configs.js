import mongoose from "mongoose";

const Configs = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Object, required: true },
    pictures: { type: Array, required: true },
    description: {type: String, required: true},
    systemRequirements: {type: String, required: true},
    assemblyFeatures: {type: String, required: true},
})

export default mongoose.model('Configs', Configs)