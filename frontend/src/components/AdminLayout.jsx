import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Train, 
  Ticket, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';
import { Typography, Badge, Button, Tag, Avatar, message, ConfigProvider, theme } from 'antd';
import useAuthStore from '../store/useAuthStore';

const { Text, Title } = Typography;

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const adminMenuItems = [
    { key: '/admin', icon: <LayoutDashboard size={18} />, label: 'Control Center' },
    { key: '/admin/trains', icon: <Train size={18} />, label: 'Manage Trains' },
    { key: '/admin/bookings', icon: <Ticket size={18} />, label: 'Manage Bookings' },
    { key: '/admin/users', icon: <Users size={18} />, label: 'Passenger Registry' },
    { key: '/admin/notices', icon: <Bell size={18} />, label: 'System Notices' },
    { key: '/admin/settings', icon: <Settings size={18} />, label: 'Platform Config' }
  ];

  const handleLogout = () => {
    logout();
    message.info('Logged out from Admin Console');
    navigate('/login');
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#7c3aed',
          colorBgContainer: '#1e293b',
          colorBgElevated: '#1e293b',
          colorBgLayout: '#0f172a',
          colorText: '#f8fafc',
          colorTextHeading: '#ffffff',
          colorBorder: '#334155',
          colorBorderSecondary: '#334155'
        }
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      
      {/* DISTINCT ADMIN TOP HEADER BAR */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        backgroundColor: '#1e1b4b',
        borderBottom: '1px solid rgba(139, 92, 246, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
      }}>
        {/* Brand & Console Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div 
            onClick={() => navigate('/admin')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', padding: '8px', borderRadius: '12px', boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)' }}>
              <Train color="#ffffff" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '900', lineHeight: 1, letterSpacing: '-0.5px' }}>
                Rail<span style={{ color: '#fbbf24' }}>Setu</span> <span style={{ fontSize: '0.7rem', background: '#7c3aed', color: '#fff', padding: '2px 8px', borderRadius: '12px', marginLeft: '6px', fontWeight: '800' }}>ADMIN</span>
              </div>
              <Text style={{ fontSize: '0.65rem', color: '#a78bfa', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '700', display: 'block', marginTop: '3px' }}>
                OPERATIONS CONTROL CENTER
              </Text>
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '0 8px' }} />

          {/* Live System Status Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tag color="success" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', fontWeight: '700', border: 'none', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80' }}>
              <Activity size={13} /> Network Online
            </Tag>
            <Tag color="warning" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', fontWeight: '700', border: 'none', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d' }}>
              <Clock size={13} /> IRCTC Sync: Active
            </Tag>
          </div>
        </div>

        {/* Right Admin Profile & Switch to User Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            type="default" 
            onClick={() => navigate('/')} 
            icon={<ArrowLeft size={15} />}
            style={{ 
              borderRadius: '8px', 
              fontWeight: '700', 
              fontSize: '0.82rem',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#cbd5e1',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            Switch to Passenger Site
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(124, 58, 237, 0.2)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <Avatar style={{ backgroundColor: '#7c3aed', color: '#fff', fontWeight: '800' }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </Avatar>
            <div>
              <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.85rem', display: 'block', lineHeight: 1.1 }}>
                {user?.name || 'System Admin'}
              </Text>
              <Text style={{ color: '#fbbf24', fontSize: '0.68rem', fontWeight: '700', display: 'block' }}>
                Root Superuser
              </Text>
            </div>
          </div>

          <Button 
            type="text" 
            danger 
            icon={<LogOut size={18} />}
            onClick={handleLogout}
            title="Logout Admin Session"
          />
        </div>
      </header>

      {/* ADMIN BODY WITH SIDEBAR & CONTENT AREA */}
      <div style={{ display: 'flex', flex: 1, marginTop: '70px' }}>
        
        {/* DISTINCT DARK PURPLE ADMIN SIDEBAR */}
        <aside style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          bottom: 0,
          width: '260px',
          backgroundColor: '#1e1b4b',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          zIndex: 900,
          borderRight: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{ padding: '0 20px 16px', marginBottom: '8px' }}>
            <Text style={{ fontSize: '0.7rem', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800' }}>
              ADMIN NAVIGATION
            </Text>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 16px' }}>
            {adminMenuItems.map((item) => {
              const isActive = location.pathname === item.key;
              return (
                <div
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#7c3aed' : 'transparent',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    transition: 'all 0.2s ease',
                    fontWeight: isActive ? '700' : '500',
                    boxShadow: isActive ? '0 4px 16px rgba(124, 58, 237, 0.4)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#ffffff' : '#a78bfa' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '0.92rem' }}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom Admin Status Card */}
          <div style={{ padding: '0 16px', marginTop: 'auto' }}>
            <div style={{
              borderRadius: '14px',
              backgroundColor: 'rgba(124, 58, 237, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              padding: '16px',
              textAlign: 'center'
            }}>
              <ShieldAlert size={24} color="#fbbf24" style={{ marginBottom: '8px' }} />
              <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.85rem', display: 'block' }}>
                Secure Admin Access
              </Text>
              <Text style={{ color: '#94a3b8', fontSize: '0.72rem', display: 'block', marginTop: '4px' }}>
                All administrative actions are logged and audited.
              </Text>
            </div>
          </div>
        </aside>

        {/* MAIN ADMIN CONTENT CONTAINER */}
        <main style={{ padding: '28px', flex: 1, overflowY: 'auto', marginLeft: '260px', minWidth: '0', backgroundColor: '#0f172a' }}>
          {children}
        </main>
      </div>

    </div>
    </ConfigProvider>
  );
};

export default AdminLayout;
