import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import 'antd/dist/reset.css'; // Optional depending on antd version, but typical for v5

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FB792B', // IRCTC Orange
          colorInfo: '#213d77', // IRCTC Deep Blue
          borderRadius: 8,
          fontFamily: "'Inter', 'Roboto', sans-serif"
        },
        components: {
          Button: {
            colorPrimary: '#FB792B',
            colorPrimaryHover: '#e66b22',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
