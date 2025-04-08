// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
      <Link to="/" style={{ margin: '0 1rem', color: '#fff' }}>Login</Link>
      <Link to="/requests" style={{ margin: '0 1rem', color: '#fff' }}>Requests</Link>
      <Link to="/assignments" style={{ margin: '0 1rem', color: '#fff' }}>Assignments</Link>
      <Link to="/feedback" style={{ margin: '0 1rem', color: '#fff' }}>Feedback</Link>
    </nav>
  );
};

export default Navbar;
