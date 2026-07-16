import { Env } from './env';

export const API = {
  BASE_URL: Env.API_URL,

  TIMEOUT: 30000,

  VERSION: '/v1',

  PREFIX: '/api',

  FULL_URL: `${Env.API_URL}/api/v1`,
};