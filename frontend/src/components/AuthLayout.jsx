import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import { Train, Calendar, MapPin, ShieldCheck, Ticket } from 'lucide-react';

const { Title, Text } = Typography;

const AuthLayout = ({ children }) => {
  return (
    <div style={{ 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      backgroundImage: 'url("/vande_bharat_bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      {/* Overlay gradient to darken the background for text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0,21,41,0.85) 0%, rgba(0,21,41,0.6) 40%, rgba(0,21,41,0.2) 100%)',
          zIndex: 0
        }}
      />
      
      <Row style={{ width: '100%', margin: 0, position: 'relative', zIndex: 1 }}>
        {/* Left Side - Image and Branding */}
        <Col xs={0} sm={0} md={12} lg={13} xl={14} style={{ display: 'flex', flexDirection: 'column', padding: '50px 60px' }}>
          
          {/* Top Logo & Slogan */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Train color="#1890ff" size={45} />
              <div>
                <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '800', lineHeight: 1 }}>
                  Rail<span style={{ color: '#FB792B' }}>Setu</span>
                </div>
                <Text style={{ fontSize: '0.85rem', color: '#e6f7ff', letterSpacing: '1px' }}>
                  Connect • Travel • Explore
                </Text>
              </div>
            </div>
          </div>

          {/* Middle Text */}
          <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <Title level={1} style={{ color: '#fff', fontSize: '4rem', fontWeight: '800', margin: 0, lineHeight: 1.1 }}>
              Your Journey
            </Title>
            <Title level={1} style={{ color: '#1890ff', fontSize: '4rem', fontWeight: '800', margin: '0 0 20px 0', lineHeight: 1.1 }}>
              Our Priority
            </Title>
            <Text style={{ fontSize: '1.2rem', color: '#e6f7ff', display: 'block', maxWidth: '400px', fontWeight: '400', lineHeight: 1.5 }}>
              Book tickets, check schedules, track your journey — all in one place.
            </Text>
          </div>

          {/* Bottom Features */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingRight: '30px' }}>
              <Ticket color="#fff" size={26} strokeWidth={1.5} />
              <Text style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500' }}>Book Tickets</Text>
            </div>
            <Divider type="vertical" style={{ height: '40px', background: 'rgba(255,255,255,0.2)', margin: 0 }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '0 30px' }}>
              <Calendar color="#fff" size={26} strokeWidth={1.5} />
              <Text style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500' }}>Check Schedules</Text>
            </div>
            <Divider type="vertical" style={{ height: '40px', background: 'rgba(255,255,255,0.2)', margin: 0 }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '0 30px' }}>
              <MapPin color="#fff" size={26} strokeWidth={1.5} />
              <Text style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500' }}>Track Live</Text>
            </div>
            <Divider type="vertical" style={{ height: '40px', background: 'rgba(255,255,255,0.2)', margin: 0 }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingLeft: '30px' }}>
              <ShieldCheck color="#fff" size={26} strokeWidth={1.5} />
              <Text style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500' }}>Safe & Secure</Text>
            </div>
          </div>
        </Col>

        {/* Right Side - Form Container */}
        <Col xs={24} sm={24} md={12} lg={11} xl={10} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          
          <div style={{ width: '100%', maxWidth: '480px', display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', padding: '0 20px' }}>
            <div style={{ color: '#e6f7ff', fontSize: '0.85rem', fontWeight: '500' }}>
              Travel Smarter <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span> A Better Tomorrow
            </div>
          </div>

          <div style={{ 
            width: '100%', 
            maxWidth: '480px', 
            background: '#ffffff', 
            padding: '40px 35px', 
            borderRadius: '24px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden',
            margin: '0 20px'
          }}>
            {/* Background track curve decorative element (bottom right) */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '150px',
              height: '150px',
              borderTopLeftRadius: '100%',
              borderTop: '15px dashed #e6f7ff',
              borderLeft: '15px dashed #e6f7ff',
              opacity: 0.6,
              zIndex: 0,
              transform: 'rotate(-15deg)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '-30px',
              width: '120px',
              height: '120px',
              borderTopLeftRadius: '100%',
              borderTop: '15px dashed #e6f7ff',
              borderLeft: '15px dashed #e6f7ff',
              opacity: 0.4,
              zIndex: 0,
              transform: 'rotate(-15deg)'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              {children}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
