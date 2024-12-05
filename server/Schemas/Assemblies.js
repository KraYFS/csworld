import mongoose from "mongoose";

const Assemblies = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Object, required: true },
    pictures: { type: Array, required: true },
    systemRequirements: { type: String, required: true },
    assemblyFeatures: { type: String, required: true },
    description: { type: String },
    files: { type: Array, required: true },
    titleSecondLang: { type: String, required: true },
    descriptionSecondLang: { type: String },
    tagsSecondLang: { type: Array, require: true },
    systemRequirementsSecondLang: { type: String, required: true },
    assemblyFeaturesSecondLang: { type: String, required: true }
})

export default mongoose.model('Assemblies', Assemblies)