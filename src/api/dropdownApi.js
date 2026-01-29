import { apiClient } from './client';

/**
 * Get all dropdown data (countries, categories, apps)
 * @returns {Promise<Object>} Object containing countries, categories, and apps
 */
export const getDropdowns = async () => {
    try {
        const response = await apiClient('/api/dropdowns', {
            method: 'GET',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch dropdown data');
    }
};
