import mongoose from "mongoose";

const Maps = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Object, required: true },
    pictures: { type: Array, required: true },
    description: {type: String, required: true},
    systemRequirements: {type: String, required: true},
    assemblyFeatures: {type: String, required: true},
    files: {type: Array, required: true},
    titleSecondLang: {type: String, required: true},
    descriptionSecondLang: {type: String, required: true},
    tagsSecondLang: { type: Array, require: true },
    systemRequirementsSecondLang: {type: String, required: true},
    assemblyFeaturesSecondLang: {type: String, required: true}
})

export default mongoose.model('Maps', Maps)