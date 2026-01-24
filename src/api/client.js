const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Generic API client wrapper around fetch.
 * Automatically appends BASE_URL to the endpoint.
 * 
 * @param {string} endpoint - The API endpoint (e.g., '/api/auth/login')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - The parsed JSON response
 */
export const apiClient = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    // Optionally add token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        // Handle non-200 responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
