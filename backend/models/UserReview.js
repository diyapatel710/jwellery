import mongoose from "mongoose";

const userReviewSchema = new mongoose.Schema(
    {
        productId: String,
        orderId: String,
        userEmail: String,
        userName: String,
        rating: Number,
        comment: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "UserReview",
    userReviewSchema
);