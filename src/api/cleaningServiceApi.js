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
