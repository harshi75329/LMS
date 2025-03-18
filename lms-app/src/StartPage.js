import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <div className="welcome-box">
        <h1>Welcome to Learning Portal</h1>
        <p>Join us to explore, learn, and grow with the best online learning experience! ✨</p>
        <div className="button-group">
          <button className="cute-btn login-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="cute-btn signup-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
