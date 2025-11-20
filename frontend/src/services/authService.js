import axios from 'axios';

const API_URL = 'http://localhost:8080/api';


const authService = {
    async login(username, password) {
        const response = await axios.post(`${API_URL}/auth/login`, {
          username,
          password,
        });
      
        const user = {
          id: response.data.id,
          username: response.data.username,
          role: response.data.role,
        };
      
        const token = response.data.token;
      
        if (token) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
        }
      
        return { user, token }; // ✅ frontend’in beklediği format
      },
      

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    register(username, email, password) {
        return axios.post(`${API_URL}/register`, {
            username,
            email,
            password
        });
    },
    getCurrentUser() {
        try {
            const userData = localStorage.getItem('user');
            if (!userData || userData === 'undefined' || userData === 'null') {
                return null;
            }
            return JSON.parse(userData);
        } catch (error) {
            console.error("Invalid user data in localStorage", error);
            localStorage.removeItem('user');
            return null;
        }
    },
    
    
    

    

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    },

    async createUser(userData) {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/users`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    async getUsers() {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    async updateUser(userId, userData) {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    async deleteUser(userId) {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    // Add axios interceptor to include token in all requests
    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                const token = this.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

// Setup axios interceptors
authService.setupAxiosInterceptors();

export default authService; 