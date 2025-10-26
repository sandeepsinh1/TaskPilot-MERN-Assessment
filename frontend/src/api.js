import axios from 'axios';

// Ensure this URL matches your backend server address
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Interceptor to attach the JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;