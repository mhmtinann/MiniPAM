import axios from 'axios';
import AuthService from '../services/authService';

// Request interceptor
axios.interceptors.request.use(
    (config) => {
        const token = AuthService.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token geçersiz veya süresi dolmuş
            AuthService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axios; 