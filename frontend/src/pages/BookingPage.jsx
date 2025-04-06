import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get('/api/bookings/user');
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    await axios.delete(`/api/bookings/${id}`);
    fetchBookings();
  };

  const downloadTicket = (booking) => {
    const blob = new Blob(
      [JSON.stringify(booking, null, 2)],
      { type: 'application/json' }
    );
    saveAs(blob, `ticket-${booking._id}.json`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="border p-4 mb-4 rounded shadow">
          <p><strong>Movie:</strong> {booking.movie}</p>
          <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
          <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
          <div className="mt-2 space-x-3">
            <button onClick={() => downloadTicket(booking)} className="px-3 py-1 bg-blue-500 text-white rounded">Download Ticket</button>
            <button onClick={() => cancelBooking(booking._id)} className="px-3 py-1 bg-red-600 text-white rounded">Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsPage;
