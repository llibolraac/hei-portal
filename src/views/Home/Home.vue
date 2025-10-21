<template>
  <div class="bg-white min-h-screen">
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
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          class="p-5 bg-white rounded-lg shadow-lg transform transition hover:scale-105"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <dt class="text-sm font-medium text-gray-500 truncate">
                Total Grantees
              </dt>
              <dd class="flex items-center">
                <p class="text-2xl font-semibold text-gray-900">
                  {{ formatDecimalValue(statistics.total) || 0 }}
                </p>
              </dd>
            </div>
          </div>
        </div>
        <div class="p-5 bg-white rounded-lg shadow">
          <div class="text-base text-gray-400">TES Grantees</div>
          <div class="flex items-center pt-1">
            <div class="text-2xl font-bold text-blue-600">
              {{ formatDecimalValue(statistics.tes) || 0 }}
            </div>
          </div>
        </div>
        <div class="p-5 bg-white rounded-lg shadow">
          <div class="text-base text-gray-400">TDP Grantees</div>
          <div class="flex items-center pt-1">
            <div class="text-2xl font-bold text-green-600">
              {{ formatDecimalValue(statistics.tdp) || 0 }}
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="mt-8">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <!-- Line Chart -->
          <div class="p-5 bg-white rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Grantee Trends
            </h3>
            <div class="h-80">
              <LineChart
                v-if="chartData"
                :chartData="chartData"
                :chartOptions="chartOptions"
              />
              <div
                v-else
                class="h-full flex items-center justify-center text-gray-500"
              >
                Loading chart data...
              </div>
            </div>
          </div>

          <!-- Pie Chart -->
          <div class="p-5 bg-white rounded-lg shadow">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              Program Distribution
            </h3>
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
                Loading distribution data...
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Announcements from "./Components/Announcements.vue";
import LineChart from "../../components/charts/LineChart.vue";
import PieChart from "../../components/charts/PieChart.vue";
import Deadlines from "./Components/Deadlines.vue";

export default {
  components: {
    LineChart,
    PieChart,
    Announcements,
    Deadlines,
  },
  data() {
    return {
      statistics: {
        tes: 0,
        tdp: 0,
        total: 0,
      },
      deadlines: [],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Monthly Grant Distribution",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
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
      recentActivities: [
        {
          title: "New grant applications received",
          description: "5 new applications for TES program",
          time: "2 hours ago",
        },
        {
          title: "Application status updated",
          description: '10 applications moved to "In Review" status',
          time: "5 hours ago",
        },
        {
          title: "Monthly report generated",
          description: "September 2025 grantee report is ready",
          time: "1 day ago",
        },
      ],
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
