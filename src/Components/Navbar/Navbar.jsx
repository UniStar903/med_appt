// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";   // ✅ Import useNavigate
import "./Navbar.css";

function Navbar() {
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  // ✅ Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("auth-token");

  // ✅ Logout function
  const handleLogout = () => {
    sessionStorage.clear(); // remove all stored user data
    navigate("/login");     // redirect to login page
    window.location.reload(); // refresh to update Navbar
  };

  return (
    <nav>
      {/* Logo Section */}
      <div className="nav__logo">
        <Link to="/">
          StayHealthy
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            width="26"
            viewBox="0 0 1000 1000"
            style={{ fill: "#3685fb" }}
          >
            <title>Doctor With Stethoscope</title>
            <g>
              <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
              <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
              <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7..."></path>
            </g>
          </svg>
        </Link>
        <span>.</span>
      </div>

      {/* Hamburger Icon */}
      <div className="nav__icon" onClick={handleClick}>
        <i className={isActive ? "fa fa-bars" : "fa fa-times"}></i>
      </div>

      {/* Navigation Links */}
      <ul className={`nav__links ${isActive ? "active" : ""}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/appointments">Appointments</Link>
        </li>

        {/* ✅ Conditional rendering */}
        {isLoggedIn ? (
          <li className="link">
            <button className="btn1" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
