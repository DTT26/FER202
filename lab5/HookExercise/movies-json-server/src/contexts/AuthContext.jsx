import React, { createContext, useContext, useReducer, useEffect } from 'react';
import movieApi from '../api/movieAPI';

const API = '/accounts'; // use movieApi baseURL to ensure absolute requests

// Initial Auth State
const initialAuthState = {
  user: null, // { id, username, fullname }
  loading: false,
  error: null,
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, user: null, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null, error: null };
    default:
      return state;
  }
}

// Contexts
const AuthStateContext = createContext(initialAuthState);
const AuthDispatchContext = createContext(null);

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Persist login (optional)
  useEffect(() => {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      try {
        dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(raw) });
      } catch {}
    }
  }, []);

  // Save user on login
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('currentUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [state.user]);

  // Đăng nhập
  const login = async (username, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // Safer approach: fetch all accounts and validate client-side to avoid
      // query-string encoding / routing issues. This is acceptable for a
      // json-server demo (not for production auth).
      const u = (username || '').trim();
      const p = password || '';
      console.debug('Auth: validating user=', u);
      let accounts = null;
      try {
        const response = await movieApi.get(API);
        accounts = response && response.data;
      } catch (err) {
        // If server responded with HTML (React dev server) or 404, give a clearer message
        if (err && err.response && typeof err.response.data === 'string' && err.response.data.includes('Cannot GET')) {
          console.error('Auth error: /accounts served HTML (likely React dev server on 3001):', err);
          dispatch({ type: 'LOGIN_ERROR', payload: 'Cấu hình server sai: cổng 3001 đang phục vụ ứng dụng React, không phải json-server. Hãy khởi json-server trên cổng 3001 và chạy React trên cổng khác (3000).' });
          return false;
        }

        // fallback to direct fetch in case movieApi/baseURL not reachable
        try {
          const res = await fetch('http://localhost:3001/accounts');
          if (res.ok) accounts = await res.json();
          else {
            console.error('Auth fetch fallback non-ok response', res.status);
            dispatch({ type: 'LOGIN_ERROR', payload: 'Lỗi kết nối tới server (fetch trả về ' + res.status + ').' });
            return false;
          }
        } catch (err2) {
          console.error('Auth fetch fallback failed', err, err2);
          dispatch({ type: 'LOGIN_ERROR', payload: 'Lỗi kết nối tới server. Hãy đảm bảo json-server đang chạy trên http://localhost:3001' });
          return false;
        }
      }

      if (Array.isArray(accounts)) {
        const found = accounts.find(acc => String(acc.username) === u && String(acc.password) === p);
        if (found) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: found });
          return true;
        }
        dispatch({ type: 'LOGIN_ERROR', payload: 'Sai tài khoản hoặc mật khẩu!' });
        return false;
      }

      dispatch({ type: 'LOGIN_ERROR', payload: 'Lỗi trả dữ liệu từ server.' });
      return false;
    } catch (err) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Lỗi kết nối tới server.' });
      return false;
    }
  };

  // Đăng xuất
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={{ login, logout, dispatch }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
