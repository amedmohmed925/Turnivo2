import axiosInstance from './axiosConfig';

/**
 * Get new maintenance service requests
 * @param {string} accessToken - Access token
 * @returns {Promise} Response from the server
 */
export const getNewMaintenanceServices = async (accessToken) => {
  try {
    const response = await axiosInstance.get('/demo/turnivo/api/web/v1/site/supervisor-new-maintenance-service', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching new maintenance services:', error);
    throw error.response?.data || { message: 'Failed to fetch new maintenance services' };
  }
};

/**
 * Get in-progress maintenance service requests
 * @param {string} accessToken - Access token
 * @returns {Promise} Response from the server
 */
export const getProgressMaintenanceServices = async (accessToken) => {
  try {
    const response = await axiosInstance.get('/demo/turnivo/api/web/v1/site/supervisor-progress-maintenance-service', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching progress maintenance services:', error);
    throw error.response?.data || { message: 'Failed to fetch progress maintenance services' };
  }
};

/**
 * Get completed maintenance service requests
 * @param {string} accessToken - Access token
 * @returns {Promise} Response from the server
 */
export const getCompleteMaintenanceServices = async (accessToken) => {
  try {
    const response = await axiosInstance.get('/demo/turnivo/api/web/v1/site/supervisor-complete-maintenance-service', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching complete maintenance services:', error);
    throw error.response?.data || { message: 'Failed to fetch complete maintenance services' };
  }
};

/**
 * Get rejected maintenance service requests
 * @param {string} accessToken - Access token
 * @returns {Promise} Response from the server
 */
export const getRejectMaintenanceServices = async (accessToken) => {
  try {
    const response = await axiosInstance.get('/demo/turnivo/api/web/v1/site/supervisor-reject-maintenance-service', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reject maintenance services:', error);
    throw error.response?.data || { message: 'Failed to fetch reject maintenance services' };
  }
};

/**
 * Get maintenance service details
 * @param {number} id - Service ID
 * @param {string} accessToken - Access token
 * @returns {Promise} Response from the server
 */
export const getMaintenanceServiceDetails = async (id, accessToken) => {
  try {
    const response = await axiosInstance.get('/demo/turnivo/api/web/v1/site/supervisor-maintenance-service-view', {
      params: { id },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching maintenance service details:', error);
    throw error.response?.data || { message: 'Failed to fetch maintenance service details' };
  }
};

/**
 * Reject or cancel maintenance service
 * @param {Object} data - Service data
 * @param {number} data.service_id - Service ID
 * @param {string} data.comment - Comment/reason for rejection
 * @param {string} accessToken - Access token
 * @returns {Promise} Response from the server
 */
export const rejectMaintenanceService = async (data, accessToken) => {
  try {
    const response = await axiosInstance.post('/demo/turnivo/api/web/v1/site/reject-maintenance-service', data, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error rejecting maintenance service:', error);
    throw error.response?.data || { message: 'Failed to reject maintenance service' };
  }
};
