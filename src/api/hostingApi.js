import { apiClient } from './client';

/**
 * Submit a hosting application
 * @param {Object} applicationData - The application data
 * @returns {Promise<Object>} The API response
 */
export const submitHostingApplication = async (applicationData) => {
    try {
        const response = await apiClient('/api/hosting/apply', {
            method: 'POST',
            body: JSON.stringify(applicationData),
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to submit hosting application');
    }
};
