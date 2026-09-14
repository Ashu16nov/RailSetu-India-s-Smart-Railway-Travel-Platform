import React from 'react';
import { Form, Input, Button, Typography, message, Divider } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import AuthLayout from '../components/AuthLayout';
import { Train, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { GoogleOutlined, AppleOutlined, WindowsOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const register = useAuthStore(state => state.register);
  const loading = useAuthStore(state => state.loading);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await register(values.name, values.email, values.password, values.phone);
    const user = useAuthStore.getState().user;
    if (user) {
      message.success('Registration successful! Please link Aadhaar.');
      navigate('/profile');
    } else {
      message.error(useAuthStore.getState().error || 'Registration failed');
    }
  };

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <Train color="#0d47a1" size={36} strokeWidth={2} />
        </div>
        <div style={{ color: '#001529', fontSize: '1.8rem', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.5px' }}>
          Rail<span style={{ color: '#FB792B' }}>Setu</span>
        </div>
        <Text style={{ fontSize: '0.6rem', color: '#595959', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', marginTop: '3px', display: 'block' }}>
          INDIAN RAILWAY BOOKING & TRAVEL
        </Text>
      </div>

      <Title level={3} style={{ color: '#00234b', marginBottom: '3px', fontWeight: '800', fontSize: '1.3rem' }}>
        Create an Account
      </Title>
      <Text style={{ color: '#595959', display: 'block', marginBottom: '15px', fontSize: '0.85rem' }}>
        Sign up to start booking your train journeys
      </Text>

      <Form form={form} layout="vertical" onFinish={onFinish} size="large">
        <Form.Item name="name" rules={[{ required: true, message: 'Please input your full name!' }]} style={{ marginBottom: '12px' }}>
          <Input 
            prefix={<User size={16} color="#8c8c8c" style={{ marginRight: '8px' }}/>} 
            placeholder="Full Name" 
            style={{ borderRadius: '10px', padding: '8px 15px', background: '#fdfdfd', borderColor: '#e8e8e8' }}
          />
        </Form.Item>
        
        <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]} style={{ marginBottom: '12px' }}>
          <Input 
            prefix={<Mail size={16} color="#8c8c8c" style={{ marginRight: '8px' }}/>} 
            placeholder="Email Address" 
            style={{ borderRadius: '10px', padding: '8px 15px', background: '#fdfdfd', borderColor: '#e8e8e8' }}
          />
        </Form.Item>

        <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]} style={{ marginBottom: '12px' }}>
          <Input 
            prefix={<Phone size={16} color="#8c8c8c" style={{ marginRight: '8px' }}/>} 
            placeholder="Phone Number" 
            style={{ borderRadius: '10px', padding: '8px 15px', background: '#fdfdfd', borderColor: '#e8e8e8' }}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} style={{ marginBottom: '15px' }}>
          <Input.Password 
            prefix={<Lock size={16} color="#8c8c8c" style={{ marginRight: '8px' }}/>} 
            placeholder="Password" 
            style={{ borderRadius: '10px', padding: '8px 15px', background: '#fdfdfd', borderColor: '#e8e8e8' }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: '15px' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            loading={loading}
            style={{ 
              borderRadius: '10px', 
              height: '42px', 
              fontSize: '1rem',
              fontWeight: '600',
              background: '#0d47a1', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(13, 71, 161, 0.2)'
            }}
          >
            Sign Up <ArrowRight size={16} />
          </Button>
        </Form.Item>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', opacity: 0.7 }}>
          <div style={{ flex: 1, height: '1px', background: '#d9d9d9' }} />
          <span style={{ padding: '0 15px', color: '#8c8c8c', fontSize: '0.85rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#d9d9d9' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '40px', border: '1px solid #e8e8e8', borderRadius: '10px', background: '#fff', cursor: 'pointer', transition: 'all 0.3s' }} className="social-btn">
            <GoogleOutlined style={{ fontSize: '18px', color: '#DB4437' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '40px', border: '1px solid #e8e8e8', borderRadius: '10px', background: '#fff', cursor: 'pointer', transition: 'all 0.3s' }} className="social-btn">
            <AppleOutlined style={{ fontSize: '20px', color: '#000' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '40px', border: '1px solid #e8e8e8', borderRadius: '10px', background: '#fff', cursor: 'pointer', transition: 'all 0.3s' }} className="social-btn">
            <WindowsOutlined style={{ fontSize: '18px', color: '#00a4ef' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#595959', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#0d47a1', fontWeight: '700', marginLeft: '5px' }}>Login</Link>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Register;
