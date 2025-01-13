import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginUser } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before making the request

    try {
      const response = await axios.post('https://full-stack-task-management-app-2-bw9j.onrender.com/api/auth/login', { username, password });
      const { token, username: userUsername, userId } = response.data; // Destructure username, userId, and token

      // Store the user data (username, userId, and token) in localStorage and context
      localStorage.setItem('token', token);
      localStorage.setItem('username', userUsername);
      localStorage.setItem('userId', userId);

      loginUser({ token, username: userUsername, userId }); // Update your global context with user data

      // Redirect to the menu page
      navigate('/menu');
    } catch (error) {
      setErrorMessage('Invalid credentials, please try again.');
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>

              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <form onSubmit={handleLogin}>
                <div className="form-group mb-4">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control py-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control py-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3">Login</button>
              </form>

              <div className="mt-4 text-center">
                <p className="mb-0">Don't have an account? <a href="/register" className="text-decoration-none">Register here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
