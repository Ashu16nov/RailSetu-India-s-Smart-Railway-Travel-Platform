import React from 'react';
import { Typography, Input, Avatar, Badge, Dropdown, Button, message } from 'antd';
import { Train, Search, Bell, HelpCircle, ChevronDown, LogIn, User, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const { Text } = Typography;

const TopHeader = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    message.info('Logged out successfully');
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <User size={16} />,
      label: 'My Profile',
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      icon: <Settings size={16} />,
      label: 'Settings',
      onClick: () => navigate('/settings')
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout
    }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      zIndex: 1000
    }}>
      {/* Left side - Logo */}
      <div style={{ display: 'flex', alignItems: 'center', width: '236px', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Train color="#0d47a1" size={32} strokeWidth={2} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#001529', fontSize: '1.5rem', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.5px' }}>
              Rail<span style={{ color: '#FB792B' }}>Setu</span>
            </div>
            <Text style={{ fontSize: '0.5rem', color: '#595959', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}>
              INDIAN RAILWAY BOOKING & TRAVEL
            </Text>
          </div>
        </div>
      </div>

      {/* Middle - Navigation Links */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '28px', alignItems: 'center' }}>
        {[
          { key: '/', label: 'Home' },
          { key: '/book', label: 'Book Ticket' },
          { key: '/pnr', label: 'PNR Status' },
          { key: '/live', label: 'Live Train Status' },
          { key: '/my-bookings', label: 'My Bookings' }
        ].map((navItem) => {
          const isActive = location.pathname === navItem.key;
          return (
            <div
              key={navItem.key}
              onClick={() => navigate(navItem.key)}
              style={{
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? '#0d47a1' : '#595959',
                borderBottom: isActive ? '2px solid #0d47a1' : '2px solid transparent',
                padding: '22px 4px 18px',
                transition: 'all 0.2s ease'
              }}
            >
              {navItem.label}
            </div>
          );
        })}
        <div style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', color: '#595959', display: 'flex', alignItems: 'center', gap: '4px' }}>
          More <ChevronDown size={14} />
        </div>
      </div>

      {/* Right - Profile & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Badge dot color="red">
          <Bell size={20} color="#595959" style={{ cursor: 'pointer' }} />
        </Badge>
        
        <HelpCircle size={20} color="#595959" style={{ cursor: 'pointer' }} />

        {user ? (
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <Avatar 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                size={40} 
                style={{ border: '2px solid #e8e8e8' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <Text style={{ fontWeight: '600', fontSize: '0.9rem', color: '#262626' }}>
                  {user?.name || 'Ashu Kumar'}
                </Text>
                <Text style={{ fontSize: '0.75rem', color: '#8c8c8c' }}>
                  {user?.role === 'admin' ? 'Administrator' : 'Traveller'}
                </Text>
              </div>
              <ChevronDown size={16} color="#8c8c8c" />
            </div>
          </Dropdown>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button 
              type="primary" 
              icon={<LogIn size={16} />}
              onClick={() => navigate('/login')}
              style={{ borderRadius: '8px', background: '#0d47a1', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
