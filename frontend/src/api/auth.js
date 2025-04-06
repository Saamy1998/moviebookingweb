import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
