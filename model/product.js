const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    price: { type: Number },
    description: { type: String },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    reviews: { type: Array, default: [] },
    quantity: { type: Number },
  },
  {
    collection: "product",
  }
);

const model = mongoose.model("ProductSchema", ProductSchema);

module.exports = model;
