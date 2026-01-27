import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    // Server responded with error
    if (error.response) {
      return {
        message:
          error.response.data?.message ||
          getErrorMessage(error.response.status),
        status: error.response.status,
        code: error.code,
      };
    }

    // Network error (no response)
    if (error.request) {
      return {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
      };
    }

    // Request setup error
    return {
      message: error.message || 'An error occurred while making the request.',
      code: error.code,
    };
  }

  // Non-Axios error
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'An unexpected error occurred.',
  };
}

function getErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'You are not authorized. Please log in.',
    403: "You don't have permission to access this resource.",
    404: 'The requested resource was not found.',
    408: 'Request timeout. Please try again.',
    429: 'Too many requests. Please wait and try again.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. Please try again later.',
  };

  return messages[status] || 'An error occurred. Please try again.';
}
