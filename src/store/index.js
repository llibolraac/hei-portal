// src/store/index.js

import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import voucherCount from './modules/voucherCount'

export default createStore({
  modules: {
    auth,
    voucherCount
    // other modules...
  },
  plugins: [createPersistedState()],
});
