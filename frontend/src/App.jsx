import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BookTicket from './pages/BookTicket';
import Profile from './pages/Profile';
import PNRStatus from './pages/PNRStatus';
import Settings from './pages/Settings';
import LiveStatus from './pages/LiveStatus';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTrains from './pages/admin/AdminTrains';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminNotices from './pages/admin/AdminNotices';
import AdminSettings from './pages/admin/AdminSettings';
import useAuthStore from './store/useAuthStore';

// Separate layout for auth, admin, and protected user dashboard pages
const AppContainer = ({ children }) => {
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');

  // If user is not logged in and trying to access protected pages, redirect to login
  if (!user && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // If user is already logged in and on login/register page, redirect based on role
  if (user && isAuthPage) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />;
  }

  if (isAuthPage) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'transparent' }}>
        {children}
      </div>
    );
  }

  // Admin Portal pages use the dedicated AdminLayout
  if (isAdminPage) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  // User Dashboard pages use the DashboardLayout
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
          
          {/* Dedicated Admin Module Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/trains" element={<AdminTrains />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/notices" element={<AdminNotices />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
