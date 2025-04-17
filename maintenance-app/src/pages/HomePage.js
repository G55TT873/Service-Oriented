import React from 'react';
import './HomePage.css';

const HomePage = () => (
  <div className="home-container">
    <h1 className="home-title"> Welcome to Maintenance Request System</h1>
    <p className="home-subtitle">
      A simple, efficient platform to manage user service requests with ease.
    </p>
    <div className="home-card-container">
      <div className="home-card">
        <h3>User Services</h3>
        <p>Register, login, and manage roles easily.</p>
      </div>
      <div className="home-card">
        <h3>Request Services</h3>
        <p>Submit and track maintenance issues fast.</p>
      </div>
      <div className="home-card">
        <h3>Assignments & Feedback</h3>
        <p>Assign staff and collect service feedback.</p>
      </div>
    </div>
  </div>
);

export default HomePage;
