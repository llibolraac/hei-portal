<template>
  <div class="relative">
    <button @click="toggleDropdown" class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 00-4 0v1.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>

      <!-- 🔴 Badge -->
      <span v-if="unreadCount > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
        {{ unreadCount }}
      </span>
    </button>

    <!-- 🔽 Dropdown -->
    <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-10">
      <div class="p-3 border-b font-semibold">Notifications</div>
      <div v-if="notifications.length === 0" class="p-3 text-gray-500 text-sm">No notifications.</div>
      <ul v-else class="max-h-60 overflow-y-auto">
        <li
          v-for="n in notifications"
          :key="n.id"
          class="px-4 py-2 hover:bg-gray-100 text-sm border-b"
        >
          <div class="font-bold">{{ n.data.title }}</div>
          <div>{{ n.data.message }}</div>
          <div class="text-xs text-gray-500">{{ timeAgo(n.created_at) }}</div>
        </li>
      </ul>
      <div class="p-2 text-center text-sm">
        <button @click="markAsRead" class="text-blue-500 hover:underline">Mark all as read</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
      unreadCount: 0,
      dropdownOpen: false,
    };
  },
  computed: {
    accessToken() {
      return localStorage.getItem('token'); // or use Vuex if centralized
    },
  },
  methods: {
    async fetchNotifications() {
      try {
        const res = await this.$api.get('/notifications', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        this.notifications = res.data;
        this.unreadCount = res.data.filter(n => n.read_at === null).length;
      } catch (err) {
        console.error('Fetch notifications failed:', err);
      }
    },
    async markAsRead() {
      try {
        await this.$api.post('/notifications/mark-read', {}, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        this.unreadCount = 0;
        this.notifications.forEach(n => (n.read_at = new Date().toISOString()));
      } catch (err) {
        console.error('Mark as read failed:', err);
      }
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    timeAgo(datetime) {
      const time = new Date(datetime);
      const now = new Date();
      const secondsAgo = Math.floor((now - time) / 1000);
      if (secondsAgo < 60) return 'Just now';
      if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} mins ago`;
      if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hrs ago`;
      return time.toLocaleDateString();
    },
  },
  mounted() {
    this.fetchNotifications();

    // Optional: polling every 20 seconds
    this.polling = setInterval(this.fetchNotifications, 20000);
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
};
</script>

<style scoped>
/* optional styles */
</style>
