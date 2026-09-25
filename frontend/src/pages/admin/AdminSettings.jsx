import React, { useState } from 'react';
import { Card, Typography, Form, Input, Button, Switch, InputNumber, Select, message, Divider, Tag } from 'antd';
import { Settings, ShieldCheck, Database, Lock, RefreshCw, Save, Cpu, Key } from 'lucide-react';
import useAdminStore from '../../store/useAdminStore';

const { Title, Text } = Typography;

const AdminSettings = () => {
  const config = useAdminStore(state => state.config);
  const updateConfig = useAdminStore(state => state.updateConfig);
  const [form] = Form.useForm();

  const handleSaveConfig = (values) => {
    updateConfig(values);
    message.success('Platform Configuration & IRCTC Simulation Parameters updated!');
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ color: '#ffffff', margin: 0, fontWeight: '900', letterSpacing: '-0.5px' }}>
            Platform System Settings
          </Title>
          <Text style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Configure Platform Convenience Fees, Booking Quotas, Maintenance Mode & Gateway Rules
          </Text>
        </div>

        <Tag color="purple" style={{ padding: '6px 14px', fontSize: '0.85rem', fontWeight: '800', borderRadius: '8px' }}>
          Config Version: v2.4.0
        </Tag>
      </div>

      <Form 
        form={form} 
        layout="vertical" 
        initialValues={config} 
        onFinish={handleSaveConfig}
      >
        {/* PLATFORM FEES & QUOTA CONFIGURATION */}
        <Card 
          bordered={false} 
          style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '24px' }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)', padding: '8px', borderRadius: '8px', color: '#c084fc' }}>
              <Settings size={20} />
            </div>
            <Title level={4} style={{ color: '#ffffff', margin: 0, fontWeight: '800' }}>
              Fare Rules & Booking Limits
            </Title>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <Form.Item name="platformFee" label={<span style={{ color: '#cbd5e1', fontWeight: '600' }}>Platform Convenience Fee (₹)</span>}>
              <InputNumber style={{ width: '100%', borderRadius: '8px' }} min={0} max={100} />
            </Form.Item>

            <Form.Item name="maxTicketsPerUser" label={<span style={{ color: '#cbd5e1', fontWeight: '600' }}>Max Tickets Per Transaction</span>}>
              <InputNumber style={{ width: '100%', borderRadius: '8px' }} min={1} max={12} />
            </Form.Item>

            <Form.Item name="irctcSyncInterval" label={<span style={{ color: '#cbd5e1', fontWeight: '600' }}>IRCTC Sync Frequency (Seconds)</span>}>
              <InputNumber style={{ width: '100%', borderRadius: '8px' }} min={5} max={300} />
            </Form.Item>
          </div>
        </Card>

        {/* SYSTEM MAINTENANCE & SECURITY SWITCHES */}
        <Card 
          bordered={false} 
          style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '24px' }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', padding: '8px', borderRadius: '8px', color: '#fcd34d' }}>
              <Cpu size={20} />
            </div>
            <Title level={4} style={{ color: '#ffffff', margin: 0, fontWeight: '800' }}>
              System Operational Controls
            </Title>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div>
                <Text style={{ color: '#ffffff', fontWeight: '800', fontSize: '0.95rem', display: 'block' }}>
                  Platform Maintenance Mode
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  When active, new passenger ticket bookings are temporarily disabled for system upgrades.
                </Text>
              </div>
              <Form.Item name="maintenanceMode" valuePropName="checked" noStyle>
                <Switch checkedChildren="MAINTENANCE" unCheckedChildren="NORMAL" />
              </Form.Item>
            </div>
          </div>
        </Card>

        {/* PAYMENT GATEWAY & API CONFIGURATION */}
        <Card 
          bordered={false} 
          style={{ borderRadius: '16px', backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '24px' }}
          bodyStyle={{ padding: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px', color: '#60a5fa' }}>
              <Database size={20} />
            </div>
            <Title level={4} style={{ color: '#ffffff', margin: 0, fontWeight: '800' }}>
              API Gateway & Backend Endpoints
            </Title>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <Form.Item name="paymentGateway" label={<span style={{ color: '#cbd5e1', fontWeight: '600' }}>Active Payment Provider</span>}>
              <Input style={{ borderRadius: '8px' }} />
            </Form.Item>

            <Form.Item name="apiEndpoint" label={<span style={{ color: '#cbd5e1', fontWeight: '600' }}>Backend Server Base URL</span>}>
              <Input style={{ borderRadius: '8px' }} />
            </Form.Item>
          </div>
        </Card>

        {/* SAVE ACTION */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            type="primary" 
            htmlType="submit"
            icon={<Save size={18} />}
            style={{ 
              borderRadius: '10px', 
              height: '46px', 
              padding: '0 32px', 
              fontWeight: '800', 
              fontSize: '1rem',
              backgroundColor: '#7c3aed',
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)'
            }}
          >
            Save Platform Settings
          </Button>
        </div>
      </Form>

    </div>
  );
};

export default AdminSettings;
