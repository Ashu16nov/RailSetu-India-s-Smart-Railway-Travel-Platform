import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';

import Profile from './pages/Profile';
import PNRStatus from './pages/PNRStatus';

// Separate layout for authentication pages
const AppContainer = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
        {children}
      </div>
    );
  }

  // Dashboard pages use the DashboardLayout
  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookTicket />} />
          <Route path="/pnr" element={<PNRStatus />} />
          <Route path="/check-pnr" element={<PNRStatus />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
