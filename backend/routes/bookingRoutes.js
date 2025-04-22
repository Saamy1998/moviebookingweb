import express from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a booking
router.post("/", protect, async (req, res) => {
  const { movieTitle, theater, time, seats } = req.body;

  try {
    const existingBookings = await Booking.find({ movieTitle, theater, time });
    const alreadyBookedSeats = existingBookings.flatMap((booking) => booking.seats);

    const conflictSeats = seats.filter((seat) => alreadyBookedSeats.includes(seat));
    if (conflictSeats.length > 0) {
      return res.status(400).json({
        message: `The following seats are already booked: ${conflictSeats.join(", ")}`,
      });
    }

    const newBooking = new Booking({
      userId: req.user.userId,
      movieTitle,
      theater,
      time,
      seats,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Route to fetch booked seats
router.get("/booked-seats", async (req, res) => {
  const { movieTitle, theater, time } = req.query;

  try {
    const bookings = await Booking.find({ movieTitle, theater, time });
    const bookedSeats = bookings.flatMap((booking) => booking.seats);
    res.json(bookedSeats);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;