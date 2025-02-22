import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import HeroBanner from "./HeroBanner";  // Import the reusable HeroBanner

const Dashboard = () => {
  console.log("Dashboard is rendering...");  // Debugging log
  const logo = "/Hopehandslogo.png"; // Path to logo
  const slogan = "Connecting Hearts, Changing Lives."; // Slogan text
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Hero Banner */}
      <HeroBanner logo={logo} slogan={slogan} />

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#5a0e35" }}>
        <div className="container px-4 px-lg-5">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item"><Link className="nav-link text-white mx-3" to="/admin-password-verification">Admin Sign-In</Link></li>
              {/* Updated route for Member Sign-In */}
              <li className="nav-item"><Link className="nav-link text-white mx-3" to="/password-verification">Member Sign-In</Link></li>
              <li className="nav-item"><Link className="nav-link text-white mx-3" to="/register">New Member Registration</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="container text-center mt-5">
        <h2 className="text-secondary">Welcome to Hopehands</h2>
        <p className="fs-4">
          We are a community dedicated to making a difference. Join us in our mission to connect hearts and change lives.
        </p>
      </div>

      {/* Mission, Vision, and Values Section */}
      <div className="container mt-5 text-center">
        <h2 className="mb-5 text-primary">Our Mission, Vision & Values</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <h3 className="text-danger">Our Mission</h3>
            <p className="fs-5">Empowering communities through meaningful connections and impactful support.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h3 className="text-success">Our Vision</h3>
            <p className="fs-5">To be a leading platform that bridges the gap between those who need help and those who can provide it.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h3 className="text-warning">Our Values</h3>
            <p className="fs-5">Compassion, Integrity, and Commitment to Service.</p>
          </div>
        </div>
      </div>

      {/* Invitation to Register */}
      <div className="container text-center mt-4">
        <h3 className="text-primary">Join Us Today!</h3>
        <p className="fs-5">Become a part of our community and contribute to meaningful change.</p>
        <button className="btn btn-lg btn-primary" onClick={() => navigate('/register')}>Register Now</button>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center p-3 mt-5">
        <p>&copy; 2025 Hopehands Contact Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
