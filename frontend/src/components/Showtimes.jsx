import React from "react";
import { useNavigate } from "react-router-dom";

// Mock showtimes
const mockTheaters = [
  { name: "PVR Cinemas", times: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"] },
  { name: "INOX", times: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM"] },
];

const Showtimes = ({ movieTitle }) => {
  const navigate = useNavigate();

  const handleTimeClick = (theater, time) => {
    navigate("/select-seats", {
      state: {
        movieTitle,
        theater,
        time,
      },
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Showtimes for {movieTitle}</h3>
      {mockTheaters.map((theater, idx) => (
        <div key={idx} className="mb-4">
          <h4 className="text-xl font-semibold">{theater.name}</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {theater.times.map((time, i) => (
              <button
                key={i}
                onClick={() => handleTimeClick(theater.name, time)}
                className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Showtimes;
