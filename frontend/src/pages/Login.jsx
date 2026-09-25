import React from 'react';
import { Form, Input, Button, Typography, message, Divider, Checkbox } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import AuthLayout from '../components/AuthLayout';
import { Train, Mail, Lock, ArrowRight } from 'lucide-react';
import { GoogleOutlined, AppleOutlined, WindowsOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const login = useAuthStore(state => state.login);
  const loading = useAuthStore(state => state.loading);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await login(values.email, values.password);
    if (success) {
      message.success('Login successful!');
      navigate('/');
    } else {
      const err = useAuthStore.getState().error;
      message.error(err || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <Train color="#0d47a1" size={42} strokeWidth={2} />
          </div>
          <div style={{ color: '#001529', fontSize: '2.2rem', fontWeight: '800', lineHeight: 1, letterSpacing: '-0.5px' }}>
            Rail<span style={{ color: '#FB792B' }}>Setu</span>
          </div>
          <Text style={{ fontSize: '0.65rem', color: '#595959', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: '600', marginTop: '4px', display: 'block' }}>
            INDIAN RAILWAY BOOKING & TRAVEL
          </Text>
        </div>
      </div>

      <Title level={2} style={{ color: '#00234b', marginBottom: '5px', fontWeight: '800', fontSize: '1.6rem' }}>
        Welcome Back!
      </Title>
      <Text style={{ color: '#595959', display: 'block', marginBottom: '20px', fontSize: '0.95rem' }}>
        Login to your account to continue your journey
      </Text>

      <Form form={form} layout="vertical" onFinish={onFinish} size="large">
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]} style={{ marginBottom: '15px' }}>
          <Input 
            prefix={<Mail size={18} color="#8c8c8c" style={{ marginRight: '10px' }}/>} 
            placeholder="Email or Mobile Number" 
            style={{ borderRadius: '10px', padding: '10px 15px', background: '#fdfdfd', borderColor: '#e8e8e8' }}
          />
        </Form.Item>
        
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} style={{ marginBottom: '15px' }}>
          <Input.Password 
            prefix={<Lock size={18} color="#8c8c8c" style={{ marginRight: '10px' }}/>} 
            placeholder="Password" 
            style={{ borderRadius: '10px', padding: '10px 15px', background: '#fdfdfd', borderColor: '#e8e8e8' }}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: '#262626', fontWeight: '500' }}>Remember me</Checkbox>
          </Form.Item>
          <Link to="/forgot-password" style={{ color: '#0d47a1', fontWeight: '600', fontSize: '0.9rem' }}>
            Forgot Password?
          </Link>
        </div>

        <Form.Item style={{ marginBottom: '20px' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            loading={loading}
            style={{ 
              borderRadius: '10px', 
              height: '48px', 
              fontSize: '1.1rem',
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
            Login <ArrowRight size={18} />
          </Button>
        </Form.Item>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', opacity: 0.7 }}>
          <div style={{ flex: 1, height: '1px', background: '#d9d9d9' }} />
          <span style={{ padding: '0 15px', color: '#8c8c8c', fontSize: '0.9rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#d9d9d9' }} />
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70px', height: '45px', border: '1px solid #e8e8e8', borderRadius: '10px', background: '#fff', cursor: 'pointer', transition: 'all 0.3s' }} className="social-btn">
            <GoogleOutlined style={{ fontSize: '20px', color: '#DB4437' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70px', height: '45px', border: '1px solid #e8e8e8', borderRadius: '10px', background: '#fff', cursor: 'pointer', transition: 'all 0.3s' }} className="social-btn">
            <AppleOutlined style={{ fontSize: '22px', color: '#000' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70px', height: '45px', border: '1px solid #e8e8e8', borderRadius: '10px', background: '#fff', cursor: 'pointer', transition: 'all 0.3s' }} className="social-btn">
            <WindowsOutlined style={{ fontSize: '20px', color: '#00a4ef' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#595959', fontSize: '0.95rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#0d47a1', fontWeight: '700', marginLeft: '5px' }}>Sign Up</Link>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Login;
