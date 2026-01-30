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

/**
 * Send email to guest with temporary access code
 * @param {string} accessToken - User's access token
 * @param {number} service_id - Service/Property ID
 * @param {string} guest_email - Guest's email address
 * @param {number} type - Type (1=clean, 2=maintenance)
 * @returns {Promise} API response
 */
export const sendEmailToGuest = async (accessToken, service_id, guest_email, type) => {
  const response = await axiosInstance.post(
    `/demo/turnivo/api/web/v1/site/send-email-to-guest?access-token=${accessToken}`,
    {
      service_id,
      guest_email,
      type
    }
  );
  return response.data;
};
