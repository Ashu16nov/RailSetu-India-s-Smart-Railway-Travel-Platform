import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f4f9' }}>
      <TopHeader />
      <div style={{ display: 'flex', flex: 1, marginTop: '70px' }}>
        <Sidebar />
        <main style={{ padding: '20px', flex: 1, overflowY: 'auto', marginLeft: '260px', minWidth: '0' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
