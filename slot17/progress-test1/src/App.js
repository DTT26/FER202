import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { ToastProvider } from './contexts/ToastContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PaymentProvider>
          <AppRoutes />
        </PaymentProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
