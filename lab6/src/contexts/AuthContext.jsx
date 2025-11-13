import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialAuthState };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, () => {
    // initialize from localStorage if available
    const stored = localStorage.getItem('user');
    if (stored) {
      return { ...initialAuthState, isAuthenticated: true, user: JSON.parse(stored) };
    }
    return initialAuthState;
  });

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });
  const { showToast } = useToast();

  // On mount or when stored user changes, re-validate user against server
  useEffect(() => {
    const validateStoredUser = async () => {
      try {
        const stored = state.user;
        if (!stored) return;
        const accounts = await api.getUsers();
        const current = accounts.find((a) => a.id === stored.id);
        // if user no longer exists or not active or not admin, force logout
        if (!current || current.status !== 'active' || current.role !== 'admin') {
          dispatch({ type: 'LOGOUT' });
          try {
            showToast({ title: 'Session ended', message: 'Tài khoản không còn quyền hoặc đã bị khoá.', bg: 'warning' });
          } catch (e) {}
        } else {
          // if server has fresh data, sync local copy
          if (JSON.stringify(current) !== JSON.stringify(stored)) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: current });
          }
        }
      } catch (e) {
        // ignore validation errors
      }
    };
    validateStoredUser();
    // re-run when state.user changes
  }, [state.user]);

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const accounts = await api.getUsers();

      const user = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail || (acc.email && acc.email === usernameOrEmail)) &&
          acc.password === password
      );

      if (user) {
        // Enforce admin role and active status to access dashboard/payment pages
        if (user.status !== 'active') {
          const msg = 'Tài khoản bị khóa.';
          dispatch({ type: 'LOGIN_FAILURE', payload: msg });
          return { success: false, error: msg };
        }

        if (user.role !== 'admin') {
          const msg = 'Bạn không có quyền truy cập.';
          dispatch({ type: 'LOGIN_FAILURE', payload: msg });
          return { success: false, error: msg };
        }

        // all good
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        try {
          showToast({ title: 'Login successful', message: `Welcome ${user.fullName ?? user.username}`, bg: 'success' });
        } catch (e) {
          // ignore if toast is not available for some reason
        }
        return { success: true, user };
      } else {
        const errorMessage = 'Invalid username/email or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed due to a network error.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  const setUser = (user) => dispatch({ type: 'LOGIN_SUCCESS', payload: user });

  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.isLoading,
    error: state.error,
    login,
    logout,
    setUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
