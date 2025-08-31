<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Ticket Number</label
        >
        <div class="relative">
          <input
            type="text"
            v-model="ticket.ticket_no"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readonly
          />
        </div>
      </div>
      <div>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Status</label
        >
        <div class="relative">
          <span
            v-if="ticket.status === 0"
            class="px-2.5 py-1 inline-flex items-center text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            <span class="w-2 h-2 mr-1.5 bg-yellow-500 rounded-full"></span>
            Open
          </span>
          <span
            v-else
            class="px-2.5 py-1 inline-flex items-center text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          >
            <span class="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
            Resolved
          </span>
        </div>
      </div>
      <div class="md:col-span-2">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Category</label
        >
        <div class="relative">
          <input
            type="text"
            v-model="ticket.category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readonly
          />
        </div>
      </div>
      <div class="md:col-span-2">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Date Submitted</label
        >
        <div class="relative">
          <input
            type="text"
            :value="formatDate(ticket.created_at)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            readonly
          />
        </div>
      </div>
      <div class="md:col-span-2">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <textarea
          rows="4"
          v-model="ticket.description"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          readonly
        ></textarea>
      </div>

      <div class="md:col-span-2">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Actions Taken</label
        >
        <textarea
          rows="4"
          v-model="ticket.actions_taken"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TicketDetails",
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["accessToken", "userType", "userId", "heiId"]),
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>
