const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    status: { type: String, default: "Active" },
    fcm: { type: String, default: "" },
  },
  {
    collection: "user",
  }
);

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
