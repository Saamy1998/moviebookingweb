// filepath: d:\guvi\movie_booking_app\frontend\src\pages\BookingsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("/api/bookings/user", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setBookings(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="border p-4 mb-4 rounded shadow">
            <p><strong>Movie:</strong> {booking.movieTitle}</p>
            <p><strong>Theater:</strong> {booking.theater}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingsPage;