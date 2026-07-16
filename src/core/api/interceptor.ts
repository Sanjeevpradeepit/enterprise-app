import { AxiosError } from 'axios';

import { api } from './axios';
import { refreshAccessToken } from './refreshToken';
import { handleApiError } from './errorHandler';

api.interceptors.request.use(async config => {
  /**
   * Later:
   *
   * const token = await storage.getAccessToken();
   *
   * if (token) {
   *    config.headers.Authorization = `Bearer ${token}`;
   * }
   */

  return config;
});

api.interceptors.response.use(
  response => response,

  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const accessToken = await refreshAccessToken();

      if (accessToken) {
        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return api(originalRequest);
      }
    }

    return handleApiError(error);
  },
);