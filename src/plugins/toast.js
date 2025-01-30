import { createApp } from 'vue';
import Toast from '../components/Toast.vue';

const ToastPlugin = {
  install(app) {
    const toastApp = createApp(Toast);
    const toastInstance = toastApp.mount(document.createElement('div'));
    document.body.appendChild(toastInstance.$el);

    app.config.globalProperties.$toast = {
      success(message) {
        toastInstance.showToast(message, 'success');
      },
      error(message) {
        toastInstance.showToast(message, 'error');
      },
      warning(message) {
        toastInstance.showToast(message, 'warning');
      },
    };
  },
};

export default ToastPlugin;