import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Form, Select, Button, message, Checkbox, Spin } from 'antd';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const { Title, Text } = Typography;
const { Option } = Select;

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [passengers, setPassengers] = useState([]);
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quota, setQuota] = useState('GENERAL');

  const { train, searchParams, selectedClass } = location.state || {};

  useEffect(() => {
    if (!train) navigate('/');
    if (user) fetchPassengers();
  }, [train, user, navigate]);

  const fetchPassengers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/passengers', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPassengers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBook = async () => {
    if (selectedPassengers.length === 0) return message.error('Select at least one passenger');
    
    // Aadhaar requirement for Tatkal
    if (quota === 'TATKAL' && !user.isAadhaarVerified) {
      return message.error('Aadhaar verification is required for Tatkal bookings.');
    }

    setLoading(true);
    
    try {
      const payload = {
        trainId: train._id,
        journeyDate: searchParams.date,
        source: searchParams.from,
        destination: searchParams.to,
        className: selectedClass.className,
        quota,
        totalFare: selectedClass.fare * selectedPassengers.length,
        passengers: selectedPassengers
      };

      await axios.post('http://localhost:5000/api/bookings', payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      message.success('Booking Successful!');
      navigate('/my-bookings');
    } catch (error) {
      message.error(error.response?.data?.message || 'Booking Failed');
    } finally {
      setLoading(false);
    }
  };

  if (!train) return <Spin />;
  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Please login to book tickets.</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <Title level={2}>Book Ticket</Title>
      <Card title={`Train: ${train.trainNumber} - ${train.name}`} style={{ marginBottom: '1rem' }}>
        <p><Text strong>Route:</Text> {searchParams.from} to {searchParams.to}</p>
        <p><Text strong>Date:</Text> {searchParams.date.format('YYYY-MM-DD')}</p>
        <p><Text strong>Class:</Text> {selectedClass.className} (₹{selectedClass.fare}/passenger)</p>
        <Form.Item label="Select Quota">
          <Select value={quota} onChange={setQuota} style={{ width: 150 }}>
            <Option value="GENERAL">General</Option>
            <Option value="TATKAL">Tatkal</Option>
            <Option value="LADIES">Ladies</Option>
          </Select>
        </Form.Item>
      </Card>

      <Card title="Select Passengers (Master List)">
        {passengers.length === 0 ? (
          <p>No passengers found. Please add them in your Profile.</p>
        ) : (
          <Checkbox.Group style={{ width: '100%' }} onChange={(checkedValues) => {
            const selected = passengers.filter(p => checkedValues.includes(p._id));
            setSelectedPassengers(selected);
          }}>
            {passengers.map(p => (
              <div key={p._id} style={{ marginBottom: '10px' }}>
                <Checkbox value={p._id}>{p.name} ({p.age} {p.gender})</Checkbox>
              </div>
            ))}
          </Checkbox.Group>
        )}
      </Card>

      <Card style={{ marginTop: '1rem', textAlign: 'right' }}>
        <Title level={4}>Total Fare: ₹{selectedClass.fare * selectedPassengers.length}</Title>
        <Button type="primary" size="large" onClick={handleBook} loading={loading} disabled={selectedPassengers.length === 0}>
          Pay & Book Now
        </Button>
      </Card>
    </div>
  );
};

export default Booking;
