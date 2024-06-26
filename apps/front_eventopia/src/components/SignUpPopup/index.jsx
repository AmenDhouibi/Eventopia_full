import React, { useState } from 'react';
import axios from 'axios';

const SignUpPopup = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');
  const [institution, setInstitution] = useState('');
  const [profession, setProfession] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth', {
        username,
        email,
        password,
        age: parseInt(age),
        photo,
        institution,
        profession,
        phonenumber: parseInt(phonenumber),
      });
      console.log(response.data);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
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
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            {!isSuccess ? (
              <form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input type="text" id="username" name="username" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" name="password" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                  <input type="number" id="age" name="age" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
                  <input type="text" id="photo" name="photo" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution</label>
                  <input type="text" id="institution" name="institution" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession</label>
                  <input type="text" id="profession" name="profession" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={profession} onChange={(e) => setProfession(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="number" id="phonenumber" name="phonenumber" className="mt-1 p-3 block w-full border border-gray-300 rounded-md" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSignUp}>Sign Up</button>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-green-500 font-semibold">Sign Up Successful!</p>
                {/* Additional content for successful sign-up */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpPopup;
