import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { state } = useLocation();
  const { movieTitle, theater, time, selectedSeats, totalPrice } = state || {};
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment Successful!\nMovie: ${movieTitle}\nTheater: ${theater}\nTime: ${time}\nSeats: ${selectedSeats.join(", ")}`);
    navigate("/movies");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-700 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Secure Payment</h2>
      <p className="text-white mb-4">
        Booking for <strong>{movieTitle}</strong> at <strong>{theater}</strong> on <strong>{time}</strong><br />
        Seats: <strong>{selectedSeats?.join(", ")}</strong><br />
        Total: ₹{totalPrice}
      </p>
      <form onSubmit={handlePayment} className="space-y-4 b-1">
        <input type="text" placeholder="Cardholder Name" required className="w-full p-2 border rounded" />
        <input type="text" placeholder="Card Number" required className="w-full p-2 border rounded" />
        <div className="flex gap-4">
          <input type="text" placeholder="MM/YY" required className="w-1/2 p-2 border rounded" />
          <input type="text" placeholder="CVV" required className="w-1/2 p-2 border rounded" />
        </div>
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
