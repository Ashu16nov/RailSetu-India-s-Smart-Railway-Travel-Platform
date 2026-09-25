import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Input, 
  Select, 
  Button, 
  Tag, 
  Avatar, 
  message, 
  Divider,
  Form,
  Switch
} from 'antd';
import { 
  Settings as SettingsIcon, 
  User, 
  Lock, 
  Bell, 
  Train, 
  CreditCard, 
  Shield, 
  HelpCircle, 
  Edit3, 
  Save, 
  CheckCircle2, 
  Headphones, 
  Phone, 
  MessageSquare, 
  Key, 
  Smartphone, 
  ChevronRight, 
  Utensils, 
  Accessibility, 
  Bed,
  Check,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const { Title, Text } = Typography;
const { Option } = Select;

const Settings = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);

  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);

  // Initial Form Data from auth store
  const [formData, setFormData] = useState({
    name: user?.name || 'Ashu Kumar',
    email: user?.email || 'ashukumar@example.com',
    phone: user?.phone || '+91 9876543210',
    dob: user?.dob || '15 Apr 2002',
    gender: user?.gender || 'Male',
    nationality: user?.nationality || 'Indian',
    addressLine1: user?.addressLine1 || '123, Green Park',
    addressLine2: user?.addressLine2 || 'Near Metro Station',
    city: user?.city || 'New Delhi',
    state: user?.state || 'Delhi',
    pincode: user?.pincode || '110016',
    preferredClass: user?.preferredClass || 'SL',
    preferredBerth: user?.preferredBerth || 'No Preference',
    foodPreference: user?.foodPreference || 'Veg',
    disabilityConcession: user?.disabilityConcession || 'None'
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
    setIsEditing(false);
    message.success('Account settings and preferences updated successfully!');
  };

  const navItems = [
    {
      key: 'account',
      title: 'Account Settings',
      subtitle: 'Personal details & contact info',
      icon: <User size={18} />
    },
    {
      key: 'security',
      title: 'Security',
      subtitle: 'Password & two-factor authentication',
      icon: <Lock size={18} />
    },
    {
      key: 'notifications',
      title: 'Notification Preferences',
      subtitle: 'Email, SMS & alerts',
      icon: <Bell size={18} />
    },
    {
      key: 'travel',
      title: 'Travel Preferences',
      subtitle: 'Seat, food, berth & more',
      icon: <Train size={18} />
    },
    {
      key: 'payment',
      title: 'Payment Methods',
      subtitle: 'Cards, UPI & wallet',
      icon: <CreditCard size={18} />
    },
    {
      key: 'privacy',
      title: 'Privacy',
      subtitle: 'Data & account visibility',
      icon: <Shield size={18} />
    },
    {
      key: 'support',
      title: 'Help & Support',
      subtitle: 'FAQs, contact us',
      icon: <HelpCircle size={18} />
    }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div 
          style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '14px', 
            backgroundColor: '#0d1b2a', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(13,27,42,0.15)'
          }}
        >
          <SettingsIcon size={24} color="#ffffff" />
        </div>
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: '800', color: '#001529', letterSpacing: '-0.5px' }}>
            Settings
          </Title>
          <Text style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Manage your account settings, preferences and security.
          </Text>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        
        {/* Left Column - Sub-tab Navigation Panel */}
        <Col xs={24} md={8} lg={7}>
          <Card 
            bordered={false} 
            style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden' }}
            bodyStyle={{ padding: '12px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navItems.map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <div
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 16px',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      backgroundColor: isActive ? '#e6f0fa' : 'transparent',
                      borderLeft: isActive ? '4px solid #1890ff' : '4px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div 
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: isActive ? '#1890ff' : '#f1f5f9',
                        color: isActive ? '#ffffff' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text 
                        strong 
                        style={{ 
                          display: 'block', 
                          fontSize: '0.92rem', 
                          color: isActive ? '#0d47a1' : '#1e293b',
                          fontWeight: isActive ? '700' : '600',
                          lineHeight: 1.2,
                          marginBottom: '2px'
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text 
                        style={{ 
                          fontSize: '0.74rem', 
                          color: isActive ? '#3b82f6' : '#94a3b8',
                          display: 'block',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.subtitle}
                      </Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>

        {/* Center Column - Settings Content Form */}
        <Col xs={24} md={16} lg={11}>
          
          {/* Main Account Settings Card */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '24px' }}
            bodyStyle={{ padding: '28px' }}
          >
            {/* Header with Edit/Save Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <Title level={4} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                  {navItems.find(i => i.key === activeTab)?.title || 'Account Settings'}
                </Title>
                <Text style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {navItems.find(i => i.key === activeTab)?.subtitle || 'Update your personal details & preferences.'}
                </Text>
              </div>
              <Button 
                type={isEditing ? 'primary' : 'default'}
                icon={isEditing ? <Save size={16} /> : <Edit3 size={16} />}
                onClick={() => {
                  if (isEditing) handleSave();
                  else setIsEditing(true);
                }}
                style={{ 
                  borderRadius: '10px', 
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>

            {/* Sub-Tab 1: Account Settings */}
            {activeTab === 'account' && (
              <div>
                {/* Profile Avatar Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <Avatar 
                    size={70} 
                    icon={<User size={38} color="#0d47a1" />}
                    style={{ backgroundColor: '#e3f2fd', border: '3px solid #ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  />
                  <div>
                    <Title level={4} style={{ margin: 0, fontWeight: '800', color: '#1e293b', lineHeight: 1.2 }}>
                      {formData.name}
                    </Title>
                    <Text style={{ fontSize: '0.88rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                      {formData.email}
                    </Text>
                    <Tag 
                      color="blue" 
                      style={{ 
                        borderRadius: '12px', 
                        padding: '2px 10px', 
                        fontWeight: '700', 
                        fontSize: '0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ShieldCheck size={12} /> {user?.role || 'Regular User'}
                    </Tag>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div style={{ marginBottom: '28px' }}>
                  <Title level={5} style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>
                    Personal Information
                  </Title>

                  <Row gutter={[20, 16]}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Full Name</Text>
                      {isEditing ? (
                        <Input 
                          value={formData.name} 
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          style={{ borderRadius: '8px' }} 
                        />
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.name}</Text>
                      )}
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Mobile Number</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isEditing ? (
                          <Input 
                            value={formData.phone} 
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            style={{ borderRadius: '8px' }} 
                          />
                        ) : (
                          <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.phone}</Text>
                        )}
                        <Tag color="green" style={{ borderRadius: '10px', fontWeight: '700', fontSize: '0.72rem', border: 'none', backgroundColor: '#e6f4ea', color: '#137333' }}>
                          ✔ Verified
                        </Tag>
                      </div>
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Gender</Text>
                      {isEditing ? (
                        <Select 
                          value={formData.gender} 
                          onChange={(val) => handleInputChange('gender', val)}
                          style={{ width: '100%' }}
                        >
                          <Option value="Male">Male</Option>
                          <Option value="Female">Female</Option>
                          <Option value="Other">Other</Option>
                        </Select>
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.gender}</Text>
                      )}
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Email Address</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isEditing ? (
                          <Input 
                            value={formData.email} 
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            style={{ borderRadius: '8px' }} 
                          />
                        ) : (
                          <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.email}</Text>
                        )}
                        <Tag color="green" style={{ borderRadius: '10px', fontWeight: '700', fontSize: '0.72rem', border: 'none', backgroundColor: '#e6f4ea', color: '#137333' }}>
                          ✔ Verified
                        </Tag>
                      </div>
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Date of Birth</Text>
                      {isEditing ? (
                        <Input 
                          value={formData.dob} 
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          style={{ borderRadius: '8px' }} 
                        />
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.dob}</Text>
                      )}
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Nationality</Text>
                      {isEditing ? (
                        <Input 
                          value={formData.nationality} 
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          style={{ borderRadius: '8px' }} 
                        />
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.nationality}</Text>
                      )}
                    </Col>
                  </Row>
                </div>

                <Divider style={{ margin: '20px 0' }} />

                {/* Contact Address Section */}
                <div style={{ marginBottom: '28px' }}>
                  <Title level={5} style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>
                    Contact Address
                  </Title>

                  <Row gutter={[20, 16]}>
                    <Col span={24}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Address Line 1</Text>
                      {isEditing ? (
                        <Input 
                          value={formData.addressLine1} 
                          onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                          style={{ borderRadius: '8px' }} 
                        />
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.addressLine1}</Text>
                      )}
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Address Line 2</Text>
                      {isEditing ? (
                        <Input 
                          value={formData.addressLine2} 
                          onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                          style={{ borderRadius: '8px' }} 
                        />
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.addressLine2}</Text>
                      )}
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>State</Text>
                      <Select 
                        value={formData.state} 
                        onChange={(val) => handleInputChange('state', val)}
                        style={{ width: '100%', borderRadius: '8px' }}
                        disabled={!isEditing}
                      >
                        <Option value="Delhi">Delhi</Option>
                        <Option value="Uttar Pradesh">Uttar Pradesh</Option>
                        <Option value="Maharashtra">Maharashtra</Option>
                        <Option value="Karnataka">Karnataka</Option>
                        <Option value="Tamil Nadu">Tamil Nadu</Option>
                        <Option value="West Bengal">West Bengal</Option>
                      </Select>
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>City</Text>
                      {isEditing ? (
                        <Input 
                          value={formData.city} 
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          style={{ borderRadius: '8px' }} 
                        />
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.city}</Text>
                      )}
                    </Col>

                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>PIN Code</Text>
                      {isEditing ? (
                        <Input 
                          value={formData.pincode} 
                          onChange={(e) => handleInputChange('pincode', e.target.value)}
                          style={{ borderRadius: '8px' }} 
                        />
                      ) : (
                        <Text strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>{formData.pincode}</Text>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Security */}
            {activeTab === 'security' && (
              <div>
                <Title level={5} style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>
                  Change Password
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  <div>
                    <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Current Password</Text>
                    <Input.Password placeholder="Enter current password" style={{ borderRadius: '8px', height: '40px' }} />
                  </div>
                  <div>
                    <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>New Password</Text>
                    <Input.Password placeholder="Enter new password" style={{ borderRadius: '8px', height: '40px' }} />
                  </div>
                  <div>
                    <Text type="secondary" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '4px' }}>Confirm New Password</Text>
                    <Input.Password placeholder="Confirm new password" style={{ borderRadius: '8px', height: '40px' }} />
                  </div>
                </div>

                <Divider style={{ margin: '20px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <Text strong style={{ fontSize: '0.95rem', color: '#1e293b', display: 'block' }}>Two-Factor Authentication (2FA)</Text>
                    <Text type="secondary" style={{ fontSize: '0.78rem' }}>Require an OTP sent to your phone/email when logging in.</Text>
                  </div>
                  <Switch defaultChecked onChange={(checked) => message.success(`2FA ${checked ? 'enabled' : 'disabled'}`)} />
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Notifications */}
            {activeTab === 'notifications' && (
              <div>
                <Title level={5} style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>
                  Notification Settings
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
                  {[
                    { label: 'Booking & PNR Updates', desc: 'Receive instant notifications for ticket status and delays', default: true },
                    { label: 'Email Alerts', desc: 'Send e-Tickets and invoices directly to your registered email', default: true },
                    { label: 'SMS & WhatsApp Updates', desc: 'Get updates on your phone number via SMS/WhatsApp', default: true },
                    { label: 'Promotional Offers', desc: 'Receive discount coupons, festival special train alerts & news', default: false }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                      <div>
                        <Text strong style={{ fontSize: '0.9rem', color: '#1e293b', display: 'block' }}>{item.label}</Text>
                        <Text type="secondary" style={{ fontSize: '0.78rem' }}>{item.desc}</Text>
                      </div>
                      <Switch defaultChecked={item.default} onChange={(val) => message.info(`${item.label} ${val ? 'enabled' : 'disabled'}`)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Tab 4: Travel Preferences */}
            {(activeTab === 'travel' || activeTab === 'account') && (
              <div 
                style={{
                  backgroundColor: '#f0f7ff',
                  border: '1px solid #bae0ff',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '28px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Train size={20} color="#1890ff" />
                  <div>
                    <Text strong style={{ fontSize: '0.95rem', color: '#002766', display: 'block' }}>
                      Travel Preferences
                    </Text>
                    <Text style={{ fontSize: '0.78rem', color: '#0050b3' }}>
                      Set your default preferences for a faster booking experience.
                    </Text>
                  </div>
                </div>

                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block', marginBottom: '4px' }}>Preferred Class</Text>
                    <Select 
                      value={formData.preferredClass} 
                      onChange={(val) => handleInputChange('preferredClass', val)}
                      style={{ width: '100%' }}
                    >
                      <Option value="SL">Sleeper (SL)</Option>
                      <Option value="3A">AC 3 Tier (3A)</Option>
                      <Option value="2A">AC 2 Tier (2A)</Option>
                      <Option value="1A">AC 1st Class (1A)</Option>
                      <Option value="CC">AC Chair Car (CC)</Option>
                    </Select>
                  </Col>

                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block', marginBottom: '4px' }}>Preferred Berth</Text>
                    <Select 
                      value={formData.preferredBerth} 
                      onChange={(val) => handleInputChange('preferredBerth', val)}
                      style={{ width: '100%' }}
                    >
                      <Option value="No Preference">No Preference</Option>
                      <Option value="Lower">Lower Berth</Option>
                      <Option value="Middle">Middle Berth</Option>
                      <Option value="Upper">Upper Berth</Option>
                      <Option value="Side Lower">Side Lower</Option>
                      <Option value="Side Upper">Side Upper</Option>
                    </Select>
                  </Col>

                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block', marginBottom: '4px' }}>Food Preference</Text>
                    <Select 
                      value={formData.foodPreference} 
                      onChange={(val) => handleInputChange('foodPreference', val)}
                      style={{ width: '100%' }}
                    >
                      <Option value="Veg">Veg</Option>
                      <Option value="Non-Veg">Non-Veg</Option>
                      <Option value="Jain">Jain Food</Option>
                      <Option value="No Food">No Food Required</Option>
                    </Select>
                  </Col>

                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '0.78rem', display: 'block', marginBottom: '4px' }}>Disability Concession</Text>
                    <Select 
                      value={formData.disabilityConcession} 
                      onChange={(val) => handleInputChange('disabilityConcession', val)}
                      style={{ width: '100%' }}
                    >
                      <Option value="None">None</Option>
                      <Option value="Divyangjan">Divyangjan Concession</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            )}

            {/* Sub-Tab 5: Payment Methods */}
            {activeTab === 'payment' && (
              <div>
                <Title level={5} style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>
                  Saved Payment Methods
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CreditCard size={24} color="#1890ff" />
                      <div>
                        <Text strong style={{ fontSize: '0.9rem', color: '#1e293b', display: 'block' }}>UPI ID (Google Pay / PhonePe)</Text>
                        <Text type="secondary" style={{ fontSize: '0.78rem' }}>ashukumar@upi</Text>
                      </div>
                    </div>
                    <Tag color="blue">Default</Tag>
                  </div>
                  <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CreditCard size={24} color="#0d47a1" />
                      <div>
                        <Text strong style={{ fontSize: '0.9rem', color: '#1e293b', display: 'block' }}>HDFC Bank Debit Card</Text>
                        <Text type="secondary" style={{ fontSize: '0.78rem' }}>•••• •••• •••• 4512</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 6: Privacy */}
            {activeTab === 'privacy' && (
              <div>
                <Title level={5} style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>
                  Privacy & Data Sharing
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                    <div>
                      <Text strong style={{ fontSize: '0.9rem', color: '#1e293b', display: 'block' }}>Profile Visibility</Text>
                      <Text type="secondary" style={{ fontSize: '0.78rem' }}>Allow co-passengers to see basic profile details</Text>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                    <div>
                      <Text strong style={{ fontSize: '0.9rem', color: '#1e293b', display: 'block' }}>Personalized Recommendations</Text>
                      <Text type="secondary" style={{ fontSize: '0.78rem' }}>Use travel history for smart train suggestions</Text>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 7: Help & Support */}
            {activeTab === 'support' && (
              <div>
                <Title level={5} style={{ color: '#1e293b', fontWeight: '700', marginBottom: '16px' }}>
                  RailSetu Customer Care & Support
                </Title>
                <div style={{ backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                  <Text strong style={{ color: '#0050b3', display: 'block', fontSize: '0.95rem' }}>24x7 Railway Helpline Number</Text>
                  <Text style={{ color: '#003a8c', fontSize: '1.2rem', fontWeight: '800' }}>📞 Dial 139</Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Button type="primary" block style={{ height: '42px', borderRadius: '8px', fontWeight: '600' }} onClick={() => message.info('Opening live chat with RailSetu Assistant')}>
                    Chat with RailSetu Support
                  </Button>
                </div>
              </div>
            )}

            {/* Bottom Save Changes Button */}
            <Button 
              type="primary"
              size="large"
              block
              icon={<Save size={18} />}
              onClick={handleSave}
              style={{
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#1890ff',
                fontWeight: '700',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(24,144,255,0.3)',
                marginTop: '20px'
              }}
            >
              Save Changes
            </Button>

          </Card>

        </Col>

        {/* Right Column - Widgets & Help Sidebars */}
        <Col xs={24} lg={6}>
          
          {/* Card 1: Scenic Mountain Banner Card */}
          <div 
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '140px',
              marginBottom: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Your Account"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.3) 100%)',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} color="#ffffff" />
                </div>
                <div>
                  <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '1rem', display: 'block', lineHeight: 1.1 }}>
                    Your Account
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.74rem' }}>
                    Safe • Secure • Always with you
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <SettingsIcon size={18} color="#1890ff" />
              <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>
                Quick Actions
              </Title>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  title: 'Change Password',
                  desc: 'Update your login password',
                  icon: <MessageSquare size={16} color="#1890ff" />,
                  action: () => message.info('Password change modal opened')
                },
                {
                  title: 'Enable 2FA',
                  desc: 'Add an extra layer of security',
                  icon: <ShieldCheck size={16} color="#1890ff" />,
                  action: () => message.info('2FA settings opened')
                },
                {
                  title: 'Manage Devices',
                  desc: 'View and manage your devices',
                  icon: <Smartphone size={16} color="#1890ff" />,
                  action: () => message.info('Device session details opened')
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  onClick={item.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e6f0fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <div>
                      <Text strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block', lineHeight: 1.2 }}>
                        {item.title}
                      </Text>
                      <Text style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {item.desc}
                      </Text>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </div>
              ))}
            </div>
          </Card>

          {/* Card 3: Need Help? */}
          <Card 
            bordered={false} 
            style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '20px' }}
            bodyStyle={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Headphones size={18} color="#1890ff" />
              <div>
                <Title level={5} style={{ margin: 0, fontWeight: '700', color: '#1e293b', lineHeight: 1.2 }}>
                  Need Help?
                </Title>
                <Text style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  Our support team is here for you
                </Text>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  title: 'Frequently Asked Questions',
                  desc: 'Find answers to common queries',
                  icon: <HelpCircle size={16} color="#1890ff" />
                },
                {
                  title: 'Contact Support',
                  desc: 'Get in touch with our team',
                  icon: <Phone size={16} color="#1890ff" />
                },
                {
                  title: 'Raise a Complaint',
                  desc: 'Report an issue or give feedback',
                  icon: <MessageSquare size={16} color="#1890ff" />
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: '#f8fafc',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#e6f0fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <div>
                      <Text strong style={{ fontSize: '0.85rem', color: '#1e293b', display: 'block', lineHeight: 1.2 }}>
                        {item.title}
                      </Text>
                      <Text style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        {item.desc}
                      </Text>
                    </div>
                  </div>
                  <ChevronRight size={16} color="#94a3b8" />
                </div>
              ))}
            </div>
          </Card>

          {/* Card 4: Safety Priority Banner */}
          <div 
            style={{
              backgroundColor: '#e6f0fa',
              borderRadius: '20px',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #bae0ff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <ShieldCheck size={22} color="#1890ff" />
              <Text strong style={{ color: '#002766', fontSize: '0.92rem' }}>
                Your safety is our priority
              </Text>
            </div>
            <Text style={{ color: '#0050b3', fontSize: '0.78rem', display: 'block', lineHeight: 1.4 }}>
              We use advanced security measures to keep your data safe.
            </Text>
          </div>

        </Col>

      </Row>

    </div>
  );
};

export default Settings;
