import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/movies"); // redirect to protected page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleLogin}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default LoginPage;
