import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = ({ setIsLoggedIn, setUsername }) => {
  const [loginData, setLoginData] = useState({ regNo: '', password: '' });
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5000';

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Login successful.');
        localStorage.setItem('token', data.token); 
        setUsername(data.username);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in.');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Google login successful.');
        localStorage.setItem('token', data.token);
        setUsername(data.username); 
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(data.message || 'Google login failed.');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('An error occurred during Google login.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="249046872949-oa2m17cs3986jd6g2j193c5rrofb1bbk.apps.googleusercontent.com">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-6 rounded-2xl shadow-xl bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Number</label>
              <input
                type="text"
                name="regNo"
                value={loginData.regNo}
                onChange={handleLoginChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => alert('Google login failed.')}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
