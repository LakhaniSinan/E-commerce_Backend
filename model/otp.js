const mongoose = require("mongoose")

const OtpSchema = new mongoose.Schema({
    email: { type: String },
    otp: { type: String },
    expiresIn: { type: String }
},{
    collection:"Otp"
})

const model = mongoose.model("OtpSchema",OtpSchema)

module.exports = model