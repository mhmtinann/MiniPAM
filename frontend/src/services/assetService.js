import axios from 'axios';

const API_URL = 'http://localhost:8080/api/assets';

// Axios instance oluştur
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor ekle
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Sunucudan gelen hata yanıtı
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // İstek yapıldı ama yanıt alınamadı
            console.error('No response received:', error.request);
        } else {
            // İstek oluşturulurken hata oluştu
            console.error('Request error:', error.message);
        }
        return Promise.reject(error);
    }
);

const assetService = {
    // Tüm sunucuları getir
    getAllAssets: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching assets:', error.response?.data || error.message);
            throw error;
        }
    },

    // Yeni sunucu ekle
    createAsset: async (asset) => {
        try {
            const response = await api.post('/', asset);
            return response.data;
        } catch (error) {
            console.error('Error creating asset:', error.response?.data || error.message);
            throw error;
        }
    },

    // Sunucu güncelle
    updateAsset: async (id, asset) => {
        try {
            const response = await api.put(`/${id}`, asset);
            return response.data;
        } catch (error) {
            console.error('Error updating asset:', error.response?.data || error.message);
            throw error;
        }
    },

    // Sunucu sil
    deleteAsset: async (id) => {
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            console.error('Error deleting asset:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default assetService; 