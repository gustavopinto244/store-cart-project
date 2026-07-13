import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import StorePage from '../pages/StorePage/StorePage';
import CartPage from '../pages/CartPage';
import UserPage from '../pages/UserPage';

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/store"
        element={
          <ProtectedRoute>
            <StorePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
