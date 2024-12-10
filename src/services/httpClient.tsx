import axios from 'axios';

// Create an Axios instance with default configurations
const httpClient = axios.create({
  baseURL: process.env.API_URL || 'http://192.168.1.15:8080/api',
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach tokens or modify requests
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Example: Retrieve token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors globally
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        if (error.response.status === 401) {
            // Handle unauthorized errors (e.g., redirect to login)
            console.error('Unauthorized! On te raccompagne à la sortie !');
            window.location.href = '/';
          }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);

    return Promise.reject(error);
  }
);

export { httpClient };
