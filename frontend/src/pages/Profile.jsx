import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Input, Select, Button, Checkbox, Tag, message, Avatar } from 'antd';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Globe, 
  Edit3, 
  Save, 
  ShieldCheck, 
  Ticket, 
  Search, 
  Train, 
  XCircle, 
  ChevronRight, 
  Lock,
  Bell,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useBookingStore from '../store/useBookingStore';

const { Title, Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuthStore();
  const bookings = useBookingStore((state) => state.bookings);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Form states initialized with user state or defaults matching screenshot
  const [formData, setFormData] = useState({
    name: user?.name || 'Ashu Kumar',
    email: user?.email || 'ashukumar@example.com',
    phone: user?.phone || '+91 9876543210',
    dob: user?.dob || '15-04-2002',
    gender: user?.gender || 'Male',
    nationality: user?.nationality || 'Indian',
    preferredClass: user?.preferredClass || 'SL',
    preferredBerth: user?.preferredBerth || 'No Preference',
    foodPreference: user?.foodPreference || 'Veg',
    disabilityConcession: user?.disabilityConcession || 'None',
    notificationsOptIn: true
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
    setIsEditing(false);
    message.success('Profile details updated successfully!');
  };

  // Recent bookings data (combining dynamic store + fallback defaults matching uploaded image)
  const displayBookings = bookings.length > 0 ? bookings : [
    {
      _id: 'b1',
      source: 'Delhi',
      destination: 'Varanasi',
      trainNumber: '12561',
      trainName: 'Swatantrata Senani Express',
      journeyDate: '20 Sep 2025',
      className: 'SL',
      status: 'Confirmed'
    },
    {
      _id: 'b2',
      source: 'Mumbai',
      destination: 'Pune',
      trainNumber: '12138',
      trainName: 'Intercity Express',
      journeyDate: '05 Aug 2025',
      className: '3A',
      status: 'Confirmed'
    },
    {
      _id: 'b3',
      source: 'Chennai',
      destination: 'Bengaluru',
      trainNumber: '12650',
      trainName: 'Chennai Express',
      journeyDate: '20 Jul 2025',
      className: 'SL',
      status: 'Confirmed'
    }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* 1. Header Banner Card */}
      <div 
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          background: '#0d1b2a'
        }}
      >
        {/* Scenic Vande Bharat Banner Background */}
        <div style={{ height: '180px', position: 'relative' }}>
          <img 
            src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
            alt="RailSetu Banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.4) 60%, rgba(13,27,42,0.85) 100%)'
          }} />
        </div>

        {/* User Avatar + Info & Floating Travel Smarter Card */}
        <div 
          style={{
            padding: '0 32px 24px',
            marginTop: '-50px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px' }}>
            <Avatar 
              size={100}
              icon={<User size={54} color="#0d47a1" />}
              style={{
                backgroundColor: '#ffffff',
                border: '4px solid #ffffff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
            <div style={{ paddingBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>
                  {formData.name}
                </Title>
              </div>
              <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', display: 'block', marginBottom: '8px' }}>
                {formData.email}
              </Text>
              <Tag 
                color="blue"
                style={{
                  borderRadius: '20px',
                  padding: '4px 16px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  border: 'none',
                  backgroundColor: '#1890ff',
                  color: '#ffffff'
                }}
              >
                {user?.role || 'Regular User'}
              </Tag>
            </div>
          </div>

          {/* Travel Smarter With RailSetu Badge (Matching uploaded image) */}
          <div 
            style={{
              background: 'linear-gradient(135deg, rgba(13, 71, 161, 0.9) 0%, rgba(10, 37, 85, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}
          >
            <div 
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Train size={24} color="#ffffff" />
            </div>
            <div>
              <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: '1rem', display: 'block' }}>
                Travel Smarter With RailSetu
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
                Book &bull; Track &bull; Explore
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs Bar */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', marginBottom: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}
        bodyStyle={{ padding: '0 24px' }}
      >
        <div style={{ display: 'flex', gap: '36px' }}>
          {[
            { id: 'profile', label: 'Profile Details', icon: <User size={18} /> },
            { id: 'preferences', label: 'Booking Preferences', icon: <Sliders size={18} /> },
            { id: 'password', label: 'Change Password', icon: <Lock size={18} /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 0',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#0d47a1' : '#595959',
                  borderBottom: isActive ? '3px solid #0d47a1' : '3px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3. Main Profile Content Grid */}
      <Row gutter={[24, 24]}>
        
        {/* Left Main Column */}
        <Col xs={24} lg={16}>
          
          {/* Card 1: Personal Information */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={20} color="#0d47a1" />
                  <Title level={4} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                    Personal Information
                  </Title>
                </div>
                <Text type="secondary" style={{ fontSize: '0.85rem' }}>
                  Update your personal details for a smoother booking experience.
                </Text>
              </div>

              {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button onClick={() => setIsEditing(false)} style={{ borderRadius: '8px' }}>
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    icon={<Save size={16} />} 
                    onClick={handleSave}
                    style={{ borderRadius: '8px', backgroundColor: '#0d47a1', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button 
                  type="default"
                  icon={<Edit3 size={15} color="#0d47a1" />}
                  onClick={() => setIsEditing(true)}
                  style={{ 
                    borderRadius: '8px', 
                    color: '#0d47a1', 
                    borderColor: '#90caf9', 
                    backgroundColor: '#e3f2fd',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Edit
                </Button>
              )}
            </div>

            <Row gutter={[16, 20]}>
              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Full Name *</Text></div>
                <Input 
                  size="large"
                  prefix={<User size={16} color="#94a3b8" style={{ marginRight: '8px' }} />}
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{ borderRadius: '10px', backgroundColor: isEditing ? '#ffffff' : '#f8fafc' }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Email Address *</Text></div>
                <Input 
                  size="large"
                  prefix={<Mail size={16} color="#94a3b8" style={{ marginRight: '8px' }} />}
                  value={formData.email}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{ borderRadius: '10px', backgroundColor: isEditing ? '#ffffff' : '#f8fafc' }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Mobile Number *</Text></div>
                <Input 
                  size="large"
                  prefix={<Phone size={16} color="#94a3b8" style={{ marginRight: '8px' }} />}
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  style={{ borderRadius: '10px', backgroundColor: isEditing ? '#ffffff' : '#f8fafc' }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Date of Birth *</Text></div>
                <Input 
                  size="large"
                  prefix={<Calendar size={16} color="#94a3b8" style={{ marginRight: '8px' }} />}
                  value={formData.dob}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  style={{ borderRadius: '10px', backgroundColor: isEditing ? '#ffffff' : '#f8fafc' }}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Gender *</Text></div>
                <Select 
                  size="large"
                  value={formData.gender}
                  disabled={!isEditing}
                  onChange={(val) => handleInputChange('gender', val)}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' }
                  ]}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Nationality *</Text></div>
                <Select 
                  size="large"
                  value={formData.nationality}
                  disabled={!isEditing}
                  onChange={(val) => handleInputChange('nationality', val)}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'Indian', label: 'Indian' },
                    { value: 'NRI', label: 'NRI' },
                    { value: 'Other', label: 'Other' }
                  ]}
                />
              </Col>
            </Row>
          </Card>

          {/* Card 2: Travel Preferences */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            bodyStyle={{ padding: '24px' }}
          >
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Train size={20} color="#0d47a1" />
                <Title level={4} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                  Travel Preferences
                </Title>
              </div>
              <Text type="secondary" style={{ fontSize: '0.85rem' }}>
                Set your preferences for a better booking experience.
              </Text>
            </div>

            <Row gutter={[16, 20]}>
              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Preferred Class</Text></div>
                <Select 
                  size="large"
                  value={formData.preferredClass}
                  disabled={!isEditing}
                  onChange={(val) => handleInputChange('preferredClass', val)}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'SL', label: 'Sleeper (SL)' },
                    { value: '3A', label: 'AC 3 Tier (3A)' },
                    { value: '2A', label: 'AC 2 Tier (2A)' },
                    { value: '1A', label: 'AC First Class (1A)' },
                    { value: 'CC', label: 'AC Chair Car (CC)' }
                  ]}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Preferred Berth</Text></div>
                <Select 
                  size="large"
                  value={formData.preferredBerth}
                  disabled={!isEditing}
                  onChange={(val) => handleInputChange('preferredBerth', val)}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'No Preference', label: 'No Preference' },
                    { value: 'Lower', label: 'Lower Berth' },
                    { value: 'Middle', label: 'Middle Berth' },
                    { value: 'Upper', label: 'Upper Berth' },
                    { value: 'Side Lower', label: 'Side Lower' },
                    { value: 'Side Upper', label: 'Side Upper' }
                  ]}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Food Preference</Text></div>
                <Select 
                  size="large"
                  value={formData.foodPreference}
                  disabled={!isEditing}
                  onChange={(val) => handleInputChange('foodPreference', val)}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'Veg', label: 'Veg' },
                    { value: 'Non-Veg', label: 'Non-Veg' },
                    { value: 'Jain', label: 'Jain Food' },
                    { value: 'No Food', label: 'No Food Required' }
                  ]}
                />
              </Col>

              <Col span={12}>
                <div style={{ marginBottom: '6px' }}><Text strong style={{ color: '#334155', fontSize: '0.85rem' }}>Disability Concession</Text></div>
                <Select 
                  size="large"
                  value={formData.disabilityConcession}
                  disabled={!isEditing}
                  onChange={(val) => handleInputChange('disabilityConcession', val)}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'None', label: 'None' },
                    { value: 'Physically Handicapped', label: 'Physically Handicapped' },
                    { value: 'Visually Impaired', label: 'Visually Impaired' }
                  ]}
                />
              </Col>
            </Row>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <Checkbox 
                checked={formData.notificationsOptIn} 
                onChange={(e) => handleInputChange('notificationsOptIn', e.target.checked)}
                style={{ color: '#475569', fontSize: '0.85rem' }}
              >
                I agree to receive updates on offers, discounts and important notifications.
              </Checkbox>
            </div>
          </Card>
        </Col>

        {/* Right Sidebar Column */}
        <Col xs={24} lg={8}>
          
          {/* Card 1: Quick Actions */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={18} color="#0d47a1" />
              <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                Quick Actions
              </Title>
            </div>

            <Row gutter={[12, 12]}>
              {[
                { label: 'Book Ticket', icon: <Ticket size={18} color="#0d47a1" />, path: '/book' },
                { label: 'PNR Status', icon: <Search size={18} color="#0d47a1" />, path: '/pnr' },
                { label: 'Live Train Status', icon: <Train size={18} color="#0d47a1" />, path: '/live' },
                { label: 'Cancel Ticket', icon: <XCircle size={18} color="#0d47a1" />, path: '/my-bookings' }
              ].map((action, idx) => (
                <Col span={12} key={idx}>
                  <div
                    onClick={() => navigate(action.path)}
                    style={{
                      padding: '14px 10px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#90caf9';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(13,71,161,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.01)';
                    }}
                  >
                    {action.icon}
                    <Text style={{ fontSize: '0.8rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>
                      {action.label}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Card 2: Saved Information */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#0d47a1" />
                <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                  Saved Information
                </Title>
              </div>
              <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block', marginTop: '2px' }}>
                Your travel information is securely stored for faster booking.
              </Text>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'Passenger Details', count: '1 saved', icon: <User size={16} color="#0d47a1" /> },
                { title: 'Payment Methods', count: '1 saved', icon: <ShieldCheck size={16} color="#0d47a1" /> },
                { title: 'Frequent Routes', count: '2 saved', icon: <Train size={16} color="#0d47a1" /> }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <div>
                      <Text style={{ fontWeight: '600', fontSize: '0.85rem', color: '#1e293b', display: 'block' }}>
                        {item.title}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '0.75rem' }}>
                        ({item.count})
                      </Text>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </div>
              ))}
            </div>
          </Card>

          {/* Card 3: Recent Bookings */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ticket size={18} color="#0d47a1" />
                <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                  Recent Bookings
                </Title>
              </div>
              <Button type="link" onClick={() => navigate('/')} style={{ padding: 0, fontWeight: '600', fontSize: '0.8rem', color: '#0d47a1' }}>
                View All
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {displayBookings.slice(0, 3).map((booking, idx) => (
                <div
                  key={booking._id || idx}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1px solid #f1f5f9',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Train size={18} color="#0d47a1" />
                    </div>
                    <div>
                      <Text style={{ fontWeight: '700', fontSize: '0.88rem', color: '#1e293b', display: 'block' }}>
                        {booking.source} &rarr; {booking.destination}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '0.75rem', display: 'block' }}>
                        {booking.trainNumber} - {booking.trainName}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {booking.journeyDate} &bull; {booking.className}
                      </Text>
                    </div>
                  </div>
                  <Tag 
                    color="green" 
                    style={{
                      borderRadius: '6px',
                      padding: '2px 8px',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      border: 'none',
                      backgroundColor: '#e6f4ea',
                      color: '#137333'
                    }}
                  >
                    Confirmed
                  </Tag>
                </div>
              ))}
            </div>
          </Card>

        </Col>

      </Row>

    </div>
  );
};

export default Profile;
