import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number
    }],
    total: Number,
    status: { type: String, default: 'pending' },

    deliveryStatus: {
        type: String,
        default: 'Processing'
    },
    refundStatus: {
        type: String,
        default: "Not Refunded"
    },
    deliveredAt: Date,
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);