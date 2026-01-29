import { apiClient } from './client';

/**
 * Submit an agency application
 * @param {Object} applicationData - The agency application data
 * @returns {Promise<Object>} The API response
 */
export const submitAgencyApplication = async (applicationData) => {
    try {
        const response = await apiClient('/api/agency/apply', {
            method: 'POST',
            body: JSON.stringify(applicationData),
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to submit agency application');
    }
};
