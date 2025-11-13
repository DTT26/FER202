import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const authService = {
  login: async (username, password) => {
    const response = await axios.get(`${API_URL}/users?username=${username}&password=${password}`);
    return response.data[0] || null;
  },
};

export const expenseService = {
  getExpensesByUserId: async (userId) => {
    const response = await axios.get(`${API_URL}/expenses?userId=${userId}`);
    return response.data;
  },

  addExpense: async (expense) => {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
  },

  updateExpense: async (id, expense) => {
    const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
    return response.data;
  },

  deleteExpense: async (id) => {
    await axios.delete(`${API_URL}/expenses/${id}`);
  },
};