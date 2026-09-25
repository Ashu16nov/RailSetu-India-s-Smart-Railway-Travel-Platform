import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Input, Button, Avatar, Space, message, Modal, Form, Select, Switch, Popconfirm } from 'antd';
import { Users, Search, Plus, Edit, Trash2, ShieldCheck, Mail, Phone, CheckCircle2, UserX, Shield } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const { Title, Text } = Typography;

const AdminUsers = () => {
  const currentUser = useAuthStore(state => state.user);
  const [usersList, setUsersList] = useState([
    { id: '1', name: 'Ashu', email: 'user@railsetu.com', phone: '+91 9876543210', role: 'Regular User', aadhaarVerified: true, city: 'New Delhi', bookingsCount: 4 },
    { id: '2', name: 'System Administrator', email: 'admin@railsetu.com', phone: '+91 9000000000', role: 'Admin', aadhaarVerified: true, city: 'New Delhi', bookingsCount: 12 },
    { id: '3', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '+91 9123456789', role: 'Regular User', aadhaarVerified: true, city: 'Patna', bookingsCount: 2 },
    { id: '4', name: 'Priya Verma', email: 'priya.v@example.com', phone: '+91 9811223344', role: 'Regular User', aadhaarVerified: false, city: 'Varanasi', bookingsCount: 1 },
    { id: '5', name: 'Vikram Singh', email: 'vikram.s@example.com', phone: '+91 9765432100', role: 'Regular User', aadhaarVerified: true, city: 'Mumbai', bookingsCount: 6 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const handleCreateOrUpdate = (values) => {
    if (editingUser) {
      setUsersList(usersList.map(u => u.id === editingUser.id ? { ...u, ...values } : u));
      message.success(`User account for ${values.name} updated!`);
    } else {
      const newUser = {
        id: 'usr_' + Date.now(),
        ...values,
        bookingsCount: 0
      };
      setUsersList([newUser, ...usersList]);
      message.success(`Passenger account created for ${values.name}!`);
    }
    setIsModalOpen(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleEditClick = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id, name) => {
    setUsersList(usersList.filter(u => u.id !== id));
    message.success(`User account for ${name} deleted successfully`);
  };

  const handleToggleAadhaar = (id) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, aadhaarVerified: !u.aadhaarVerified } : u));
    message.success('Aadhaar verification status updated');
  };

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchText.toLowerCase()) ||
    u.email.toLowerCase().includes(searchText.toLowerCase()) ||
    u.phone.includes(searchText) ||
    u.city.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Passenger Name & Email',
      key: 'name',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar style={{ backgroundColor: record.role === 'Admin' ? '#7c3aed' : '#2563eb', color: '#fff', fontWeight: '800', fontSize: '1rem' }}>
            {(record.name || 'P').charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '1rem', lineHeight: '1.2' }}>
              {record.name || 'Passenger User'}
            </div>
            <div style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: '600', marginTop: '2px' }}>
              {record.email}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'purple' : 'blue'} style={{ fontWeight: '800', border: 'none' }}>
          {role ? role.toUpperCase() : 'USER'}
        </Tag>
      )
    },
    {
      title: 'City & Phone',
      key: 'contact',
      render: (record) => (
        <div>
          <div style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '0.88rem' }}>{record.city}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '2px' }}>{record.phone}</div>
        </div>
      )
    },
    {
      title: 'Aadhaar Verification',
      key: 'aadhaarVerified',
      render: (record) => (
        <Switch
          checked={record.aadhaarVerified}
          onChange={() => handleToggleAadhaar(record.id)}
          checkedChildren="VERIFIED"
          unCheckedChildren="PENDING"
        />
      )
    },
    {
      title: 'Bookings',
      dataIndex: 'bookingsCount',
      key: 'bookingsCount',
      render: (count) => (
        <Text style={{ color: '#fbbf24', fontWeight: '800' }}>{count} Tickets</Text>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <Space size="middle">
          <Button 
            size="small" 
            type="link"
            icon={<Edit size={16} />}
            onClick={() => handleEditClick(record)}
            style={{ color: '#60a5fa' }}
          />
          <Popconfirm
            title={`Delete account for ${record.name}?`}
            onConfirm={() => handleDeleteUser(record.id, record.name)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button size="small" type="link" danger icon={<Trash2 size={16} />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '900', letterSpacing: '-0.5px' }}>
            Passenger Account Registry
          </Title>
          <Text style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            User Account Database, Aadhaar Verification Status & Platform Roles Management
          </Text>
        </div>

        <Button 
          type="primary"
          icon={<Plus size={18} />}
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
          style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#7c3aed', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)' }}
        >
          Add New User Account
        </Button>
      </div>

      {/* FILTER CARD */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }}
        bodyStyle={{ padding: '16px 20px' }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Input 
            prefix={<Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />}
            placeholder="Search passengers by Name, Email, Phone or City..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', height: '42px' }}
          />
          <Text style={{ color: '#94a3b8', fontWeight: '700', whiteSpace: 'nowrap' }}>
            {filteredUsers.length} Users Listed
          </Text>
        </div>
      </Card>

      {/* USERS TABLE */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155' }}
        bodyStyle={{ padding: '0' }}
      >
        <Table 
          className="admin-dark-table"
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </Card>

      {/* CREATE / EDIT USER MODAL */}
      <Modal
        title={<span style={{ color: '#7c3aed', fontWeight: '800', fontSize: '1.2rem' }}>{editingUser ? 'Edit Passenger Account' : 'Add New Passenger Account'}</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={550}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate} style={{ marginTop: '16px' }}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input placeholder="e.g. Ashu" style={{ borderRadius: '8px' }} />
          </Form.Item>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="email" label="Email Address" rules={[{ required: true, message: 'Please enter email' }]} style={{ flex: 1 }}>
              <Input placeholder="e.g. user@railsetu.com" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="+91 9876543210" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Space>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="city" label="City" style={{ flex: 1 }}>
              <Input placeholder="New Delhi" style={{ borderRadius: '8px' }} />
            </Form.Item>
            <Form.Item name="role" label="Account Role" style={{ flex: 1 }}>
              <Select style={{ borderRadius: '8px' }} options={[
                { value: 'Regular User', label: 'Regular User' },
                { value: 'Admin', label: 'Admin' }
              ]} />
            </Form.Item>
          </Space>

          <Form.Item name="aadhaarVerified" label="Aadhaar Verified" valuePropName="checked">
            <Switch checkedChildren="VERIFIED" unCheckedChildren="PENDING" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#7c3aed', fontWeight: '700' }}>
              {editingUser ? 'Save User Changes' : 'Create Account'}
            </Button>
          </div>
        </Form>
      </Modal>

    </div>
  );
};

export default AdminUsers;
