import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const showToast = useCallback(({ title = '', message = '', bg = 'success', delay = 3000 }) => {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const t = { id, title, message, bg };
    setToasts((prev) => [...prev, t]);
    // auto remove
    setTimeout(() => removeToast(id), delay);
    return id;
  }, [removeToast]);

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position="top-end" className="p-3">
        {toasts.map((t) => (
          <Toast key={t.id} bg={t.bg} onClose={() => removeToast(t.id)}>
            {t.title ? (
              <Toast.Header>
                <strong className="me-auto">{t.title}</strong>
              </Toast.Header>
            ) : null}
            <Toast.Body className="text-white">{t.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export default ToastContext;
