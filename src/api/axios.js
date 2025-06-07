// trusthaven-frontend/src/api/axios.js (or similar)
import axios from 'axios';

const API = axios.create({
  // IMPORTANT: This should be your backend's URL.
  // In development, it's typically http://localhost:5000/api/v1/
  // In production, it will be your Render backend URL: https://your-trusthaven-backend.onrender.com/api/v1/
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Important for sending cookies (like our JWT cookie)
});

// Request interceptor to attach JWT for protected routes (if stored in localStorage/sessionStorage)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Or how you store it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;