import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} MovieBooking. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
