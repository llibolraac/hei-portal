<template>
  <div class="dark:bg-gray-900 sm:p-6">
    <div class="mx-auto">
      <nav class="mb-6" aria-label="Breadcrumb">
        <ol
          class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
        >
          <li class="inline-flex items-center">
            <a
              href="#"
              class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
            >
              <svg
                class="w-4 h-4 me-2.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                />
              </svg>
              Home
            </a>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-4 h-4 text-gray-400 mx-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span class="text-sm font-medium text-blue-600 dark:text-blue-400"
                >Support Tickets</span
              >
            </div>
          </li>
        </ol>
      </nav>

      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Support Tickets
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage all your support requests
          </p>
        </div>
        <button
          @click="openTicketModal"
          class="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Create New Ticket
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div class="flex space-x-4">
            <div class="flex-1 space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            <div class="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="w-5 h-5 text-red-600 dark:text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
              Error loading tickets
            </h3>
            <div class="mt-2 text-sm text-red-700 dark:text-red-300">
              <p>{{ error }}</p>
            </div>
            <div class="mt-4">
              <button
                @click="fetchTickets"
                class="text-sm font-medium text-red-700 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
              >
                Try again
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!tickets?.data?.length"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center"
      >
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
            No tickets yet
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            You haven't created any support tickets yet. Get started by creating
            your first ticket.
          </p>
          <button
            @click="openTicketModal"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create Ticket
          </button>
        </div>
      </div>

      <!-- Tickets Table -->
      <div
        v-else
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead class="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  No.
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Date Submitted
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Ticket #
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <template v-for="(ticket, i) in tickets.data" :key="ticket?.id">
                <tr
                  v-if="ticket && ticket.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {{ i + 1 }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ formatDate(ticket.created_at) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600 dark:text-blue-400 font-medium"
                  >
                    {{ ticket.ticket_no }}
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate"
                  >
                    <span class="truncate">{{ ticket.description }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {{ ticket.category || "General" }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      v-if="ticket.status === 0"
                      class="px-2.5 py-1 inline-flex items-center text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    >
                      <span
                        class="w-2 h-2 mr-1.5 bg-yellow-500 rounded-full"
                      ></span>
                      Open
                    </span>
                    <span
                      v-else
                      class="px-2.5 py-1 inline-flex items-center text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      <span
                        class="w-2 h-2 mr-1.5 bg-green-500 rounded-full"
                      ></span>
                      Resolved
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <button
                      @click="viewTicket(ticket)"
                      class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                      title="View Details"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-5">
        <TailwindPagination
          :data="tickets"
          @pagination-change-page="fetchTickets"
          :limit="5"
        />
      </div>
    </div>
  </div>

  <Modal
    :isVisible="showModal"
    title="Create New Ticket"
    @close="showModal = false"
    :isSubmit="true"
    @submit="$refs.createForm.handleSubmit()"
    @update:isVisible="showModal = $event"
  >
    <CreateForm ref="createForm" @ticket-created="handleTicketCreated" />
  </Modal>

  <Modal
    :isVisible="showTicketModal"
    @close="showTicketModal = false"
    @update:isVisible="showTicketModal = $event"
    title="Ticket Details"
    :isSubmit="false"
    :size="'large'"
  >
    <TicketDetails :ticket="selectedTicket" />
  </Modal>
</template>

<script>
import { mapGetters } from "vuex";
import CreateForm from "./CreateForm.vue";
import TicketDetails from "./TicketDetails.vue";

export default {
  name: "Support",
  components: {
    CreateForm,
    TicketDetails,
  },
  data() {
    return {
      tickets: { data: [] },
      showModal: false,
      category: "",
      description: "",
      loading: false,
      error: null,
      selectedTicket: null,
      showTicketModal: false,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "userType", "userId", "heiId"]),
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    openTicketModal() {
      this.showModal = true;
    },

    viewTicket(ticket) {
      this.selectedTicket = ticket;
      this.showTicketModal = true;
    },

    handleTicketCreated() {
      this.showModal = false;
      this.fetchTickets();
    },

    async fetchTickets(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const response = await this.$api.get(`/support/tickets?page=${page}`, {
          params: {
            user_id: this.userId,
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.tickets = response.data;
      } catch (error) {
        console.error("Error fetching tickets:", error);
        this.error =
          error.response?.data?.message ||
          "Failed to fetch tickets. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.fetchTickets();
  },
};
</script>
