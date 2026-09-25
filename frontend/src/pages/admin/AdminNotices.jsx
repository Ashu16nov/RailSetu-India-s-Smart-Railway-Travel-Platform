import React, { useState } from 'react';
import { Card, Typography, Table, Tag, Button, Modal, Form, Input, Select, Switch, message, Space, Popconfirm } from 'antd';
import { Bell, Plus, Edit, Trash2, Search, AlertCircle, CheckCircle2, Clock, Send } from 'lucide-react';
import useAdminStore from '../../store/useAdminStore';

const { Title, Text } = Typography;

const AdminNotices = () => {
  const notices = useAdminStore(state => state.notices);
  const addNotice = useAdminStore(state => state.addNotice);
  const updateNotice = useAdminStore(state => state.updateNotice);
  const deleteNotice = useAdminStore(state => state.deleteNotice);
  const toggleNoticeActive = useAdminStore(state => state.toggleNoticeActive);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const handleCreateOrUpdate = (values) => {
    if (editingNotice) {
      updateNotice(editingNotice.id, values);
      message.success('System Notice updated successfully');
    } else {
      addNotice(values);
      message.success('Emergency Travel Notice broadcasted to passenger homepages!');
    }
    setIsAddModalOpen(false);
    setEditingNotice(null);
    form.resetFields();
  };

  const handleEditClick = (notice) => {
    setEditingNotice(notice);
    form.setFieldsValue(notice);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteNotice(id);
    message.success('Notice removed from database');
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchText.toLowerCase()) ||
    n.message.toLowerCase().includes(searchText.toLowerCase()) ||
    n.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Notice Title & Category',
      key: 'title',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)', padding: '10px', borderRadius: '10px', color: '#c084fc' }}>
            <Bell size={20} />
          </div>
          <div>
            <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.98rem', display: 'block' }}>
              {record.title}
            </Text>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
              <Tag color="purple" style={{ border: 'none', fontWeight: '700', fontSize: '0.72rem' }}>{record.category}</Tag>
              <Text style={{ color: '#64748b', fontSize: '0.72rem' }}>{record.date}</Text>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Broadcast Content',
      dataIndex: 'message',
      key: 'message',
      render: (msg) => (
        <Text style={{ color: '#cbd5e1', fontSize: '0.88rem', maxWidth: '350px', display: 'block' }}>
          "{msg}"
        </Text>
      )
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (p) => (
        <Tag color={p === 'High' ? 'error' : 'processing'} style={{ fontWeight: '700', borderRadius: '6px' }}>
          {p || 'Normal'}
        </Tag>
      )
    },
    {
      title: 'Broadcast Status',
      key: 'active',
      render: (record) => (
        <Switch 
          checked={record.active} 
          onChange={() => {
            toggleNoticeActive(record.id);
            message.info(`Broadcast status toggled for ${record.title}`);
          }}
          checkedChildren="ACTIVE"
          unCheckedChildren="OFF"
        />
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
            title="Delete this broadcast notice?"
            onConfirm={() => handleDelete(record.id)}
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
            System Notices & Travel Advisories
          </Title>
          <Text style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Create, Edit & Broadcast Maintenance Alerts and Travel Advisories to Passenger Dashboards
          </Text>
        </div>

        <Button 
          type="primary"
          icon={<Plus size={18} />}
          onClick={() => {
            setEditingNotice(null);
            form.resetFields();
            setIsAddModalOpen(true);
          }}
          style={{ borderRadius: '8px', fontWeight: '700', backgroundColor: '#7c3aed', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)' }}
        >
          Create New Notice
        </Button>
      </div>

      {/* SEARCH BAR */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }}
        bodyStyle={{ padding: '16px 20px' }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Input 
            prefix={<Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />}
            placeholder="Search advisories by title or message content..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', height: '42px' }}
          />
          <Text style={{ color: '#94a3b8', fontWeight: '700', whiteSpace: 'nowrap' }}>
            {filteredNotices.length} Advisories Listed
          </Text>
        </div>
      </Card>

      {/* NOTICES TABLE */}
      <Card 
        bordered={false} 
        style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155' }}
        bodyStyle={{ padding: '0' }}
      >
        <Table 
          className="admin-dark-table"
          columns={columns}
          dataSource={filteredNotices}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />
      </Card>

      {/* CREATE / EDIT MODAL */}
      <Modal
        title={<span style={{ color: '#7c3aed', fontWeight: '800', fontSize: '1.2rem' }}>{editingNotice ? 'Edit Advisory Notice' : 'Create Advisory Notice'}</span>}
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        centered
        width={550}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate} style={{ marginTop: '16px' }}>
          <Form.Item name="title" label="Notice Title" rules={[{ required: true, message: 'Required' }]}>
            <Input placeholder="e.g. Patna - Delhi Track Maintenance" style={{ borderRadius: '8px' }} />
          </Form.Item>

          <Space size="middle" style={{ width: '100%', display: 'flex' }}>
            <Form.Item name="category" label="Category" style={{ flex: 1 }}>
              <Select style={{ borderRadius: '8px' }} options={[
                { value: 'Operational Advisory', label: 'Operational Advisory' },
                { value: 'Booking Advisory', label: 'Booking Advisory' },
                { value: 'Festive Announcement', label: 'Festive Announcement' },
                { value: 'Security Notice', label: 'Security Notice' }
              ]} />
            </Form.Item>

            <Form.Item name="priority" label="Priority Level" style={{ flex: 1 }}>
              <Select style={{ borderRadius: '8px' }} options={[
                { value: 'Normal', label: 'Normal' },
                { value: 'High', label: 'High (Alert Banner)' }
              ]} />
            </Form.Item>
          </Space>

          <Form.Item name="message" label="Broadcast Message Content" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Type the message displayed to users..." style={{ borderRadius: '8px' }} />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#7c3aed', fontWeight: '700' }}>
              {editingNotice ? 'Save Changes' : 'Broadcast Advisory'}
            </Button>
          </div>
        </Form>
      </Modal>

    </div>
  );
};

export default AdminNotices;
