import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MovieManager from './pages/MovieManager';
import { AuthProvider, useAuthState } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuthState();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies" element={<PrivateRoute><MovieManager /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/movies" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
