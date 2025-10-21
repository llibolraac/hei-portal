<template>
  <div
    v-if="isVisible"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center w-full h-full backdrop-blur"
  >
    <div
      :class="modalSizeClass"
      class="relative p-4 w-full max-w-md max-h-full"
    >
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal"
          >
            <svg
              class="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <!-- Modal body -->
        <div class="p-4">
          <slot></slot>
          <!-- Content passed from parent component -->
        </div>

        <!-- Modal footer -->
        <div v-if="isSubmit" class="p-4 flex justify-end">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="submitAction"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      default: "Modal Title",
    },
    buttonText: {
      type: String,
      default: "Submit",
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    isSubmit: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium", // Default size is 'medium'
      validator(value) {
        return ["small", "medium", "large"].includes(value); // Ensure only these sizes are valid
      },
    },
  },
  computed: {
    modalSizeClass() {
      // Adjust the width based on the size prop
      switch (this.size) {
        case "small":
          return "max-w-sm"; // Small size
        case "large":
          return "max-w-4xl"; // Large size
        case "medium":
        default:
          return "max-w-md"; // Medium size
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:isVisible", false); // Emit the updated visibility state
    },
    async submitAction() {
      try {
        // Emit the submit event and wait for any promise to resolve
        const result = await new Promise((resolve) => {
          this.$emit("submit", resolve);
        });

        // Only close the modal if the result is not false
        if (result !== false) {
          this.closeModal();
        }
      } catch (error) {
        console.error("Error in submit action:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional scoped styles */
</style>
