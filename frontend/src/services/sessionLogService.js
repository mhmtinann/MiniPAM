import axios from 'axios';

const API_URL = 'http://localhost:8080/api/sessions';

export const sessionLogService = {
    getActiveSessions: async () => {
        const response = await axios.get(`${API_URL}/active`);
        return response.data;
    },

    getUserSessions: async (userId) => {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    },

    getAssetSessions: async (assetId) => {
        const response = await axios.get(`${API_URL}/asset/${assetId}`);
        return response.data;
    },

    getSessionsByDateRange: async (start, end) => {
        const response = await axios.get(`${API_URL}/date-range`, {
            params: { start, end }
        });
        return response.data;
    },

    getUserSessionsByDateRange: async (userId, start, end) => {
        const response = await axios.get(`${API_URL}/user/${userId}/date-range`, {
            params: { start, end }
        });
        return response.data;
    },

    getAssetSessionsByDateRange: async (assetId, start, end) => {
        const response = await axios.get(`${API_URL}/asset/${assetId}/date-range`, {
            params: { start, end }
        });
        return response.data;
    }
}; 