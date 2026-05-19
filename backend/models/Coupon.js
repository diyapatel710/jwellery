import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    discount: {
        type: Number,
        required: true
    },

    minAmount: {
        type: Number,
        default: 0
    },

    used: {
        type: Number,
        default: 0
    },

    limit: {
        type: Number,
        default: 100
    },

    expiry: {
        type: Date,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;