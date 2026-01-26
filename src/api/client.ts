import axios, { type AxiosInstance } from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});
