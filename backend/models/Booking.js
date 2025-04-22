import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieTitle: { type: String, required: true },
  theater: { type: String, required: true },
  time: { type: String, required: true },
  seats: { type: [String], required: true },
  date: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;