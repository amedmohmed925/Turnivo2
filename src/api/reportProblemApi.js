import axiosInstance from './axiosConfig';

/**
 * Create a report problem request
 * @param {string} accessToken - User access token
 * @param {Object} data - Report payload
 * @returns {Promise<object>} API response
 */
export const createReportProblem = async (accessToken, data) => {
  try {
    const response = await axiosInstance.post(
      `/demo/turnivo/api/web/v1/site/create-report-problem?access-token=${accessToken}`,
      data,
      {
        headers: {
          'Accept-Language': localStorage.getItem('language') || 'en',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error creating report problem request:', error);
    throw error.response?.data || { message: 'Failed to submit problem report' };
  }
};
