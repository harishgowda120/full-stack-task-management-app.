import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before making the request

    // Validate form fields
    if (!username || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Optional: You could add more validation here (e.g., password strength, valid username)

    try {
      const response = await axios.post(
        'https://full-stack-task-management-app-2-bw9j.onrender.com/api/auth/register',
        { username, password }
      );

      // Optionally store the token and user data in localStorage or context
      // localStorage.setItem('token', response.data.token); // Example for saving token

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      // Check the backend's response for error details
      if (error.response) {
        // Backend returned a response, check the data for the error message
        setErrorMessage(error.response.data.message || 'Error creating account. Please try again.');
      } else {
        // Handle network or other Axios-related errors
        setErrorMessage('Network error. Please try again later.');
      }
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Register</h2>

              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <form onSubmit={handleRegister}>
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

                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control py-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3">Register</button>
              </form>

              <div className="mt-4 text-center">
                <p className="mb-0">Already have an account? <a href="/login" className="text-decoration-none">Login here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
