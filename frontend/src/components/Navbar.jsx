import React from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Train, Activity, Compass, Utensils, AlertTriangle } from 'lucide-react';

const { Header } = Layout;

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const serviceMenuItems = [
    { key: 'pnr', icon: <Activity size={16}/>, label: <Link to="/pnr">PNR Status</Link> },
    { key: 'track', icon: <Compass size={16}/>, label: <Link to="/track">Track Train</Link> },
    { key: 'food', icon: <Utensils size={16}/>, label: <Link to="/food">E-Catering</Link> },
    { key: 'madad', icon: <AlertTriangle size={16}/>, label: <Link to="/madad">Rail Madad</Link> },
  ];

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      background: 'linear-gradient(90deg, #213d77 0%, #1e5799 100%)',
      padding: '0 40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Train color="#FB792B" size={36} style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.2))' }} />
          <Link to="/" style={{ color: 'white', fontSize: '1.8rem', fontWeight: '800', letterSpacing: '1px' }}>
            Rail<span style={{ color: '#FB792B' }}>Setu</span>
          </Link>
        </div>
        
        <Dropdown menu={{ items: serviceMenuItems }} placement="bottomLeft">
          <Button type="text" style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>
            Services <DownOutlined style={{ fontSize: '12px' }} />
          </Button>
        </Dropdown>
      </div>
      <Menu mode="horizontal" selectable={false} style={{ flex: 1, justifyContent: 'flex-end', borderBottom: 'none', background: 'transparent' }}>
        {user ? (
          <>
            <Menu.Item key="my-bookings">
              <Link to="/my-bookings">
                <Button type="link" style={{ color: 'white' }}>
                  My Bookings
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">
                <Button type="link" style={{ color: 'white' }} icon={<User size={16} />}>
                  {user.name}
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Button type="primary" danger onClick={handleLogout}>Logout</Button>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login">
              <Link to="/login"><Button type="primary">Login</Button></Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register"><Button>Register</Button></Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
