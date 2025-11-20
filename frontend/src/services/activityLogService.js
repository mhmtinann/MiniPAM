import axios from 'axios';

const API_URL = 'http://localhost:8080/api/logs';

export const activityLogService = {
    getAllLogs: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getAssetLogs: async (assetId) => {
        const response = await axios.get(`${API_URL}/asset/${assetId}`);
        return response.data;
    },

    getUserLogs: async (userId) => {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    }
}; 