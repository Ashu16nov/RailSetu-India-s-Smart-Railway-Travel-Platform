import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';
import Profile from './pages/Profile';
import PNRStatus from './pages/PNRStatus';
import Settings from './pages/Settings';
import LiveStatus from './pages/LiveStatus';
import MyBookings from './pages/MyBookings';
import useAuthStore from './store/useAuthStore';

// Separate layout for authentication pages vs protected dashboard pages
const AppContainer = ({ children }) => {
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // If user is not logged in and trying to access protected pages, redirect to login
  if (!user && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // If user is already logged in and on login/register page, redirect to Home
  if (user && isAuthPage) {
    return <Navigate to="/" replace />;
  }

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
          <Route path="/live" element={<LiveStatus />} />
          <Route path="/live-status" element={<LiveStatus />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
