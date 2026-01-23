import axiosInstance from './axiosConfig';

/**
 * Get my smart lock requests
 * @param {string} accessToken - User's access token
 * @param {number} page - Page number for pagination (optional)
 * @returns {Promise} API response with smart lock requests
 */
export const getMySmartLockRequest = async (accessToken, page = 1) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/my-smart-lock-request?access-token=${accessToken}&page=${page}`
  );
  return response.data;
};

/**
 * Get smart lock history for checkin
 * @param {string} accessToken - User's access token
 * @param {number} propertyId - Property ID (not used in URL but kept for compatibility)
 * @param {number} page - Page number for pagination (optional)
 * @returns {Promise} API response with smart lock checkin history
 */
export const getSmartLockHistoryCheckin = async (accessToken, propertyId, page = 1) => {
  const response = await axiosInstance.post(
    `/demo/turnivo/api/web/v1/site/smart-lock-history?access-token=${accessToken}`
  );
  return response.data;
};

/**
 * Get smart lock history for checkout
 * @param {string} accessToken - User's access token
 * @param {number} propertyId - Property ID (not used in URL but kept for compatibility)
 * @param {number} page - Page number for pagination (optional)
 * @returns {Promise} API response with smart lock checkout history
 */
export const getSmartLockHistoryCheckout = async (accessToken, propertyId, page = 1) => {
  const response = await axiosInstance.post(
    `/demo/turnivo/api/web/v1/site/smart-lock-history-checkout?access-token=${accessToken}`
  );
  return response.data;
};
