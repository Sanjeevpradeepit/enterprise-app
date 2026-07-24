import { AxiosError } from 'axios';

export function handleApiError(error: AxiosError) {
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Data:', error.response.data);
  } else if (error.request) {
    console.log('No response from server');
  } else {
    console.log(error.message);
  }

  return Promise.reject(error);
}