<template>
  <div class="lg:col-span-2 bg-white rounded-lg shadow">
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-900">Announcements</h3>
        <button class="text-sm text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>
      <div class="space-y-6">
        <div
          v-for="announcement in announcements"
          :key="announcement.id"
          class="border-b pb-4 last:border-b-0 last:pb-0"
        >
          <div class="flex items-start">
            <div
              class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
            >
              <svg
                class="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <div class="ml-4 flex-1">
              <div class="flex justify-between items-start">
                <h4 class="text-sm font-medium text-gray-900">
                  {{ announcement.title }}
                </h4>

                <button
                  @click="viewAnnouncement(announcement)"
                  class="text-gray-400 hover:text-gray-600"
                  title="View announcement"
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
              <p class="mt-1 text-sm text-gray-600 line-clamp-2">
                {{ announcement.description }}
              </p>
              <p class="mt-1 text-xs text-gray-400">
                {{ formatDate(announcement.created_at) }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="!announcements.length"
          class="text-center py-4 text-gray-500"
        >
          No announcements at the moment.
        </div>
      </div>
    </div>

    <!-- Announcement View Modal -->
    <Modal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      :title="'Announcements'"
      :size="'large'"
    >
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ selectedAnnouncement?.title }}

          <p class="text-sm text-gray-500 italic">
            {{
              selectedAnnouncement
                ? formatDate(selectedAnnouncement.created_at)
                : ""
            }}
          </p>
        </h3>

        <div
          class="prose max-w-none text-gray-600 mb-4"
          v-html="selectedAnnouncement?.description"
        ></div>
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
      announcements: [],
      selectedAnnouncement: null,
      showModal: false,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken"]),
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    async fetchAnnouncements() {
      try {
        const response = await this.$api.get("/announcements", {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        this.announcements = response.data.data;
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    },

    viewAnnouncement(announcement) {
      this.selectedAnnouncement = announcement;
      this.showModal = true;
    },
  },

  mounted() {
    this.fetchAnnouncements();
    // console.log(this.accessToken);
  },
};
</script>
