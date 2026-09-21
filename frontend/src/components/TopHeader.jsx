import React, { useState } from 'react';
import { Typography, Input, Avatar, Badge, Dropdown, Button, message, Tooltip } from 'antd';
import { Train, Search, Bell, HelpCircle, ChevronDown, LogIn, User, Settings, LogOut, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const { Text } = Typography;

const TopHeader = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [globalSearch, setGlobalSearch] = useState('');

  const handleLogout = () => {
    logout();
    message.info('Logged out successfully');
    navigate('/login');
  };

  const handleGlobalSearch = (value) => {
    const term = (value || globalSearch).trim();
    if (!term) return;

    if (/^\d{10}$/.test(term)) {
      navigate(`/pnr?pnr=${term}`);
      message.info(`Navigating to PNR Status for ${term}`);
    } else if (/^\d{5}$/.test(term) || term.toLowerCase().includes('express') || term.toLowerCase().includes('shatabdi') || term.toLowerCase().includes('vande')) {
      navigate(`/live?train=${encodeURIComponent(term)}`);
      message.info(`Navigating to Live Status for ${term}`);
    } else {
      navigate('/book', { state: { search: term } });
      message.info(`Searching trains matching "${term}"`);
    }
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
      {/* Left side - Logo & History Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
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

        {/* Back / Forward Buttons */}
        <div style={{ display: 'flex', gap: '6px', marginLeft: '12px' }}>
          <Tooltip title="Go Back">
            <Button
              type="text"
              icon={<ArrowLeft size={18} color="#475569" />}
              onClick={() => navigate(-1)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f5f9'
              }}
            />
          </Tooltip>
          <Tooltip title="Go Forward">
            <Button
              type="text"
              icon={<ArrowRight size={18} color="#475569" />}
              onClick={() => navigate(1)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f5f9'
              }}
            />
          </Tooltip>
        </div>
      </div>

      {/* Middle - Search Input */}
      <div style={{ flex: 1, margin: '0 30px', display: 'flex', justifyContent: 'center' }}>
        <Input 
          size="large"
          placeholder="Search trains, stations, or PNR..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          onPressEnter={() => handleGlobalSearch()}
          prefix={<Search size={18} color="#94a3b8" style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => handleGlobalSearch()} />}
          style={{
            maxWidth: '520px',
            borderRadius: '24px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            fontSize: '0.88rem'
          }}
        />
      </div>

      {/* Right - Profile & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Badge count={3} color="#ff4d4f" size="small">
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            backgroundColor: '#f1f5f9', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <Bell size={18} color="#475569" />
          </div>
        </Badge>

        {user ? (
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <Avatar 
                size={38} 
                icon={<User size={22} color="#0d47a1" />}
                style={{ backgroundColor: '#e3f2fd', border: '1px solid #bbdefb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <Text style={{ fontWeight: '700', fontSize: '0.88rem', color: '#1e293b' }}>
                  {user?.name || 'User'}
                </Text>
                <Text style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {user?.role || 'Regular User'}
                </Text>
              </div>
              <ChevronDown size={15} color="#94a3b8" />
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
            <Button 
              onClick={() => navigate('/register')}
              style={{ borderRadius: '8px', fontWeight: '600' }}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
