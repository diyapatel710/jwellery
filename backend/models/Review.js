import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    userName: {
        type: String,
        required: true,
        trim: true
    },

    rating: {
        type: Number,
        required: true,
        min: 0.5,
        max: 5
    },

    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    }

}, {
    timestamps: true
});


// Prevent duplicate review for same order
reviewSchema.index(
    { orderId: 1, productId: 1, userEmail: 1 },
    { unique: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;