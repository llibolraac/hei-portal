<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Welcome Section -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-16 px-4 sm:px-6 lg:px-8"
    >
      <!-- Animated background elements -->
      <div class="absolute inset-0 opacity-20">
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMjAgMThjMS4xIDAgMi0uOSAyLTIuMXMtLjktMi4xLTIuMS0yLjEtMiAuOS0yIDIuMS45IDIuMSAyLjEgMi4xem0wIDJjLTEuMSAwLTIgLjktMiAyLjFzLjkgMi4xIDIuMSAyLjEgMi0uOSAyLTIuMS0uOS0yLjEtMi4xLTIuMXptMC02Yy0xLjEgMC0yIC45LTIgMi4xcy45IDIuMSAyLjEgMi4xIDItLjkgMi0yLjEtLjktMi4xLTIuMS0yLjF6Ii8+PC9nPjwvZz48L3N2Zz4=')]"
        ></div>
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <div
          class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white mb-6"
        >
          <span class="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
          System Online •
          {{
            new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </div>
        <h1
          class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
        >
          <span class="block">Welcome back,</span>
          <span class="block text-blue-200 mt-2">{{ userName }}! 👋</span>
        </h1>
        <p class="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
          We’re so excited to have you on board! Thank you for being one of the
          first to check out our system while it’s still fresh and new. We’re
          busy adding cool features and make everything sparkle. If you dream up
          any brilliant ideas for data you’d like to see, please send them our
          way. We’d love to hear them!
        </p>
      </div>
    </div>

    <!-- Analytics Dashboard -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Data Period Disclaimer -->
      <div
        class="mb-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 shadow-sm"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-blue-500 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-blue-800">
              Data Period:
              <span class="font-semibold"
                >School Year 2024-2025, 1st Semester</span
              >
            </p>
            <p class="text-xs text-blue-700 mt-1">
              All statistics and charts displayed below reflect data from the
              current uploaded grantees, based on School Year 2024–2025, 1st
              Semester.
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          class="relative overflow-hidden bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl border-t-4 border-blue-500"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p
                  class="text-sm font-medium text-gray-500 uppercase tracking-wide"
                >
                  TES Grantees
                </p>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                  {{ formatDecimalValue(statistics.tes) || 0 }}
                </p>
              </div>
              <div class="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                <svg
                  class="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative overflow-hidden bg-white rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl border-t-4 border-green-500"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <p
                  class="text-sm font-medium text-gray-500 uppercase tracking-wide"
                >
                  TDP Grantees
                </p>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                  {{ formatDecimalValue(statistics.tdp) || 0 }}
                </p>
              </div>
              <div class="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                <svg
                  class="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-xl"
        >
          <div
            class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white opacity-10"
          ></div>
          <div class="relative p-6">
            <div class="flex items-center justify-between">
              <div>
                <p
                  class="text-sm font-medium text-blue-100 uppercase tracking-wide"
                >
                  Total Grantees
                </p>
                <p class="mt-2 text-4xl font-bold text-white">
                  {{ formatDecimalValue(statistics.total) || 0 }}
                </p>
              </div>
              <div
                class="flex-shrink-0 bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm"
              >
                <svg
                  class="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Announcements and Deadlines -->
      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Announcements -->
        <Announcements />

        <!-- Deadlines -->
        <Deadlines />
      </div>

      <!-- Charts Section -->
      <div class="mt-8">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Gender Distribution Chart -->
          <div
            class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div
              class="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200"
            >
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                  class="h-5 w-5 text-blue-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Gender Distribution
              </h3>
            </div>
            <div class="p-6">
              <div class="h-80">
                <PieChart
                  v-if="genderChartData"
                  :chartData="genderChartData"
                  :chartOptions="genderChartOptions"
                />
                <div
                  v-else
                  class="h-full flex items-center justify-center text-gray-500"
                >
                  <div class="text-center">
                    <svg
                      class="animate-spin h-8 w-8 text-blue-600 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p>Loading chart data...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Program Distribution Chart -->
          <div
            class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div
              class="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200"
            >
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <svg
                  class="h-5 w-5 text-green-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
                Program Distribution
              </h3>
            </div>
            <div class="p-6">
              <div class="h-80">
                <PieChart
                  v-if="pieChartData"
                  :chartData="pieChartData"
                  :chartOptions="pieChartOptions"
                />
                <div
                  v-else
                  class="h-full flex items-center justify-center text-gray-500"
                >
                  <div class="text-center">
                    <svg
                      class="animate-spin h-8 w-8 text-green-600 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p>Loading distribution data...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Announcements from "./Components/Announcements.vue";
import PieChart from "../../components/charts/PieChart.vue";
import Deadlines from "./Components/Deadlines.vue";

export default {
  components: {
    PieChart,
    Announcements,
    Deadlines,
  },
  data() {
    return {
      statistics: {
        tes: 0,
        tdp: 0,
        male: 0,
        female: 0,
        total: 0,
      },
      deadlines: [],
      genderChartData: null,
      genderChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
      pieChartData: null,
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
      recentActivities: [],
    };
  },
  computed: {
    ...mapGetters("auth", ["accessToken", "userName", "heiId"]),
  },
  methods: {
    formatDecimalValue(value) {
      return value ? Number(value).toLocaleString() : "0";
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    daysUntil(dateString) {
      const today = new Date();
      const deadline = new Date(dateString);
      const diffTime = deadline - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    getDeadlineText(dateString) {
      const days = this.daysUntil(dateString);
      if (days === 0) return "Due today";
      if (days === 1) return "Tomorrow";
      if (days < 0) return "Overdue";
      return `In ${days} days`;
    },
    getDeadlineBadgeClass(dateString) {
      const days = this.daysUntil(dateString);
      if (days <= 0) return "bg-red-100 text-red-800";
      if (days <= 3) return "bg-yellow-100 text-yellow-800";
      return "bg-green-100 text-green-800";
    },
    async fetchHEIStats() {
      try {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 500));

        // This would be replaced with actual API call
        const res = await this.$api.post(
          "/fetch-hei-statistics",
          { hei_id: this.heiId },
          { headers: { Authorization: `Bearer ${this.accessToken}` } }
        );

        // Mock data for demonstration

        // this.statistics.tes = res.data;
        this.statistics.tes = res.data.tes;
        this.statistics.tdp = res.data.tdp;
        this.statistics.total = res.data.total_validated_grantees;
        this.statistics.male = res.data.total_male;
        this.statistics.female = res.data.total_female;

        this.pieChartData = {
          labels: ["TES Grantees", "TDP Grantees"],
          datasets: [
            {
              data: [this.statistics.tes, this.statistics.tdp],
              backgroundColor: ["#3b82f6", "#10b981"],
              borderWidth: 1,
            },
          ],
        };

        this.genderChartData = {
          labels: ["Male", "Female"],
          datasets: [
            {
              data: [this.statistics.male, this.statistics.female],
              backgroundColor: ["#3b82f6", "#ec4899"],
              borderWidth: 1,
            },
          ],
        };
      } catch (error) {
        console.error("Failed to fetch HEI statistics:", error);
      }
    },
  },
  mounted() {
    this.fetchHEIStats();
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
