import React, { useState } from 'react';
import { Card, Input, Button, Typography, Tag, Divider, Row, Col, message } from 'antd';
import { Activity, Search, User, CreditCard } from 'lucide-react';
import axios from 'axios';

const { Title, Text } = Typography;

const PNRStatus = () => {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  const checkStatus = async () => {
    if (!pnr) return message.error("Please enter a valid PNR (Booking ID)");
    
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/services/pnr/${pnr}`);
      setBooking(data);
    } catch (error) {
      message.error("Invalid PNR or Booking not found");
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <Card style={{ borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Activity size={48} color="#0052cc" />
          <Title level={2} style={{ margin: '10px 0 0 0', color: '#1e293b' }}>PNR Status Enquiry</Title>
          <Text type="secondary">Enter your 10-digit PNR / Booking ID to check current status</Text>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Input 
            size="large" 
            placeholder="Enter PNR Number" 
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            prefix={<Search size={18} color="#bfbfbf" />}
            onPressEnter={checkStatus}
          />
          <Button type="primary" size="large" onClick={checkStatus} loading={loading} style={{ background: '#FB792B', borderColor: '#FB792B' }}>
            Check Status
          </Button>
        </div>
      </Card>

      {booking && (
        <Card style={{ marginTop: '24px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={4} style={{ margin: 0, color: '#1e293b' }}>Journey Details</Title>
            <Tag color={booking.status === 'CONFIRMED' ? 'green' : 'orange'}>{booking.status}</Tag>
          </div>
          
          <Row gutter={24}>
            <Col span={12}>
              <Text type="secondary">Train</Text><br />
              <Text strong>{booking.train?.name} ({booking.train?.trainNumber})</Text>
            </Col>
            <Col span={12}>
              <Text type="secondary">Class</Text><br />
              <Text strong>{booking.selectedClass}</Text>
            </Col>
          </Row>
          <Divider />
          
          <Title level={5} style={{ marginBottom: '16px' }}>Passenger Manifest</Title>
          {booking.passengers.map((p, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f7f9fa', borderRadius: '8px', marginBottom: '10px' }}>
              <div>
                <User size={14} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                <Text strong>{p.passengerId?.name}</Text>
                <Text type="secondary" style={{ marginLeft: 8 }}>({p.passengerId?.age} {p.passengerId?.gender})</Text>
              </div>
              <div>
                <Text type="success" strong>CNF / {p.seatNumber}</Text>
              </div>
            </div>
          ))}
          
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Text type="secondary">Total Fare: </Text>
            <Text strong style={{ fontSize: '1.2rem', color: '#1e293b' }}>₹{booking.totalAmount}</Text>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PNRStatus;
