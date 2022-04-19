const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
}, {
    collection: "category"
})

const model = mongoose.model("CategorySchema", CategorySchema)

module.exports = model