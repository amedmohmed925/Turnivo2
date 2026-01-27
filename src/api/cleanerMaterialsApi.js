/* eslint-disable no-useless-catch */
import axios from 'axios';

const BASE_URL = 'https://alrajihy.com/demo/turnivo/api/web/v1/site';
// const BASE_URL = import.meta.env.PROD ? 'https://alrajihy.com/demo/turnivo/api/web/v1/site' : '';

// Get all available materials for selection
export const getMaterials = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/provider-material`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new material request (order)
export const createMaterialRequest = async (accessToken, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/provider-create-material-request`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get new material requests
export const getNewMaterialRequests = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/provider-material-request-new`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get complete material requests
export const getCompleteMaterialRequests = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/provider-material-request-complete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get cancelled material requests
export const getCancelledMaterialRequests = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/provider-material-request-cancelled`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cancel a material request
export const cancelMaterialRequest = async (accessToken, materialsRequestId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/provider-material-cancel-request`,
      { matrails_request_id: materialsRequestId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Accept-Language': localStorage.getItem('language') || 'en',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get material request details by ID
export const getMaterialRequestView = async (accessToken, id) => {
  try {
    const response = await axios.get(`${BASE_URL}/provider-material-request-view`, {
      params: { id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Accept-Language': localStorage.getItem('language') || 'en',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
