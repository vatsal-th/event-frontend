import { apiClient } from './client';

/**
 * Create a top-up request
 * @param {Object} data - { appId, targetUserId, targetUserName, amount, agentCode, walletPassword }
 */
export const createTopUpRequest = async (data) => {
    try {
        const response = await apiClient('/api/topups/create', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to submit top-up request');
    }
};
