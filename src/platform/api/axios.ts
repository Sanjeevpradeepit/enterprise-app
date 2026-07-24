import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.example.com/api/v1',

//   baseURL: Config.API_URL,
  timeout: 30000,

  headers: {
    'Content-Type': 'application/json',
  },
});