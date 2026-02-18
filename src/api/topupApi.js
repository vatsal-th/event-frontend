import { apiClient } from './client';

/**
 * Create a top-up request
 * @param {Object} data - { appId, targetUserId, targetUserName, amount, agentCode, walletPassword }
 */
export const createTopUpRequest = async (data) => {
    try {
        const isFormData = data instanceof FormData;
        const response = await apiClient('/api/topups/create', {
            method: 'POST',
            body: isFormData ? data : JSON.stringify(data),
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to submit top-up request');
    }
};

/**
 * Get the current Top-Up QR Code
 */
export const getTopUpQR = async () => {
    try {
        return await apiClient('/api/topups/qr', {
            method: 'GET',
        });
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch QR code');
    }
};
