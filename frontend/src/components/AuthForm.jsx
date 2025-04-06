import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit, formData, setFormData }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-[90%] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {type === "login" ? "Login to Your Account" : "Create an Account"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {type === "register" && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white"
            required
          />
          <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold">
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-400">
          {type === "login" ? (
            <>
              Don’t have an account? <Link to="/register" className="text-red-400 hover:underline">Register</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/" className="text-red-400 hover:underline">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
