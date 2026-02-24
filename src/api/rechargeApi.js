import { apiClient } from "./client";

/**
 * Submit a wallet recharge request
 * @param {FormData} data - Recharge details (agentId, agentName, amount, rechargeType, utrNumber, paymentProof)
 */
export const submitRechargeRequest = async (data) => {
  return await apiClient("/api/recharge/submit", {
    method: "POST",
    body: data,
    // When using FormData, let the browser set the Content-Type with boundary
  });
};

/**
 * Get current user's recharge history
 */
export const getMyRechargeHistory = async () => {
  return await apiClient("/api/recharge/my", {
    method: "GET",
  });
};

/**
 * Fetch available payment methods for recharge
 */
export const getPaymentMethods = async () => {
  return await apiClient("/api/topups/payment-methods", {
    method: "GET",
  });
};
