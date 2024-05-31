import React, { useEffect, useState } from 'react';

const AuthHandler = ({ onLogin, onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by looking for a token in localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  return null; // You can render nothing here, as this component manages the state internally
};

export default AuthHandler;
