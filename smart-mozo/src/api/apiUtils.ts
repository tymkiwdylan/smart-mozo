import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api'; // Put this in .env

export const sendPostRequest = async (formData: any, endpoint: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/${endpoint}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendGetRequest = async (endpoint: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};