// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import LoginPage from './pages/LoginPage';
// import RequestPage from './pages/RequestPage';
// import AssignPage from './pages/AssignPage';
// import FeedbackPage from './pages/FeedbackPage';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/requests" element={<RequestPage />} />
//         <Route path="/assignments" element={<AssignPage />} />
//         <Route path="/feedback" element={<FeedbackPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <><Navbar /><div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '48px' }}>Welcome to Maintenance Frontend</h1>

    </div></>
  );
}

export default App;
