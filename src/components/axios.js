import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/hubspot_contact/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here if needed
  },
});

// Interceptor to add CSRF token to headers
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

export default axiosInstance;
