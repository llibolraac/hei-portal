<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/components/Toast.vue -->
<template>
    <transition name="fade">
      <div v-if="visible" :class="toastClass" class="fixed bottom-4 right-4 max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div :class="iconClass" class="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg">
          <slot name="icon"></slot>
        </div>
        <div class="ml-3 text-sm font-normal">{{ message }}</div>
        <button @click="hideToast" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
        type: '',
      };
    },
    computed: {
      toastClass() {
        return {
          'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200': this.type === 'success',
          'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200': this.type === 'error',
          'bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200': this.type === 'warning',
        };
      },
      iconClass() {
        return {
          'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200': this.type === 'success',
          'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200': this.type === 'error',
          'bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200': this.type === 'warning',
        };
      },
    },
    methods: {
      showToast(message, type) {
        this.message = message;
        this.type = type;
        this.visible = true;
        setTimeout(this.hideToast, 3000);
      },
      hideToast() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>