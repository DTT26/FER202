import React, { createContext, useContext, useReducer, useEffect } from 'react';
import API from '../services/api';

const PaymentContext = createContext();

const initialState = {
  payments: [],
  totalAmount: 0,
  loading: false,
  error: null,
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, payments: action.payload, totalAmount: action.total };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_PAYMENT': {
      const payments = [...state.payments, action.payload];
      const total = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
      return { ...state, payments, totalAmount: total };
    }
    case 'UPDATE_PAYMENT': {
      const payments = state.payments.map((p) => (p.id === action.payload.id ? action.payload : p));
      const total = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
      return { ...state, payments, totalAmount: total };
    }
    case 'DELETE_PAYMENT': {
      const payments = state.payments.filter((p) => p.id !== action.payload);
      const total = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
      return { ...state, payments, totalAmount: total };
    }
    default:
      return state;
  }
};

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const fetchPayments = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await API.get('/payments');
      const payments = res.data;
      const total = payments.reduce((s, p) => s + (Number(p.amount) || 0), 0);
      dispatch({ type: 'FETCH_SUCCESS', payload: payments, total });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message || 'Failed to fetch payments' });
    }
  };

  const getPaymentById = async (id) => {
    try {
      const res = await API.get(`/payments/${id}`);
      return res.data;
    } catch (err) {
      throw new Error(err.message || 'Failed to get payment');
    }
  };

  const addPayment = async (payment) => {
    try {
      // validate amount is not negative
      if (Number(payment.amount) < 0) {
        throw new Error('Amount cannot be negative');
      }
      const res = await API.post('/payments', payment);
      dispatch({ type: 'ADD_PAYMENT', payload: res.data });
      return res.data;
    } catch (err) {
      throw new Error(err.message || 'Failed to add payment');
    }
  };

  const updatePayment = async (id, data) => {
    try {
      // validate amount is not negative
      if (Number(data.amount) < 0) {
        throw new Error('Amount cannot be negative');
      }
      const res = await API.put(`/payments/${id}`, data);
      dispatch({ type: 'UPDATE_PAYMENT', payload: res.data });
      return res.data;
    } catch (err) {
      throw new Error(err.message || 'Failed to update payment');
    }
  };

  const deletePayment = async (id) => {
    try {
      await API.delete(`/payments/${id}`);
      dispatch({ type: 'DELETE_PAYMENT', payload: id });
      return true;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete payment');
    }
  };

  const value = {
    payments: state.payments,
    totalAmount: state.totalAmount,
    loading: state.loading,
    error: state.error,
    fetchPayments,
    getPaymentById,
    addPayment,
    updatePayment,
    deletePayment,
  };

  // Fetch payments on provider mount so data is available to consumers (FilterBar, Dashboard...)
  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

export const usePayment = () => useContext(PaymentContext);
