import { IApiService } from './interface';
import axios from 'axios';
import queryString from 'query-string';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com/api', // Change this to your API URL
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // or from context/redux
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login or refresh token logic
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
export const apiService = ({ url, pathVars, params, body, ...options }: IApiService): Promise<any> => {
    let updatedUrl = url;
  
    if (pathVars && Object.keys(pathVars).length !== 0) {
      updatedUrl = Object.entries(pathVars).reduce(
        (replacedPath, [key, value]) => replacedPath.replace(`:${key}`, `${value || ''}`),
        url || '',
      );
    }
  
    if (params && Object.keys(params).length !== 0) {
      updatedUrl = `${updatedUrl}?${queryString.stringify(params)}`;
    }
  
    return axiosInstance({
      data: body,
      url: updatedUrl,
      ...options,
    });
  };
  

export default axiosInstance;
