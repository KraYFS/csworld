import mongoose from "mongoose";

const WeaponModel = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Object, required: true },
    pictures: { type: Array, required: true },
    description: {type: String, required: true}
})

export default mongoose.model('WeaponModel', WeaponModel)