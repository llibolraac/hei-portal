// src/store/modules/auth.js

import { login } from '../../api/auth';
import { logout } from '../../api/authlogout'
import axios from 'axios'; // Import Axios

const state = {
  isAuthenticated: false,
  accessToken: null,
  userType: null,
  userName: null,
  userId: null,
  heiId: null,
};

const mutations = {
  SET_AUTH(state, { isAuthenticated, accessToken }) {
    state.isAuthenticated = isAuthenticated;
    state.accessToken = accessToken;
  },

  SET_USER_TYPE(state, userType) {
    state.userType = userType;
  },

  SET_USER_NAME(state, userName) {
    state.userName = userName;
  },

  SET_USER_ID(state, userId) {
    state.userId = userId;
  },

  SET_HEI_ID(state, heiId) {
    state.heiId = heiId;
  },

  LOGOUT(state) {
    state.isAuthenticated = false;
    state.accessToken = null;
    state.userType = null;
    state.userName = null;
    state.userId = null;
    state.heiId = null;
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await login(email, password);



      if (response.data.success) {
        const accessToken = response.data.token;
        const userType = response.data.user_type;
        const userName = response.data.userName;
        const userId = response.data.user.id;
        const heiId = response.data.user.hei_id;

        // Set Axios Authorization header for authenticated requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        commit('SET_AUTH', { isAuthenticated: true, accessToken });
        commit('SET_USER_TYPE', userType);
        commit('SET_USER_NAME', userName);
        commit('SET_USER_ID', userId);
        commit('SET_HEI_ID', heiId);

        return { success: true, message: response }; // Return success and message
      } else {

        return { success: false, message: response.data.message };
      }

    } catch (error) {
      if (error) {

        const serverResponse = error.response.data;
        return { success: false, message: serverResponse.message };
      } else {
        // console.error('An error occurred:', error.message);
        // throw new Error('Login failed');

        const serverResponse = error.response.data;


        return { success: false, message: serverResponse.message };
      }
    }
    // const response = await login(email, password);
    // console.log(response.data.message);

  },
  async logout({ commit }) {

    try {
      // const res = await logout();
      delete axios.defaults.headers.common['Authorization'];
      commit('LOGOUT');
    } catch (error) {
      console.log(error);
    }

  },
};

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  accessToken: state => state.accessToken,
  userType: state => state.userType,
  userName: state => state.userName,
  userId: state => state.userId,
  heiId: state => state.heiId,
};

// Global Axios interceptor to handle "Unauthenticated." message
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data.message === 'Unauthenticated.') {
      // Log out the user and redirect to the login page
      store.dispatch('auth/logout'); // Assuming your store instance is named 'store'
      router.push({ name: 'Login' }); // Assuming your router setup

      // You may also want to display a notification to the user here
    }
    return Promise.reject(error);
  }
);

export default {
  namespaced: true, // Important: Set namespaced to true
  state,
  mutations,
  actions,
  getters,
};
