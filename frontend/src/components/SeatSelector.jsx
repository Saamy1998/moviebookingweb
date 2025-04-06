import React, { useState } from "react";

const rows = 5;
const cols = 10;

const SeatSelector = ({ onBookingComplete }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleBookNow = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    onBookingComplete(selectedSeats);
  };

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: rows * cols }, (_, i) => {
          const seat = `S${i + 1}`;
          const isSelected = selectedSeats.includes(seat);
          const isReserved = i % 13 === 0; // mock reserved seat

          return (
            <button
              key={seat}
              disabled={isReserved}
              onClick={() => toggleSeat(seat)}
              className={`w-10 h-10 rounded ${
                isReserved
                  ? "bg-gray-500 cursor-not-allowed"
                  : isSelected
                  ? "bg-green-500"
                  : "bg-blue-600"
              } text-white`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <h4 className="font-semibold">Selected Seats:</h4>
        <p>{selectedSeats.join(", ") || "None"}</p>
        <p className="mt-2">Total Price: ₹{selectedSeats.length * 200}</p>
        <button onClick={handleBookNow} className="mt-4 bg-green-600 px-4 py-2 rounded text-white">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SeatSelector;
