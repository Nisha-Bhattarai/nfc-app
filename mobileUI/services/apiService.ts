import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../utils/sessionStorage'; // adjust path as needed

const apiService = axios.create({
  baseURL: 'https://nfc-be.onrender.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

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

// Response interceptor
apiService.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    if (error.response) {
      console.error('Response error:', {
        url: error.response.config?.url,
        status: error.response.status,
        data: error.response.data,
      });

      if (error.response.status === 401) {
        // 🔥 Clear session on 401 Unauthorized
        await clearSession();

        // Optional: trigger global logout event or navigation reset here
        // Example with event emitter:
        // EventEmitter.emit('logout');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiService;
