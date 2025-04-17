import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RequestPage from './pages/RequestPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/requests" element={<RequestPage />} />
        <Route path="/user" element={<UserPage />} />  {/* Corrected line */}
      </Routes>
    </>
  );
}

export default App;
