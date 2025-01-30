// src/api/auth.js
import { api } from '../main';

export const login = (email, password) => {
  const data = { email, password };
  return api.post('/hei-login', data);
};
