<template>
  <form @submit.prevent="handleSubmit" class="max-w-sm mx-auto">
    <div class="mb-5">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Feature</label
      >
      <select
        v-model="feature"
        id="feature"
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled selected>Choose a feature</option>
        <option :value="'Dashboard'">Dashboard</option>
        <option :value="'Manage Grantees'">Manage Grantees</option>
        <option :value="'Update Grantees Profile'">
          Update Grantees Profile
        </option>
        <option :value="'Manage Billings'">Manage Billings</option>
        <option :value="'Others'">Others</option>
      </select>
    </div>

    <div class="mb-5">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Category</label
      >
      <select
        v-model="category"
        id="countries"
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled selected>Choose a category</option>
        <option :value="'Bugs/Glitch'">Bugs/Glitch</option>
        <option :value="'Suggestions'">Suggestions</option>
        <option :value="'Others'">Others</option>
      </select>
    </div>

    <div class="mb-5">
      <label
        for="description"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Description</label
      >
      <textarea
        v-model="description"
        id="description"
        rows="4"
        required
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CreateForm",
  props: {
    ticketCreated: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["ticket-created"],

  data() {
    return {
      category: "",
      description: "",
      feature: "",
    };
  },

  methods: {
    async handleSubmit() {
      if (!this.category || !this.description) {
        this.$toast.error("Please fill in all required fields");
        return false;
      }

      const confirmed = window.confirm(
        "Are you sure you want to create this ticket?"
      );
      if (!confirmed) return false;

      try {
        await this.$api.post(
          "/support/tickets",
          {
            category: this.category,
            description: this.description,
            feature: this.feature,
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );

        this.$toast.success("Ticket created successfully");
        this.clearFields();
        this.$emit("ticket-created");
        return true;
      } catch (error) {
        console.error("Error creating ticket:", error);
        this.$toast.error(
          error.response?.data?.message || "Failed to create ticket"
        );
        return false;
      }
    },

    clearFields() {
      this.category = "";
      this.description = "";
      this.feature = "";
    },
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "userType", "userId", "heiId"]),
  },
};
</script>
