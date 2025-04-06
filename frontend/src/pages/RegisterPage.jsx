import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful!");
      navigate("/"); // redirect to login page
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default RegisterPage;
