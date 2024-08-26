export interface ApiResponse<T> {
  code: number;
  message: string;
  error?: any;
  data?: T;
}

export function createResponse<T>(
  code: number,
  data?: T,
  error?: any,
): ApiResponse<T> {
  let message: string;
  if (code === 200) {
    message = 'Success';
  } else if (code === 400) {
    message = 'Bad Request';
  } else if (code === 401) {
    message = 'Unauthorized';
  } else if (code === 403) {
    message = 'Forbidden';
  } else if (code === 404) {
    message = 'Not Found';
  } else if (code === 500) {
    message = 'Internal Server Error';
  } else {
    message = 'Unknown Error';
  }

  return {
    code,
    message,
    data,
    error,
  };
}
