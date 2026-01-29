import { apiClient } from './client';

/**
 * Submit an influencer application
 * @param {Object} applicationData - The influencer application data
 * @returns {Promise<Object>} The API response
 */
export const submitInfluencerApplication = async (applicationData) => {
    try {
        const response = await apiClient('/api/influencer/apply', {
            method: 'POST',
            body: JSON.stringify(applicationData),
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to submit influencer application');
    }
};
