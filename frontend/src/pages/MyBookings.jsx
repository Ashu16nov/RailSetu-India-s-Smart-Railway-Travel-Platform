import React, { useEffect, useState } from 'react';
import { Card, Typography, Table, Tag, Button, message, Popconfirm } from 'antd';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const { Title, Text } = Typography;

const MyBookings = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/bookings/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      message.success('Booking canceled successfully');
      fetchBookings();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to cancel');
    }
  };

  const columns = [
    { title: 'PNR', dataIndex: 'pnr', key: 'pnr', render: text => <Text strong>{text}</Text> },
    { title: 'Train', dataIndex: ['train', 'name'], key: 'train', render: (_, record) => `${record.train.trainNumber} - ${record.train.name}` },
    { title: 'Journey Date', dataIndex: 'journeyDate', key: 'journeyDate', render: text => new Date(text).toLocaleDateString() },
    { title: 'Status', dataIndex: 'status', key: 'status', render: text => (
        <Tag color={text === 'CONFIRMED' ? 'green' : text === 'CANCELED' ? 'red' : 'orange'}>{text}</Tag>
      ) 
    },
    { title: 'Passengers', dataIndex: 'passengers', key: 'passengers', render: passengers => passengers.length },
    { title: 'Fare', dataIndex: 'totalFare', key: 'totalFare', render: text => `₹${text}` },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status !== 'CANCELED' && (
          <Popconfirm title="Are you sure?" onConfirm={() => handleCancel(record._id)}>
            <Button danger size="small">Cancel</Button>
          </Popconfirm>
        )
      )
    }
  ];

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Please login to view bookings.</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem' }}>
      <Title level={2}>My Bookings</Title>
      <Card>
        <Table 
          dataSource={bookings} 
          columns={columns} 
          rowKey="_id" 
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default MyBookings;
