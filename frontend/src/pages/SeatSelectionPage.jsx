import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/bookings/booked-seats", {
          params: {
            movieTitle: state.movieTitle,
            theater: state.theater,
            time: state.time,
          },
        });
        setBookedSeats(data);
      } catch (err) {
        console.error("Error fetching booked seats:", err);
      }
    };

    fetchBookedSeats();
  }, [state.movieTitle, state.theater, state.time]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return; // Prevent selecting already booked seats
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          movieTitle: state.movieTitle,
          theater: state.theater,
          time: state.time,
          seats: selectedSeats,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      alert("Booking successful!");
      navigate("/movies"); // Redirect to movies page after booking
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const seats = Array.from({ length: 50 }, (_, i) => `Seat ${i + 1}`); // Example seat list

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded"
      >
        ⬅ Back to Movie Details
      </button>
      <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
      <div className="grid grid-cols-5 gap-4">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            disabled={bookedSeats.includes(seat)}
            className={`px-4 py-2 rounded ${
              bookedSeats.includes(seat)
                ? "bg-red-500 cursor-not-allowed"
                : selectedSeats.includes(seat)
                ? "bg-green-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>
      <button
        onClick={handleBooking}
        disabled={selectedSeats.length === 0}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-500"
      >
        Book Now
      </button>
    </div>
  );
};

export default SeatSelectionPage;