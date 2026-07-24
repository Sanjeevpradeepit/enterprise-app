import { api } from '../api';

class AuthService {
  login(data: {
    email: string;
    password: string;
  }) {
    return api.post('/auth/login', data);
  }

  register(data: unknown) {
    return api.post('/auth/register', data);
  }

  refresh(refreshToken: string) {
    return api.post('/auth/refresh', {
      refreshToken,
    });
  }

  logout() {
    return api.post('/auth/logout');
  }

  profile() {
    return api.get('/auth/profile');
  }
}

export const authService = new AuthService();