import axiosInstance from './axiosConfig';

/**
 * Get guest ratings
 * @param {string} accessToken - The access token for authentication
 * @param {number} page - The page number for pagination (default: 1)
 * @returns {Promise} - Promise with the ratings data
 */
export const getGuestRatings = async (accessToken, page = 1) => {
  try {
    const response = await axiosInstance.get('/demo/turnivo/api/web/v1/site/guest-rate', {
      params: {
        'access-token': accessToken,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching guest ratings:', error);
    throw error;
  }
};
