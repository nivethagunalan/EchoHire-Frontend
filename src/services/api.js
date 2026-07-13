import axios from 'axios';

const API = axios.create({
  baseURL: 'https://echohire-backend-1ia6.onrender.com'
});

// ✅ Attach token properly
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// ---------------------
// AUTH
// ---------------------
export const signupUser = async (data) => {
  const res = await API.post('/signup', data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post('/login', data);
  return res.data;
};

// ---------------------
// INTERVIEW
// ---------------------
export const submitInterview = async (data) => {
  const res = await API.post('/interview', data);
  return res.data.data;
};

// ---------------------
// HISTORY ✅ FIXED
// ---------------------
export const fetchHistory = async () => {
  const res = await API.get('/history');
  return res.data.data; // 🔥 important
};

// ---------------------
// RESUME
// ---------------------
export const uploadResume = async (formData) => {
  const res = await API.post('/resume/upload', formData);
  return res.data.data;
};