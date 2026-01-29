import { apiClient } from './client';

/**
 * Submit an event application
 * @param {Object} applicationData - The event application data
 * @returns {Promise<Object>} The API response
 */
export const submitEventApplication = async (applicationData) => {
    try {
        const response = await apiClient('/api/events/apply', {
            method: 'POST',
            body: JSON.stringify(applicationData),
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to submit event application');
    }
};
