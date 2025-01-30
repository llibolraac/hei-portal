// api.js
import axios from 'axios';
import store from '../store';
import { api } from '@/main';

const instance = axios.create({
  baseURL: `${api.defaults.baseURL}/login`, // Combine baseURL with '/login', // Set your API base URL
});

instance.interceptors.request.use((config) => {
  const token = store.getters['auth/token'];
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
