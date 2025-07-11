import axios from 'axios';
import { UserFormData, ApiResponse, ApiError } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const insuranceApi = {
  async getRecommendation(formData: UserFormData): Promise<ApiResponse> {
    try {
      const response = await api.post<ApiResponse>('/recommendation', formData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          success: false,
          message: error.response?.data?.message || 'Failed to get recommendation',
          error: error.response?.data?.error || error.message,
        };
        throw apiError;
      }
      throw new Error('An unexpected error occurred');
    }
  },

  async getAllSubmissions(): Promise<any[]> {
    try {
      const response = await api.get('/recommendation/submissions');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to get submissions:', error);
      return [];
    }
  },

  async getSubmissionById(id: string): Promise<any> {
    try {
      const response = await api.get(`/recommendation/submissions/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get submission:', error);
      throw error;
    }
  },

  // Health check endpoint
  async healthCheck(): Promise<boolean> {
    try {
      const response = await api.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};

export default api;
