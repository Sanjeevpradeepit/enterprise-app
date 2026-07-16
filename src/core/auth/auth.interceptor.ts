import { api } from '../api';
import { tokenService } from './token.service';

api.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});