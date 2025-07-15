import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiService = axios.create({
  baseURL: 'https://nfc-be.onrender.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// // Log request details
// apiService.interceptors.request.use(request => {
//   console.log('Starting Request', {
//     url: request.url,
//     method: request.method,
//     headers: request.headers,
//     data: request.data,
//   });
//   return request;
// }, error => {
//   console.error('Request error:', error);
//   return Promise.reject(error);
// });


// Request interceptor to attach token
apiService.interceptors.request.use(
  async (request) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error('Failed to attach token:', err);
    }

    console.log('Starting Request', {
      url: request.url,
      method: request.method,
      headers: request.headers,
      data: request.data,
    });

    return request;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Log response details
apiService.interceptors.response.use(response => {
  console.log('Response:', {
    url: response.config.url,
    status: response.status,
    data: response.data,
  });
  return response;
}, error => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error('Response error:', {
      url: error.response.config.url,
      status: error.response.status,
      data: error.response.data,
    });
  } else if (error.request) {
    // Request was made but no response received
    console.error('No response received:', error.request);
  } else {
    // Something else caused the error
    console.error('Error setting up request:', error.message);
  }
  return Promise.reject(error);
});

export default apiService;