import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Input, Button, Avatar, Space, message, Badge } from 'antd';
import { Users, Search, ShieldCheck, Mail, Phone, Lock, CheckCircle2, UserX } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const { Title, Text } = Typography;

const AdminUsers = () => {
  const currentUser = useAuthStore(state => state.user);
  const [searchText, setSearchText] = useState('');

  const mockUsers = [
    { id: '1', name: 'Ashu', email: 'user@railsetu.com', phone: '+91 9876543210', role: 'Regular User', aadhaarVerified: true, city: 'New Delhi', bookingsCount: 4 },
    { id: '2', name: 'System Administrator', email: 'admin@railsetu.com', phone: '+91 9000000000', role: 'Admin', aadhaarVerified: true, city: 'New Delhi', bookingsCount: 12 },
    { id: '3', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '+91 9123456789', role: 'Regular User', aadhaarVerified: true, city: 'Patna', bookingsCount: 2 },
    { id: '4', name: 'Priya Verma', email: 'priya.v@example.com', phone: '+91 9811223344', role: 'Regular User', aadhaarVerified: false, city: 'Varanasi', bookingsCount: 1 },
    { id: '5', name: 'Vikram Singh', email: 'vikram.s@example.com', phone: '+91 9765432100', role: 'Regular User', aadhaarVerified: true, city: 'Mumbai', bookingsCount: 6 }
  ];

  const filteredUsers = mockUsers.filter(u => 
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
          <Avatar style={{ backgroundColor: record.role === 'Admin' ? '#7c3aed' : '#2563eb', color: '#fff', fontWeight: '800' }}>
            {record.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.95rem', display: 'block' }}>
              {record.name}
            </Text>
            <Text style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
              {record.email}
            </Text>
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
          {role.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'City & Phone',
      key: 'contact',
      render: (record) => (
        <div>
          <Text style={{ color: '#f8fafc', fontWeight: '700', fontSize: '0.85rem' }}>{record.city}</Text>
          <Text style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>{record.phone}</Text>
        </div>
      )
    },
    {
      title: 'Aadhaar Status',
      dataIndex: 'aadhaarVerified',
      key: 'aadhaarVerified',
      render: (verified) => (
        <Tag color={verified ? 'success' : 'warning'} style={{ fontWeight: '700', borderRadius: '6px' }}>
          {verified ? '✓ VERIFIED' : 'PENDING'}
        </Tag>
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
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="small">
          <Button 
            size="small" 
            onClick={() => message.info(`Managing passenger ${record.name}`)}
            style={{ borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}
          >
            Manage User
          </Button>
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
            User Account Database, Aadhaar Verification Status & Platform Roles
          </Text>
        </div>
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
            {filteredUsers.length} Users Found
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
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          style={{ backgroundColor: 'transparent' }}
        />
      </Card>

    </div>
  );
};

export default AdminUsers;
