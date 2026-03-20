import { apiClient } from './client';

/**
 * Fetch all notifications for the logged-in user
 * @returns {Promise<Object>} The API response
 */
export const getNotifications = async ({ page = 1, limit = 10 } = {}) => {
    try {
        const response = await apiClient(`/api/notifications?page=${page}&limit=${limit}`);
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch notifications');
    }
};

/**
 * Mark a notification as read
 * @param {string} notificationId
 * @returns {Promise<Object>} The API response
 */
export const markNotificationRead = async (notificationId) => {
    try {
        const response = await apiClient(`/api/notifications/${notificationId}/read`, {
            method: 'PATCH',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to mark notification as read');
    }
};
/**
 * Mark all notifications as read for the logged-in user
 * @returns {Promise<Object>} The API response
 */
export const markAllAsRead = async () => {
    try {
        const response = await apiClient('/api/notifications/read-all', {
            method: 'PATCH',
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to mark all notifications as read');
    }
};

/**
 * Get the unread notifications count
 * @returns {Promise<Object>} The API response { success, unreadCount }
 */
export const getUnreadCount = async () => {
    try {
        const response = await apiClient('/api/notifications/unread-count');
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to fetch unread count');
    }
};

/**
 * Update the last viewed time for notifications (resets tab count)
 * @param {Object} data - { type: 'service' | 'system' }
 * @returns {Promise<Object>} The API response
 */
export const viewNotifications = async (data) => {
    try {
        const response = await apiClient('/api/notifications/viewed', {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        return response;
    } catch (error) {
        throw new Error(error.message || 'Failed to update last viewed time');
    }
};
