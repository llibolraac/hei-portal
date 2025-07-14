import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';
import 'flowbite';
import 'flowbite/dist/flowbite.js';
import 'axios'
import ToastPlugin from './plugins/toast'
import './index.css' // Import Tailwind CSS
import Modal from './views/Modal/Modal.vue';
import { TailwindPagination } from 'laravel-vue-pagination';


const api = axios.create({
  baseURL: 'https://ucmis-api.chedcaraga.ph/api', // Adjust as needed
  // other configurations
});

api.interceptors.response.use(
  (response) => {
    // console.log('API Response Intercepted:', response.data);
    return response;
  },
  (error) => {
    if (error.response.data.message) {
      store.dispatch('auth/logout')
    }
  }
);



const app = createApp(App)
app.use(ToastPlugin) // Register the toast plugin
app.config.globalProperties.$api = api;
app.component('TailwindPagination', TailwindPagination);
app.component('Modal', Modal);
app.use(router)
app.use(store, api);
app.mount('#app')

export { api };
