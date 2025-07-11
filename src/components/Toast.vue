<template>
  <transition name="fade">
    <div v-if="visible" class="flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-sm fixed bottom-4 right-4" :class="toastBaseClasses" role="alert" aria-live="polite">
      <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg" :class="iconContainerClasses">
        <slot name="icon">
          <svg v-if="type === 'success'" class="w-5 h-5"xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <svg v-else-if="type === 'error'" class="w-5 h-5"xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
          </svg>
          <svg v-else-if="type === 'warning'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
          </svg>
          <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V9h-1a1 1 0 0 1-1-1v-2Z"/>
          </svg>
        </slot>
      </div>
      <div class="ms-3 text-sm font-normal" :class="messageClasses">{{ message }}</div>
      <button @click="hideToast" type="button" class="ms-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 inline-flex items-center justify-center h-8 w-8" :class="closeButtonClasses" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
data() {
  return {
    visible: false,
    message: '',
    type: '', // 'success', 'error', 'warning', 'info' (or no type for default)
    _toastTimeout: null, // To store the timeout ID for clearing
  };
},
computed: {
  // Base classes for the entire toast container (background, overall text color)
  toastBaseClasses() {
    // Flowbite's default toast is white/gray with specific text/icon colors
    return 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400';
  },
  // Classes for the icon container's background and icon color
  iconContainerClasses() {
    if (this.type === 'success') {
      return 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200';
    } else if (this.type === 'error') {
      return 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200';
    } else if (this.type === 'warning') {
      return 'text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200'; // Note: Flowbite's warning is `bg-orange-700`
    }
    // Default/Info icon classes
    return 'text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200';
  },
  // Classes for the message text itself (not strictly needed if base classes cover it)
  messageClasses() {
    // Flowbite uses text-gray-500/400 for message, but if you want specific colors:
    // if (this.type === 'success') return 'text-green-700 dark:text-green-300';
    // if (this.type === 'error') return 'text-red-700 dark:text-red-300';
    // if (this.type === 'warning') return 'text-orange-700 dark:text-orange-300';
    return ''; // Let the parent toastBaseClasses handle it
  },
  // Classes for the close button
  closeButtonClasses() {
    // Flowbite close button is generally consistent across types, using gray-ish hover/focus
    return 'bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700';
  },
},
methods: {
  showToast(message, type = 'info', duration = 3000) { // Added default type 'info'
    this.message = message;
    this.type = type;
    this.visible = true;

    if (this._toastTimeout) {
      clearTimeout(this._toastTimeout);
    }
    this._toastTimeout = setTimeout(this.hideToast, duration);
  },
  hideToast() {
    this.visible = false;
    if (this._toastTimeout) {
      clearTimeout(this._toastTimeout);
      this._toastTimeout = null;
    }
  },
},
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
/* Flowbite uses a slightly more aggressive transition. Mimic with ease-in-out or ease-out */
transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.fade-enter-from, .fade-leave-to { /* Use -from and -to with Vue 3 */
opacity: 0;
transform: translateX(100%); /* Slide out to the right */
}
/* For Vue 2 compatibility, keep .fade-enter and .fade-leave-to as well */
.fade-enter, .fade-leave-to {
opacity: 0;
transform: translateX(100%); /* Slide out to the right */
}
</style>