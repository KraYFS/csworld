import mongoose from "mongoose";

const Assemblies = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Object, required: true },
    pictures: { type: Array, required: true },
    systemRequirements: {type: String, required: true},
    assemblyFeatures: {type: String, required: true},
    description: {type: String, required: true}
})

export default mongoose.model('Assemblies', Assemblies)