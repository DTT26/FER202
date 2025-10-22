import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

// Context để chia sẻ functions
const ToastContext = React.createContext();

// Hook để sử dụng ToastMessage
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addToast = (config) => {
    const newToast = {
      id: nextId,
      title: config.title || '',
      message: config.message || '',
      type: config.type || 'info',
      duration: config.duration || 5000,
      show: true,
      timestamp: Date.now()
    };
    
    setToasts(prev => [...prev, newToast]);
    setNextId(prev => prev + 1);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  // Helper functions cho các loại toast phổ biến
  const showSuccess = (message, title = 'Thành công', duration = 3000) => {
    addToast({ type: 'success', message, title, duration });
  };

  const showError = (message, title = 'Lỗi', duration = 5000) => {
    addToast({ type: 'danger', message, title, duration });
  };

  const showWarning = (message, title = 'Cảnh báo', duration = 4000) => {
    addToast({ type: 'warning', message, title, duration });
  };

  const showInfo = (message, title = 'Thông tin', duration = 3000) => {
    addToast({ type: 'info', message, title, duration });
  };

  // Auto remove toasts sau khi hết thời gian
  useEffect(() => {
    const timers = toasts.map(toast => {
      if (toast.duration > 0) {
        return setTimeout(() => {
          removeToast(toast.id);
        }, toast.duration);
      }
      return null;
    });

    return () => {
      timers.forEach(timer => timer && clearTimeout(timer));
    };
  }, [toasts]);

  const contextValue = {
    addToast,
    removeToast,
    removeAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    toasts
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Toast Container */}
      <ToastContainer 
        position="top-end" 
        className="p-3"
        style={{ zIndex: 1055 }}
      >
        {toasts.map(toast => (
          <ToastMessage key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// Component ToastMessage riêng lẻ
function ToastMessage({ toast, onClose }) {
  const getIconAndColor = () => {
    switch (toast.type) {
      case 'success':
        return { icon: FaCheckCircle, color: '#28a745' };
      case 'danger':
        return { icon: FaTimesCircle, color: '#dc3545' };
      case 'warning':
        return { icon: FaExclamationTriangle, color: '#ffc107' };
      default:
        return { icon: FaInfoCircle, color: '#17a2b8' };
    }
  };

  const { icon: Icon, color } = getIconAndColor();

  return (
    <Toast 
      show={toast.show} 
      onClose={onClose}
      delay={toast.duration}
      autohide={toast.duration > 0}
      className="mb-3"
      style={{ minWidth: '300px' }}
    >
      <Toast.Header closeButton>
        <div className="d-flex align-items-center me-2">
          <Icon style={{ color }} size={16} />
        </div>
        <strong className="me-auto">{toast.title}</strong>
        <small className="text-muted">
          {new Date(toast.timestamp).toLocaleTimeString()}
        </small>
      </Toast.Header>
      <Toast.Body>
        {toast.message}
      </Toast.Body>
    </Toast>
  );
}

export default ToastMessage;
