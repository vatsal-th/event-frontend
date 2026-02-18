import { apiClient } from './client';

/**
 * Get user dashboard statistical overview
 */
export const getDashboardStats = async () => {
    try {
        const response = await apiClient('/api/dashboard/stats', {
            method: 'GET',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch dashboard stats');
    }
};
