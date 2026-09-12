import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Form, Input, message, Table, Modal, Space } from 'antd';
import { ShieldCheck, UserPlus, Trash2 } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';

const { Title, Text } = Typography;

const Profile = () => {
  const { user, verifyAadhaar } = useAuthStore();
  const [passengers, setPassengers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [aadhaarForm] = Form.useForm();
  const [passengerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPassengers();
    }
  }, [user]);

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

  const handleAadhaarVerify = async (values) => {
    const success = await verifyAadhaar(values.aadhaarNumber, values.otp);
    if (success) {
      message.success('Aadhaar Linked Successfully!');
    } else {
      message.error('Invalid OTP or Aadhaar details.');
    }
  };

  const handleAddPassenger = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/passengers', values, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      message.success('Passenger added to Master List!');
      setIsModalVisible(false);
      passengerForm.resetFields();
      fetchPassengers();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to add passenger');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/passengers/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      message.success('Passenger removed');
      fetchPassengers();
    } catch (error) {
      message.error('Failed to remove passenger');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { 
      title: 'Action', 
      key: 'action',
      render: (_, record) => (
        <Button danger type="text" icon={<Trash2 size={16}/>} onClick={() => handleDelete(record._id)} />
      )
    },
  ];

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Please login to view profile.</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <Title level={2}>My Profile</Title>
      
      <Card title="Aadhaar Verification" style={{ marginBottom: '2rem' }}>
        {user.isAadhaarVerified ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'green' }}>
            <ShieldCheck size={24} />
            <Text strong style={{ color: 'green' }}>Your account is Aadhaar Verified.</Text>
            <Text type="secondary">(Hash: {user.aadhaarHash?.substring(0, 8)}...)</Text>
          </div>
        ) : (
          <div>
            <Text type="warning" style={{ display: 'block', marginBottom: '1rem' }}>
              You must verify your Aadhaar to book Tatkal tickets!
            </Text>
            <Form form={aadhaarForm} layout="inline" onFinish={handleAadhaarVerify}>
              <Form.Item name="aadhaarNumber" rules={[{ required: true, message: 'Enter 12-digit Aadhaar' }]}>
                <Input placeholder="Aadhaar Number" maxLength={12} />
              </Form.Item>
              <Form.Item name="otp" rules={[{ required: true, message: 'Enter OTP' }]} help="Use 123456 as mock OTP">
                <Input placeholder="OTP" maxLength={6} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Verify</Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>

      <Card 
        title="Master Passenger List" 
        extra={<Button type="primary" icon={<UserPlus size={16}/>} onClick={() => setIsModalVisible(true)}>Add</Button>}
      >
        <Table dataSource={passengers} columns={columns} rowKey="_id" pagination={false} />
      </Card>

      <Modal title="Add Passenger" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={passengerForm} layout="vertical" onFinish={handleAddPassenger}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
             <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
             <Input type="number" />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
             <Input placeholder="M/F/O" />
          </Form.Item>
          <Form.Item name="aadhaarNumber" label="Aadhaar Number (12 digits)" rules={[{ required: true }]}>
             <Input maxLength={12} />
          </Form.Item>
          <Form.Item>
             <Button type="primary" htmlType="submit" loading={loading} block>Add Passenger</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
