<template>
  <div class="bg-white rounded-lg shadow">
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-900">Upcoming Deadlines</h3>
        <button class="text-sm text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>
      <div class="space-y-4">
        <div
          v-for="(deadline, index) in deadlines"
          :key="index"
          class="border-b pb-4 last:border-b-0 last:pb-0"
        >
          <div class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-4 flex-1">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-medium text-gray-900">
                  {{ deadline.title }}
                </h4>
                <button
                  @click="viewDeadline(deadline)"
                  class="text-gray-400 hover:text-gray-600"
                  title="View deadline"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-1 flex items-center text-sm text-gray-600">
                <span>{{ formatDate(deadline.deadline) }}</span>
                <span
                  v-if="daysUntil(deadline.deadline) > 0"
                  class="ml-2 px-2 py-0.5 text-xs rounded-full"
                  :class="getDeadlineBadgeClass(deadline.deadline)"
                >
                  {{ getDeadlineText(deadline.deadline) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!deadlines.length" class="text-center py-4 text-gray-500">
          No upcoming deadlines.
        </div>
      </div>
    </div>

    <!-- Deadline View Modal -->
    <Modal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      :title="'Deadlines'"
      :size="'large'"
    >
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ selectedDeadline?.title }} <br />

          <p class="text-sm text-gray-600 italic">
            {{ selectedDeadline ? formatDate(selectedDeadline.deadline) : "" }}
          </p>

          <p class="text-sm text-gray-600 italic">
            {{ selectedDeadline?.description }}
          </p>

          <span
            class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300"
            >Deadline</span
          >
        </h3>
        <div class="space-y-3">
          <div v-if="selectedDeadline?.description">
            <div
              class="prose max-w-none text-gray-600"
              v-html="selectedDeadline.description"
            ></div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "../../Modal/Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      deadlines: [],
      selectedDeadline: null,
      showModal: false,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken"]),
  },

  methods: {
    daysUntil(date) {
      const now = new Date();
      const target = new Date(date);
      const diff = target - now;
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    },

    getDeadlineText(date) {
      const days = this.daysUntil(date);
      if (days === 0) return "Today";
      if (days === 1) return "Tomorrow";
      return `In ${days} days`;
    },

    getDeadlineBadgeClass(date) {
      const days = this.daysUntil(date);
      if (days <= 1) return "bg-red-100 text-red-800";
      if (days <= 3) return "bg-yellow-100 text-yellow-800";
      return "bg-green-100 text-green-800";
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    async fetchDeadlines() {
      try {
        const response = await this.$api.get("/deadlines", {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        this.deadlines = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching deadlines:", error);
      }
    },

    viewDeadline(deadline) {
      this.selectedDeadline = deadline;
      this.showModal = true;
    },
  },

  mounted() {
    this.fetchDeadlines();
    // console.log(this.accessToken);
  },
};
</script>
