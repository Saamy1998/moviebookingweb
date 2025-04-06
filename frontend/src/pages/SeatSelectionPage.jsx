import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SeatSelector from "../components/SeatSelector";

const SeatSelectionPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBooking = (selectedSeats) => {
    navigate("/payment", {
      state: {
        ...state,
        selectedSeats,
        totalPrice: selectedSeats.length * 200,
      },
    });
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-700 text-white rounded">
        ⬅ Back to Movie Details
      </button>
      <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
      <SeatSelector onBookingComplete={handleBooking}/>
    </div>
  );
};

export default SeatSelectionPage;
