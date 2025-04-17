import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
    <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Home</Link>
    <Link to="/requests" style={{color: 'white', marginRight: '15px' }}>Request Service</Link>
    <Link to="/user" style={{color: 'white', marginRight: '15px' }}>User Service</Link>
  </nav>
);

export default Navbar;
