import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md flex justify-between items-center px-6">
      <div className="flex-1 text-center">
        <Link to="/movies" className="text-2xl font-bold hover:text-red-400">
          🎬 MovieTime
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <FaUserCircle className="text-2xl cursor-pointer" onClick={() => navigate("/profile")} />
        <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
