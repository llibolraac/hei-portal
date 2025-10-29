<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            @click="toggleMobileSidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <a href="#" class="flex ms-2 md:me-24">
            <img src="/src/assets/unifast.png" class="h-8 me-3" />
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >UCMIS</span
            >
          </a>
        </div>
        <div class="flex items-center">
          <!-- notifications -->
          <div class="relative">
            <button
              id="dropdownNotificationButton"
              class="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
              type="button"
              @click="toggleNotifications"
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path
                  d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"
                />
              </svg>

              <div
                v-if="unreadCount > 0"
                class="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"
              ></div>
            </button>

            <!-- Notification Dropdown -->
            <div
              v-if="isNotificationOpen"
              class="absolute right-0 z-20 w-80 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 notification-dropdown"
            >
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="flex justify-between items-center">
                  <h3 class="font-medium text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <button
                    v-if="unreadCount > 0"
                    @click="markAllAsRead"
                    class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  v-if="notifications.length === 0"
                  class="p-4 text-center text-sm text-gray-500"
                >
                  No new notifications
                </div>
                <div v-else>
                  <a
                    v-for="notification in notifications"
                    :key="notification.id"
                    href="#"
                    @click.prevent="markAsRead(notification)"
                    class="block px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    :class="{
                      'bg-gray-50 dark:bg-gray-700/50': !notification.read_at,
                    }"
                  >
                    <div class="flex items-start">
                      <div class="flex-shrink-0 pt-0.5">
                        <img
                          class="w-8 h-8 rounded-full"
                          src="/src/assets/unifast.png"
                          alt="Notification icon"
                        />
                      </div>
                      <div class="ml-3 flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {{
                            notification.data?.title ||
                            notification.title ||
                            "New Notification"
                          }}
                        </p>
                        <p
                          class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
                        >
                          {{
                            notification.data?.message ||
                            notification.message ||
                            "You have a new notification"
                          }}
                        </p>
                        <div class="mt-1 text-xs text-gray-400">
                          {{ formatTimeAgo(notification.created_at) }}
                        </div>
                      </div>
                      <div v-if="!notification.read_at" class="ml-2">
                        <span
                          class="w-2 h-2 bg-blue-500 rounded-full inline-block"
                        ></span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Dropdown menu -->
          <div
            id="dropdownNotification"
            class="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:divide-gray-700"
            aria-labelledby="dropdownNotificationButton"
          >
            <div
              class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white"
            >
              Notifications
            </div>
            <div class="divide-y divide-gray-100 dark:divide-gray-700">
              <ul>
                <li
                  v-for="notification in notifications"
                  :key="notification.id"
                >
                  <a
                    href="#"
                    class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div class="shrink-0">
                      <img
                        class="rounded-full w-11 h-11"
                        src="/src/assets/unifast.png"
                        alt="Jese image"
                      />
                      <div
                        class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800"
                      >
                        <svg
                          class="w-2 h-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path
                            d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"
                          />
                          <path
                            d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="w-full ps-3">
                      <div
                        class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"
                      >
                        <span
                          class="font-semibold text-gray-900 dark:text-white"
                          >{{ notification.data.title }}</span
                        >
                        {{ notification.data.message }}
                      </div>
                      <div class="text-xs text-blue-600 dark:text-blue-500">
                        {{ notification.data.timestamp }}
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <a
              href="#"
              class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              <div class="inline-flex items-center">
                <svg
                  class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path
                    d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                  />
                </svg>
                View all
              </div>
            </a>
          </div>
          <!-- Ends Here -->

          <div class="flex items-center ms-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="/src/assets/unifast.png"
                  alt="user photo"
                />
              </button>
            </div>
            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div class="px-4 py-3" role="none">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  Welcome!
                </p>
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ userName }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    @click="handleLogout"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modern Sidebar -->
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto">
      <!-- Navigation Header -->
      <div class="px-4 py-3 mb-2">
        <h2
          class="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400"
        >
          Main Menu
        </h2>
      </div>

      <ul class="space-y-1">
        <li>
          <!-- Dashboard Link -->
          <router-link
            to="/home/dashboard"
            class="flex items-center p-3 text-gray-700 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            active-class="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors"
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
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </div>
            <span class="ml-3 font-medium">Dashboard</span>
          </router-link>
        </li>
        <li>
          <!-- Manage Grantees Link -->
          <router-link
            to="/home/manage_grantees"
            class="flex items-center p-3 text-gray-700 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            :class="{
              'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400':
                $route.path.includes('manage_grantees'),
            }"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-800/50 transition-colors"
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
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span class="ml-3 font-medium">Manage Grantees</span>
            <span
              v-if="pendingGrantees > 0"
              class="ml-auto inline-flex items-center justify-center h-5 px-2 text-xs font-medium text-white bg-red-500 rounded-full"
            >
              {{ pendingGrantees > 9 ? "9+" : pendingGrantees }}
            </span>
          </router-link>
        </li>

        <li>
          <!-- Update Grantees Profile Link -->
          <router-link
            to="/home/batch_update"
            class="flex items-center p-3 text-gray-700 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            :class="{
              'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400':
                $route.path.includes('batch_update') && !isDisabled,
              'pointer-events-none opacity-50 cursor-not-allowed': isDisabled,
            }"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/50 transition-colors"
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
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span class="ml-3 font-medium">Update Grantees Profile</span>
          </router-link>
        </li>

        <li>
          <!-- Manage Billings Button -->
          <button
            @click="handleSemSY"
            class="flex items-center w-full p-3 text-gray-700 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-lg text-amber-600 dark:text-amber-400 transition-colors"
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
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span class="ml-3 font-medium">Manage Billings</span>
          </button>
        </li>

        <li>
          <!-- Support Dropdown -->
          <button
            type="button"
            class="flex items-center w-full p-3 text-gray-700 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
            :class="{
              'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400':
                $route.path.includes('support'),
            }"
            @click="isSupportOpen = !isSupportOpen"
            aria-expanded="false"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors"
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
                  stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zM13.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </div>
            <span class="ml-3 font-medium">Support</span>
            <svg
              class="w-3 h-3 ml-auto transition-transform duration-200"
              :class="{ 'rotate-180': isSupportOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <!-- Dropdown Menu -->
          <ul v-show="isSupportOpen" class="py-2 pl-4 space-y-1">
            <!-- Tickets -->
            <li>
              <router-link
                to="/home/support"
                class="flex items-center p-2.5 pl-4 text-sm text-gray-700 rounded-lg transition-colors group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                :class="{
                  'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400':
                    $route.path === '/home/support',
                }"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors"
                ></span>
                Tickets
                <span
                  class="ml-auto px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
                >
                  New
                </span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="sm:ml-64 mt-14 sm:mt-16 px-4 py-2 sm:px-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
      <router-view></router-view>
    </div>
  </div>

  <Modal
    :isVisible="showModal"
    @update:isVisible="showModal = $event"
    title="Select SY and Semester"
    :isSubmit="true"
    buttonText="Proceed"
    @submit="handleSubmit()"
  >
    <form>
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >School Year</label
      >
      <select
        v-model="selectedsy"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option value="">Select School Year</option>
        <option
          v-for="schoolyear in schoolyears"
          :key="schoolyear.id"
          :value="schoolyear.id"
        >
          {{ schoolyear.school_year }}
        </option>
      </select>

      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Semester</label
      >
      <select
        v-model="selectedsem"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option value="">Select School Year</option>
        <option
          v-for="semester in semesters"
          :key="semester.id"
          :value="semester.id"
        >
          {{ semester.semester }}
        </option>
      </select>
    </form>
  </Modal>
</template>

<script>
import { Dropdown, initDropdowns, initDrawers, initCollapses } from "flowbite";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      showModal: false,
      email: "",
      password: "",
      message: "",
      loading: false,
      semesters: [],
      schoolyears: [],
      selectedsy: "",
      selectedsem: "",
      notifications: [],
      isDisabled: false,
      unreadCount: 0,
      unreadGrantees: 5, // Example count - replace with actual data
      pendingBillings: 3, // Example count - replace with actual data
      notificationInterval: null,
      isNotificationOpen: false,
      isUserMenuOpen: false,
      isSidebarOpen: true,
      isSupportOpen: false,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "userType", "userId", "userName"]),
  },

  methods: {
    ...mapActions("auth", ["login"]),

    toggleNotifications() {
      this.isNotificationOpen = !this.isNotificationOpen;
      if (this.isNotificationOpen) {
        this.markAllAsRead();
      }
    },

    async markAllAsRead() {
      try {
        await this.$api.post(
          "/notifications/mark-all-read",
          {},
          {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          }
        );
        this.unreadCount = 0;
        this.notifications = this.notifications.map((n) => ({
          ...n,
          read_at: new Date(),
        }));
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    },

    async markAsRead(notification) {
      if (notification.read_at) return;
      try {
        await this.$api.post(
          `/notifications/${notification.id}/mark-as-read`,
          {},
          {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          }
        );
        notification.read_at = new Date();
        if (this.unreadCount > 0) this.unreadCount--;
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },

    setupNotificationPolling() {
      if (this.pollingInterval) clearInterval(this.pollingInterval);
      this.pollingInterval = setInterval(() => {
        if (!this.isNotificationOpen) this.fetchNotifications();
      }, 30000);
    },

    cleanupPolling() {
      if (this.pollingInterval) clearInterval(this.pollingInterval);
    },

    handleSemSY() {
      this.showModal = true;
    },

    async handleLogout() {
      try {
        const res = await this.$api.post(
          "/logout",
          {},
          {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          }
        );

        if (res.data.success) {
          this.$store
            .dispatch("auth/logout")
            .then(() => {
              this.$router.push("/");
            })
            .catch((err) => console.error("Logout error:", err));
        }
      } catch (error) {
        console.error(error);
      }
    },

    async sysem() {
      try {
        const res = await this.$api.get(`/sy-sem`, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        this.semesters = res.data.semesters;
        this.schoolyears = res.data.school_years;
      } catch (error) {
        console.error(error);
      }
    },

    handleSubmit() {
      this.showModal = false;
      this.$router.push({
        name: "ManageBillings",
        query: {
          schoolYearId: this.selectedsy,
          semesterId: this.selectedsem,
        },
      });
    },

    async fetchNotifications() {
      try {
        const res = await this.$api.get("/notifications", {
          headers: { Authorization: `Bearer ${this.accessToken}` },
          params: { include_read: this.isNotificationOpen },
        });

        this.unreadCount = res.data.filter((n) => !n.read_at).length;

        const existing = new Map(this.notifications.map((n) => [n.id, n]));
        this.notifications = res.data.map((n) => ({
          ...n,
          read_at: existing.get(n.id)?.read_at || n.read_at,
        }));
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    },

    closeMobileSidebar() {
      const sidebar = document.getElementById("logo-sidebar");
      if (window.innerWidth < 640) {
        sidebar.classList.add("-translate-x-full");
        document.body.classList.remove("overflow-hidden");
      }
    },

    toggleMobileSidebar() {
      const sidebar = document.getElementById("logo-sidebar");
      sidebar.classList.toggle("-translate-x-full");
      if (window.innerWidth < 640) {
        document.body.classList.toggle("overflow-hidden");
      }
    },

    handleResize() {
      const sidebar = document.getElementById("logo-sidebar");
      if (window.innerWidth >= 640) {
        sidebar.classList.remove("-translate-x-full");
        document.body.classList.remove("overflow-hidden");
      } else if (!sidebar.classList.contains("-translate-x-full")) {
        sidebar.classList.add("-translate-x-full");
      }
    },

    formatTimeAgo(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };

      for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
          return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
      }

      return "Just now";
    },
  },

  mounted() {
    initDrawers();
    initDropdowns();
    initCollapses();
    this.sysem();
    this.fetchNotifications();
    this.setupNotificationPolling();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    document.addEventListener("click", this.handleClickOutside);
    this.$watch(
      () => this.$route,
      () => {
        this.closeMobileSidebar();
      }
    );
  },

  beforeUnmount() {
    this.cleanupPolling();
  },
};
</script>
