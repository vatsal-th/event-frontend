import { apiClient } from './client';

/**
 * Search for salary details by talent ID
 * @param {string} talentId - The Talent ID to search for
 * @returns {Promise<Object>} - The API response
 */
export const searchSalaryByTalentId = async (talentId) => {
    return apiClient(`/api/salary/search?talentId=${encodeURIComponent(talentId)}`, {
        method: 'GET'
    });
};
