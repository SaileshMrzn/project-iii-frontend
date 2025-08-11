import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : "https://project-iii-backend.onrender.com/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you use cookies/auth
});

export default api;
