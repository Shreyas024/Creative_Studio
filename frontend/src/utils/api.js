import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Pointing to the Express backend
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensure cookies are sent with requests if we ever switch to relying solely on httpOnly cookies
  withCredentials: true,
});

// Request Interceptor: Attach the JWT token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    // Only access localStorage if in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, clear token and user state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // We shouldn't force reload immediately here as the Context will handle it,
        // but it's a good fallback for hard resets on expired tokens.
      }
    }
    return Promise.reject(error);
  }
);

export default api;
