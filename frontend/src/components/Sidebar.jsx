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
    { key: '/', icon: <Home size={18} />, label: 'Home' },
    { key: '/book', icon: <Ticket size={18} />, label: 'Book Ticket' },
    { key: '/pnr', icon: <Search size={18} />, label: 'PNR Status' },
    { key: '/live', icon: <Train size={18} />, label: 'Live Train Status' },
    { key: '/my-bookings', icon: <List size={18} />, label: 'My Bookings' },
    ...(user ? [
      { key: '/profile', icon: <User size={18} />, label: 'My Profile' }
    ] : []),
    { key: '/settings', icon: <Settings size={18} />, label: 'Settings' },
    ...(user ? [
      { 
        key: 'logout', 
        icon: <LogOut size={18} />, 
        label: 'Logout',
        action: () => {
          logout();
          message.info('Logged out successfully');
          navigate('/login');
        }
      }
    ] : [
      { key: '/login', icon: <LogIn size={18} />, label: 'Login' },
      { key: '/register', icon: <User size={18} />, label: 'Register' }
    ])
  ];

  return (
    <aside style={{
      position: 'fixed',
      top: '70px',
      left: 0,
      bottom: 0,
      width: '260px',
      backgroundColor: '#0d1b2a',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      zIndex: 900,
      borderRight: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', padding: '0 16px' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.key || (item.key === '/profile' && location.pathname === '/my-profile');
          return (
            <div
              key={item.key}
              onClick={() => item.action ? item.action() : navigate(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 18px',
                borderRadius: '12px',
                cursor: 'pointer',
                backgroundColor: isActive ? '#1890ff' : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '600' : '500',
                boxShadow: isActive ? '0 4px 14px rgba(24,144,255,0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: '0.92rem' }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Sidebar Promo Card (Matching uploaded screenshot) */}
      <div style={{ padding: '0 16px', marginTop: 'auto' }}>
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          height: '150px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
            alt="Safe Journeys"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,27,42,0.95) 0%, rgba(13,27,42,0.4) 60%, rgba(13,27,42,0.1) 100%)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.05rem', lineHeight: 1.2, margin: 0 }}>
              Safe Journeys<br />Better Tomorrow
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
              <Train size={16} color="#1890ff" />
              <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: '0.85rem' }}>
                Rail<span style={{ color: '#FB792B' }}>Setu</span>
              </Text>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
