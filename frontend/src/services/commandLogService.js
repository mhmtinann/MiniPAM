import axios from 'axios';

const API_URL = 'http://localhost:8080/api/commands';

export const commandLogService = {
    getSessionCommands: async (sessionId) => {
        const response = await axios.get(`${API_URL}/session/${sessionId}`);
        return response.data;
    },

    getCommandsByStatus: async (status) => {
        const response = await axios.get(`${API_URL}/status/${status}`);
        return response.data;
    },

    getSessionCommandsByDateRange: async (sessionId, start, end) => {
        const response = await axios.get(`${API_URL}/session/${sessionId}/date-range`, {
            params: { start, end }
        });
        return response.data;
    },

    getUserCommandsByDateRange: async (userId, start, end) => {
        const response = await axios.get(`${API_URL}/user/${userId}/date-range`, {
            params: { start, end }
        });
        return response.data;
    },

    getAssetCommandsByDateRange: async (assetId, start, end) => {
        const response = await axios.get(`${API_URL}/asset/${assetId}/date-range`, {
            params: { start, end }
        });
        return response.data;
    }
}; 