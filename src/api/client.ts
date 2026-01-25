import axios, { type AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generic helper to perform API requests using the configured axios instance.
 *
 * @template T - The expected type of the response data.
 * @param url - The API URL endpoint.
 * @param config - Optional axios request configuration.
 * @returns A promise that resolves to the response data.
 */

export async function apiRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axiosInstance.request<T>({
    url,
    ...config,
  });

  return response.data;
}
