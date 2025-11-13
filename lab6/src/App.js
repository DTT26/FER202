import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { ToastProvider } from './contexts/ToastContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <AuthProvider>
          <PaymentProvider>
            <AppRoutes />
          </PaymentProvider>
        </AuthProvider>
      </ToastProvider>
    </Provider>
  );
}

export default App;
