import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('railsetu_user')) || null,
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('railsetu_user', JSON.stringify(data));
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  
  register: async (name, email, password, phone) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, phone });
      localStorage.setItem('railsetu_user', JSON.stringify(data));
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  verifyAadhaar: async (aadhaarNumber, otp) => {
    set({ loading: true, error: null });
    try {
      const user = JSON.parse(localStorage.getItem('railsetu_user'));
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/verify-aadhaar',
        { aadhaarNumber, otp },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      
      const updatedUser = { ...user, isAadhaarVerified: data.isAadhaarVerified, aadhaarHash: data.aadhaarHash };
      localStorage.setItem('railsetu_user', JSON.stringify(updatedUser));
      set({ user: updatedUser, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('railsetu_user');
    set({ user: null });
  }
}));

export default useAuthStore;
