// src/api/auth.js
import { api } from '../main';

export const logout = () => {
  return api.post('/logout',);
};
