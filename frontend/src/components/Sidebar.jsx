import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Ticket, 
  Search, 
  Train, 
  List, 
  XCircle, 
  IndianRupee, 
  User, 
  Settings,
  LogIn,
  LogOut
} from 'lucide-react';
import { Typography, message } from 'antd';
import useAuthStore from '../store/useAuthStore';

const { Text } = Typography;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const menuItems = [
    { key: '/', icon: <Home size={20} />, label: 'Home' },
    { key: '/book', icon: <Ticket size={20} />, label: 'Book Ticket' },
    { key: '/pnr', icon: <Search size={20} />, label: 'Check PNR Status' },
    { key: '/live', icon: <Train size={20} />, label: 'Live Train Status' },
    { key: '/my-bookings', icon: <List size={20} />, label: 'My Bookings' },
    { key: '/cancel', icon: <XCircle size={20} />, label: 'Cancel Ticket' },
    { key: '/refund', icon: <IndianRupee size={20} />, label: 'Refund Status' },
    { key: '/profile', icon: <User size={20} />, label: 'Profile' },
    { key: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <aside style={{
      position: 'fixed',
      top: '70px',
      left: 0,
      bottom: 0,
      width: '260px',
      backgroundColor: '#1a2639',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      zIndex: 900
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <div
              key={item.key}
              onClick={() => item.action ? item.action() : navigate(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 20px',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: isActive ? '#1890ff' : 'transparent',
                color: isActive ? '#ffffff' : '#8b9bb4',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '600' : '500',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Ad Card */}
      <div style={{ padding: '0 20px', marginTop: 'auto' }}>
        <div style={{
          background: 'linear-gradient(to bottom right, #24344d, #182335)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Train size={32} color="#ffffff" style={{ marginBottom: '12px' }} />
          <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', marginBottom: '8px' }}>
            Travel Smart<br />with RailSetu
          </Text>
          <Text style={{ color: '#8b9bb4', fontSize: '0.8rem' }}>
            Book. Track. Explore.
          </Text>
          <div style={{ 
            marginTop: '16px', 
            width: '100%', 
            height: '80px', 
            borderRadius: '8px', 
            overflow: 'hidden',
            background: '#0f172a'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
              alt="Train"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
