export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  error?: any;
  data?: T;
}

export function createResponse<T>(
  statusCode: number,
  data?: T,
  error?: any,
): ApiResponse<T> {
  let message: string;
  if (statusCode === 200 || statusCode === 201) {
    message = 'Success';
  } else if (statusCode === 400) {
    message = 'Bad Request';
  } else if (statusCode === 401) {
    message = 'Unauthorized';
  } else if (statusCode === 403) {
    message = 'Forbidden';
  } else if (statusCode === 404) {
    message = 'Not Found';
  } else if (statusCode === 500) {
    message = 'Internal Server Error';
  } else {
    message = 'Unknown Error';
  }

  return {
    statusCode,
    message,
    data,
    error,
  };
}
