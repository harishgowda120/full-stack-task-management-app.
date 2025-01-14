import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const NavBar = () => {
  const { user, logoutUser } = useAppContext();

  const handleLogout = () => {
    // Clear the token and user data from localStorage and logout the user from context
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    logoutUser();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fs-3 fw-bold text-uppercase" to="/">
          Food-Delivery-System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Menu Link */}
            <li className="nav-item">
              <Link className="nav-link fs-5 text-white hover-underline-animation" to="/">
                Menu
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fs-5 text-white hover-underline-animation" to="/AddMenu">
              AddMenu
              </Link>
            </li>

            {/* Cart Link */}
            <li className="nav-item">
              <Link className="nav-link fs-5 text-white hover-underline-animation" to="/Cart">
                Cart
              </Link>
            </li>

            {/* Conditional Login/Register or Logout */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-white hover-underline-animation" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-white hover-underline-animation" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link fs-5 text-white">Hello, {user.username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger fs-5" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
