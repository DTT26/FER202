import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddPayment from '../pages/AddPayment';
import ViewPayment from '../pages/ViewPayment';
import UserList from '../pages/UserList';
import ReduxDashboard from '../pages/ReduxDashboard';
import UserManagement from '../components/UserManagement';
import PaymentManagement from '../components/PaymentManagement';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/payments/add" element={<PrivateRoute><AddPayment /></PrivateRoute>} />
                <Route path="/payments/:id" element={<PrivateRoute><ViewPayment /></PrivateRoute>} />
                <Route path="/payments/:id/edit" element={<PrivateRoute><AddPayment /></PrivateRoute>} />
                <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
                
                {/* Redux Toolkit Demo Routes */}
                <Route path="/redux" element={<ReduxDashboard />} />
                <Route path="/users/redux" element={<UserManagement />} />
                <Route path="/payments/redux" element={<PaymentManagement />} />
                
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;