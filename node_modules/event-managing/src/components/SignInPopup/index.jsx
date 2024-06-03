import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export
import axios from 'axios';
import { Helmet } from 'react-helmet';

const SignInPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password
      });
      
      // Log the entire response to understand its structure
      console.log('Response:', response);

      // Ensure the response contains the accessToken
      const accesstoken = response.data.accesstoken;
      if (!accesstoken) {
        throw new Error('No access token found in response');
      }

      console.log('Access Token:', accesstoken); // Log the token to verify it's a valid string

      setAccessToken(accesstoken);

      // Decode the token to extract user information
      let decodedToken;
      try {
        decodedToken = jwtDecode(accesstoken);
        console.log('Decoded Token:', decodedToken); // Log the decoded token to verify its contents
      } catch (err) {
        console.error('Error decoding token:', err);
        throw new Error('Failed to decode token');
      }
      const { user_id } = decodedToken;
      setUserId(user_id);
      localStorage.setItem('userId', user_id);
      const userDetailsResponse = await axios.get(`http://localhost:3000/api/user/id/${user_id}`);
      // Convert the userDetails object to a string
      const userDetailsString = JSON.stringify(userDetailsResponse.data);
      setUser(userDetailsString)
      console.log(user)
      setIsLoggedIn(true);
      localStorage.setItem('accessToken', accesstoken);
      localStorage.setItem('user', userDetailsString);


      alert(`Hello , you successfully logged in`);
      window.location.href = "/";

    } catch (error) {
      console.error('Sign in failed', error);
      alert('Please Verify ur Credentiels ! ')
    }
  };

  
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
          <form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-lg bg-gray-100 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded-lg bg-gray-100 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPopup;
