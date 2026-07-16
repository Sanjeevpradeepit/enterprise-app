export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },

  USER: {
    ME: '/users/me',
    UPDATE: '/users/me',
  },

  TENANT: {
    CURRENT: '/tenant/current',
  },
} as const;