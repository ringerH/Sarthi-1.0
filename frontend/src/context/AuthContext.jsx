// src/context/AuthContext.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js'; // <-- This path is now correct
import { AuthContext } from './authContextDefinition.js'; // This path is correct (same folder)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const navigate = useNavigate();

  const loginWithGoogle = async (googleToken) => {
    try {
      const userData = await authService.googleLogin(googleToken);
      setUser(userData);
      navigate('/dashboard'); // Redirect on success
    } catch (error) {
      console.error('Failed to login with Google', error);
      throw error; 
    }
  };
  

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const value = {
    user,
    token: user?.token,
    isAuthenticated: !!user,
    loginWithGoogle, // 3. Expose the new function
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};