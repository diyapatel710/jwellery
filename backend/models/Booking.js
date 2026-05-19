import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {},
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);