import axiosInstance from './axiosConfig';

const getLanguage = () => localStorage.getItem('language') || 'en';

export const getCleanerCalendar = async (accessToken) => {
  try {
    const response = await axiosInstance.get('/demo/turnivo/api/web/v1/site/provider-calender', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': getLanguage(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cleaner calendar:', error);
    throw error.response?.data || { message: 'Failed to fetch cleaner calendar' };
  }
};
