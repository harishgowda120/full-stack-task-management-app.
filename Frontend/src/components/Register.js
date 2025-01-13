import React, { useState } from 'react';
// import { useAppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // const { loginUser } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before making the request

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      // const { Username, userId } = response.data;  // Destructure username and userId
      
      // Store the token and user in local storage and context
       // Store the user data (username and userId) in localStorage and context
      //  localStorage.setItem('username', Username);
      //  localStorage.setItem('userId', userId);

      //  loginUser({ Username, userId });

      // Redirect to the menu page
      navigate('/login');
    } catch (error) {
      setErrorMessage('Error creating account. Please try again.');
      console.error("Error registering:", error);
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
