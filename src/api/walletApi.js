import { apiClient } from './client';

/**
 * Get wallet transaction history with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Records per page (default: 20)
 */
export const getWalletTransactions = async (page = 1, limit = 20) => {
    return await apiClient(`/api/wallet/transactions?page=${page}&limit=${limit}`, {
        method: 'GET',
    });
};

/**
 * Get wallet summary with balance and breakdown
 */
export const getWalletSummary = async () => {
    return await apiClient('/api/wallet/summary', {
        method: 'GET',
    });
};

/**
 * Get transactions filtered by type
 * @param {string} type - Transaction type (referral_reward, application_reward, withdrawal, admin_adjustment)
 */
export const getTransactionsByType = async (type) => {
    return await apiClient(`/api/wallet/transactions/${type}`, {
        method: 'GET',
    });
};
/**
 * Get wallet password status (check if set or not)
 */
export const getWalletPasswordStatus = async () => {
    return await apiClient('/api/wallet/password-status', {
        method: 'GET',
    });
};

/**
 * Set or update wallet password
 * @param {Object} data - { password, newWalletPassword }
 */
export const updateWalletPassword = async (data) => {
    return await apiClient('/api/wallet/password', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
