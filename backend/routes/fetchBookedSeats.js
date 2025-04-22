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