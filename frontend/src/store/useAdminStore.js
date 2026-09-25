import { create } from 'zustand';

const INITIAL_NOTICES = JSON.parse(localStorage.getItem('railsetu_admin_notices')) || [
  {
    id: 'not_1',
    title: 'Patna - Delhi Track Maintenance',
    category: 'Operational Advisory',
    message: 'Train services operating on time. Special festive trains added on Patna - Delhi route.',
    priority: 'High',
    active: true,
    date: '25 Sep 2026'
  },
  {
    id: 'not_2',
    title: 'Festive Season Tatkal Booking Window',
    category: 'Booking Advisory',
    message: 'AC Tatkal tickets open at 10:00 AM and Non-AC at 11:00 AM. Ensure Aadhaar verification.',
    priority: 'Normal',
    active: true,
    date: '24 Sep 2026'
  }
];

const INITIAL_CONFIG = JSON.parse(localStorage.getItem('railsetu_admin_config')) || {
  platformFee: 15,
  irctcSyncInterval: 30,
  maintenanceMode: false,
  maxTicketsPerUser: 6,
  paymentGateway: 'Razorpay / UPI Live Gateway',
  apiEndpoint: 'http://localhost:5000/api'
};

const useAdminStore = create((set, get) => ({
  notices: INITIAL_NOTICES,
  config: INITIAL_CONFIG,

  // Notice CRUD
  addNotice: (noticeData) => {
    const newNotice = {
      id: 'not_' + Date.now(),
      title: noticeData.title || 'System Advisory',
      category: noticeData.category || 'General',
      message: noticeData.message,
      priority: noticeData.priority || 'Normal',
      active: true,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    const updated = [newNotice, ...get().notices];
    localStorage.setItem('railsetu_admin_notices', JSON.stringify(updated));
    set({ notices: updated });
    return newNotice;
  },

  updateNotice: (id, updatedFields) => {
    const updated = get().notices.map(n => n.id === id ? { ...n, ...updatedFields } : n);
    localStorage.setItem('railsetu_admin_notices', JSON.stringify(updated));
    set({ notices: updated });
  },

  deleteNotice: (id) => {
    const updated = get().notices.filter(n => n.id !== id);
    localStorage.setItem('railsetu_admin_notices', JSON.stringify(updated));
    set({ notices: updated });
  },

  toggleNoticeActive: (id) => {
    const updated = get().notices.map(n => n.id === id ? { ...n, active: !n.active } : n);
    localStorage.setItem('railsetu_admin_notices', JSON.stringify(updated));
    set({ notices: updated });
  },

  // Platform Config CRUD
  updateConfig: (newConfig) => {
    const updated = { ...get().config, ...newConfig };
    localStorage.setItem('railsetu_admin_config', JSON.stringify(updated));
    set({ config: updated });
  }
}));

export default useAdminStore;
