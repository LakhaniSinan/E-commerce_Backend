const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    order: { type: Array, default: [] },
    userId: { type: String },
    orderId: { type: String },
    address: { type: String },
    totalBill: { type: Number },
    review: { type: String },
    discount: { type: String, default: 0 },
    status: { type: String, default: "Pending" },
    city: { type: String },
    Date: { type: String }
}, {
    collection: "orders"
})

const model = mongoose.model("OrderSchema", OrderSchema)

module.exports = model