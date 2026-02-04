import { apiClient } from './client';

/**
 * Get user application history
 * @returns {Promise<Object>} The API response with user history data
 */
export const getUserHistory = async () => {
    try {
        const response = await apiClient('/api/history', {
            method: 'GET',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch user history');
    }
};
/**
 * Get the latest status for each application type
 * @returns {Promise<Object>} The API response with latest status data
 */
export const getLatestStatus = async () => {
    try {
        const response = await apiClient('/api/history/latest', {
            method: 'GET',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch latest status');
    }
};
/**
 * Mark a reward as scratched in the backend
 * @param {string} type - Application type (hosting, events, agency, influencers)
 * @param {string} id - Application ID
 * @returns {Promise<Object>} The API response
 */
export const markAsScratched = async (type, id) => {
    try {
        const response = await apiClient(`/api/rewards/scratch/${type}/${id}`, {
            method: 'PUT',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to update scratch status');
    }
};
