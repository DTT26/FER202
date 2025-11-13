import axios from 'axios';

// Cấu hình Base URL cho JSON Server (mặc định chạy trên cổng 3001)
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const updateUser = async (id, payload) => {
  try {
    const response = await API.patch(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const getPayments = async () => {
  try {
    const response = await API.get('/payments');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

export default API;
