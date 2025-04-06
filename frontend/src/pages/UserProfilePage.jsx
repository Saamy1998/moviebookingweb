import React from "react";

const UserProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <p className="text-center mt-10 text-red-500">No user info found. Please login again.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserProfilePage;
