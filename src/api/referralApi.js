import { apiClient } from './client';

/**
 * Get user's referral statistics
 */
export const getReferralStats = async () => {
    try {
        const response = await apiClient('/api/referrals/stats');
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get referral leaderboard
 * @param {number} limit - Number of top referrers to fetch
 */
export const getLeaderboard = async (limit = 10) => {
    try {
        const response = await apiClient(`/api/referrals/leaderboard?limit=${limit}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get referral history with pagination
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 */
export const getReferralHistory = async (page = 1, limit = 10) => {
    try {
        const response = await apiClient(`/api/referrals/history?page=${page}&limit=${limit}`);
        return response;
    } catch (error) {
        throw error;
    }
};
