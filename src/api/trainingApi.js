import { apiClient } from './client';

/**
 * Get all active training apps
 * @returns {Promise<Array>} List of training apps
 */
export const getTrainingApps = async () => {
    try {
        const response = await apiClient('/api/training-apps', {
            method: 'GET',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch training apps');
    }
};

/**
 * Get all videos for a specific training app
 * @param {string} appId - Training app ID
 * @returns {Promise<Array>} List of training videos
 */
export const getTrainingVideos = async (appId) => {
    try {
        const response = await apiClient(`/api/training-apps/${appId}/videos`, {
            method: 'GET',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch training videos');
    }
};
