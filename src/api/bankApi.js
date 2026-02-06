import { apiClient } from './client';

/**
 * Get Bank Details (Fetch user's bank details)
 * Endpoint: /api/bank-details
 * Method: GET
 */
export const getBankDetails = async () => {
    return await apiClient('/api/bank-details', {
        method: 'GET',
    });
};

/**
 * Add or Update Bank Details
 * Endpoint: /api/bank-details
 * Method: POST
 * @param {Object} data - Bank details data
 */
export const addOrUpdateBankDetails = async (data) => {
    return await apiClient('/api/bank-details', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

/**
 * Delete Bank Details
 * Endpoint: /api/bank-details
 * Method: DELETE
 */
export const deleteBankDetails = async () => {
    return await apiClient('/api/bank-details', {
        method: 'DELETE',
    });
};
