import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export
import axios from 'axios';

const SignInPopup = ({ isOpen, onClose,updateLoginStatus }) => {
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
      updateLoginStatus(true);
      localStorage.setItem('accessToken', accesstoken);
      localStorage.setItem('user', userDetailsString);



      alert(`Hello , you successfully logged in`);

      // Store access token for later use
      

      // Close the sign-in popup
      onClose();
    } catch (error) {
      console.error('Sign in failed', error);
      alert('Please Verify ur Credentiels ! ')
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-96 z-50">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSignIn}>Sign In</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInPopup;
