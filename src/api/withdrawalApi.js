import { apiClient } from './client';

/**
 * Create a new withdrawal request
 * @param {Object} data - { amount }
 */
export const createWithdrawal = async (data) => {
    return await apiClient('/api/withdrawals', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

/**
 * Get withdrawal history with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Records per page (default: 20)
 */
export const getWithdrawalHistory = async (page = 1, limit = 20) => {
    return await apiClient(`/api/withdrawals?page=${page}&limit=${limit}`, {
        method: 'GET',
    });
};

/**
 * Get details of a specific withdrawal
 * @param {string} id - Withdrawal ID
 */
export const getWithdrawalById = async (id) => {
    return await apiClient(`/api/withdrawals/${id}`, {
        method: 'GET',
    });
};
