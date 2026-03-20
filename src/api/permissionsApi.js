import { apiClient } from './client';

/**
 * Request permission for a service
 * @param {Object} data - { serviceName, text }
 */
export const requestPermission = async (data) => {
    try {
        const response = await apiClient('/api/permissions/request', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to request permission');
    }
};

/**
 * Get current user's permission statuses
 */
export const getMyPermissions = async () => {
    try {
        const response = await apiClient('/api/permissions/my', {
            method: 'GET',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch permissions');
    }
};
