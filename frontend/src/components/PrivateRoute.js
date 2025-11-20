import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../services/authService';

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    if (!AuthService.isAuthenticated()) {
        // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
        // ve mevcut konumu state olarak ekle
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute; 