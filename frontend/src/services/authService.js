// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5002/api/auth';

// 1. This service will now handle the Google login
const googleLogin = async (googleToken) => {
  try {
    // Send Google's token to our backend
    const response = await axios.post(`${API_URL}/google-login`, {
      token: googleToken,
    });

    if (response.data && response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Google login failed on auth service', error.response.data);
    throw error.response.data;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// 2. Remove the old 'login' and 'register' functions
const authService = {
  logout,
  getCurrentUser,
  googleLogin, // 3. Export the new function
};

export default authService;