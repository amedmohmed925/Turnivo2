import axiosInstance from './axiosConfig';

/**
 * Get lists data (cleaning service types, plans, addition services, etc.)
 * @param {string} accessToken - User's access token
 * @returns {Promise} API response with lists data
 */
export const getListsData = async (accessToken) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/lists?access-token=${accessToken}`
  );
  return response.data;
};

/**
 * Get user calendar (available appointments)
 * @param {string} accessToken - User's access token
 * @returns {Promise} API response with calendar data
 */
export const getUserCalendar = async (accessToken) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/user-calender?access-token=${accessToken}`
  );
  return response.data;
};

/**
 * Get plans/packages
 * @param {string} accessToken - User's access token
 * @returns {Promise} API response with plans data
 */
export const getPlans = async (accessToken) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/plan?access-token=${accessToken}`
  );
  return response.data;
};

/**
 * Create cleaning service request
 * @param {Object} serviceData - Service request data
 * @param {string} accessToken - User's access token
 * @returns {Promise} API response
 */
export const createCleaningService = async (serviceData, accessToken) => {
  const response = await axiosInstance.post(
    `/demo/turnivo/api/web/v1/site/create-clean-service?access-token=${accessToken}`,
    serviceData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data;
};

/**
 * Get new orders
 * @param {string} accessToken - User's access token
 * @param {number} page - Page number for pagination (optional)
 * @returns {Promise} API response with new orders
 */
export const getNewOrders = async (accessToken, page = 1) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/my-new-clean-service?access-token=${accessToken}&page=${page}`
  );
  return response.data;
};

/**
 * Get progress orders
 * @param {string} accessToken - User's access token
 * @param {number} page - Page number for pagination (optional)
 * @returns {Promise} API response with progress orders
 */
export const getProgressOrders = async (accessToken, page = 1) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/my-progress-clean-service?access-token=${accessToken}&page=${page}`
  );
  return response.data;
};

/**
 * Get completed orders
 * @param {string} accessToken - User's access token
 * @param {number} page - Page number for pagination (optional)
 * @returns {Promise} API response with completed orders
 */
export const getCompletedOrders = async (accessToken, page = 1) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/my-complete-clean-service?access-token=${accessToken}&page=${page}`
  );
  return response.data;
};

/**
 * Get canceled orders
 * @param {string} accessToken - User's access token
 * @param {number} page - Page number for pagination (optional)
 * @returns {Promise} API response with canceled orders
 */
export const getCanceledOrders = async (accessToken, page = 1) => {
  const response = await axiosInstance.get(
    `/demo/turnivo/api/web/v1/site/my-cancelled-clean-service?access-token=${accessToken}&page=${page}`
  );
  return response.data;
};

/**
 * Cancel an order
 * @param {number} orderId - Order ID to cancel
 * @param {string} accessToken - User's access token
 * @returns {Promise} API response
 */
export const cancelOrder = async (orderId, accessToken) => {
  const response = await axiosInstance.post(
    `/demo/turnivo/api/web/v1/site/cancel-clean-service?access-token=${accessToken}`,
    { cleanservice_id: orderId },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data;
};

