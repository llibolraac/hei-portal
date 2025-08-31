<template>
  <div class="bg-white min-h-screen">
    <!-- Welcome Section -->
    <section class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
        Welcome, {{ userName }}!
      </h1>
      <p class="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 lg:px-48">
        We're so excited to have you on board! Thank you for being one of the first to check out our system while it's still fresh and new.

        We're busy adding cool features and making everything sparkle. If you dream up any brilliant ideas for data you'd like to see, please send them our way. We'd love to hear them!
      </p>

      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdBCOgkrk73R6OYFoncDWiyK88AAlKlvQVTLCScs0vKdrGlfQ/viewform?usp=dialog" target="_blank" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Share Your Thoughts</a>
    </section>

    <!-- Grantee Summary Cards -->
    <div class="max-w-screen-xl mx-auto px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6 text-center">
        <h3 class="text-lg font-medium text-gray-700 mb-2">TES Grantees</h3>
        <p class="text-3xl font-bold text-blue-600">{{ formatDecimalValue(statistics.tes) ?? 0 }}</p>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6 text-center">
        <h3 class="text-lg font-medium text-gray-700 mb-2">TDP Grantees</h3>
        <p class="text-3xl font-bold text-green-600">{{ formatDecimalValue(statistics.tdp) ?? 0 }}</p>
      </div>
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6 text-center">
        <h3 class="text-lg font-medium text-gray-700 mb-2">Total Grantees</h3>
        <p class="text-3xl font-bold text-indigo-600">{{ formatDecimalValue(statistics.total) ?? 0 }}</p>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="text-center text-sm italic text-gray-500 mb-10">
      Data as of 1st Semester 2024–2025
    </div>

    <!-- Activities & Announcements -->
    <div class="max-w-screen-xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Upcoming Activities -->
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">📅 Upcoming Activities</h2>
        <p class="text-gray-500">Nothing yet</p>
      </div>

      <!-- Announcements -->
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">📢 Announcements</h2>
        <p class="text-gray-500">Nothing yet</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      statistics: {
        tes: 0,
        tdp: 0,
        total: 0
        }
    }
  },
  computed: {
    ...mapGetters('auth', ['accessToken','userName', 'heiId']),
  },

  methods:{

    formatDecimalValue(decimalValue) {
       return Number(decimalValue).toLocaleString(); // Format to a string
    },


    async fetchHEIStats() {

    try {
        const res = await this.$api.post('/fetch-hei-statistics', {
        hei_id: this.heiId,
        }, {
        headers: {
            Authorization: `Bearer ${this.accessToken}`
        }
        });

        this.statistics = {
        tes: res.data.tes,
        tdp: res.data.tdp,
        total: res.data.total_validated_grantees
        };
    } catch (error) {
        console.error("Failed to fetch HEI statistics:", error);
    }
    },
  },

  mounted() {
    this.fetchHEIStats();

  }
}
</script>
