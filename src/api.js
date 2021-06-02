import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiHost } from './constant';

const API = axios.create({
  baseURL: apiHost,
});

axiosRetry(API, { retries: 3 });

// Add a request interceptor
API.interceptors.request.use((config) => {

  const userData = localStorage.getItem('userToken');

  config.headers.Authorization =  userData ? `Token ${JSON.parse(userData).token}` : '';

  return config;
});

export { API as default };
