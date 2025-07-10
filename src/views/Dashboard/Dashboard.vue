<template>
  
<nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div class="px-3 py-3 lg:px-5 lg:pl-3">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <a href="#" class="flex ms-2 md:me-24">
          <img src="/src/assets/unifast.png" class="h-8 me-3" />
          <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">UCMIS</span>
        </a>
      </div>
      <div class="flex items-center">

<!-- notifications -->



<button id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" class="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
<path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
</svg>

<div class="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
</button>

<!-- Dropdown menu -->
<div id="dropdownNotification" class="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
  <div class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
      Notifications
  </div>
  <div class="divide-y divide-gray-100 dark:divide-gray-700">

    <ul>
      <li v-for="notification in notifications" :key="notification.id">
            <a href="#" class="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
      <div class="shrink-0">
        <img class="rounded-full w-11 h-11" src="/src/assets/unifast.png" alt="Jese image">
        <div class="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
          <svg class="w-2 h-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z"/>
            <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z"/>
          </svg>
        </div>
      </div>
      <div class="w-full ps-3">
          <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span class="font-semibold text-gray-900 dark:text-white">{{ notification.data.title }}</span> {{ notification.data.message }}</div>
          <div class="text-xs text-blue-600 dark:text-blue-500">{{ notification.data.timestamp }}</div>
      </div>
    </a>
      </li>

    </ul>

   
  </div>
  <a href="#" class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
    <div class="inline-flex items-center ">
      <svg class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
      </svg>
        View all
    </div>
  </a>
</div>
<!-- Ends Here -->
        
          <div class="flex items-center ms-3">
            <div>
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="/src/assets/unifast.png" alt="user photo">
              </button>
            </div>
            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div class="px-4 py-3" role="none">
               <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  Welcome!
                </p>
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ userName }}
                </p>
               
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" @click="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        
    </div>
  </div>
</nav>

<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
         <li>
            <router-link to="/home/dashboard" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span class="ms-3">Dashboard</span>
              </router-link>
         </li>
         <li>
            <router-link to="/home/manage_grantees" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"/>
            </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Manage Grantees</span>
              </router-link>
         </li>

         <li>
            <router-link to="/home/batch_update" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" :class="{ 'pointer-events-none opacity-50 cursor-not-allowed': isDisabled }">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            </svg>


               <span class="flex-1 ms-3 whitespace-nowrap">Update Grantees Profile</span>
              </router-link>
         </li>

         <li>
            <button @click="handleSemSY" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" :class="{ 'pointer-events-none opacity-50 cursor-not-allowed': isDisabled }">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
            </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Manage Billings</span>
              </button>
         </li>

      </ul>
   </div>
</aside>

<div class="p-4 sm:ml-64 mt-20">
    <router-view></router-view>
    
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
  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Year</label>
  <select v-model="selectedsy" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">Select School Year</option>
    <option v-for="schoolyear in schoolyears" :key="schoolyear.id" :value="schoolyear.id">{{ schoolyear.school_year }}</option>
  </select>

  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
  <select v-model="selectedsem" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">Select School Year</option>
    <option v-for="semester in semesters" :key="semester.id" :value="semester.id">{{ semester.semester }}</option>

  </select>
</form>

</Modal>


</template>


<script>
import { Dropdown, initDropdowns, initDrawers } from 'flowbite';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      showModal: false, 
      email: '',
      password: '',
      message: '',
      loading: false,
      semesters: [],
      schoolyears: [],
      selectedsy: '',
      selectedsem: '',
      notifications: [],
      isDisabled: true,
    };
  },

  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName']),
  },

  methods: {
    ...mapActions('auth', ['login']),


    handleSemSY(){
      this.showModal = true;
    },


    async handleLogout() {
        try {
            const res = await this.$api.post(
            `/logout`,
            {}, // Empty body for the POST request
            {
                headers: {
                Authorization: `Bearer ${this.accessToken}`,
                },
            }
            );

            if(res.data.success){
            this.$store.dispatch('auth/logout')
                .then(() => {
                this.$router.push('/');
                })

                .catch(error => {
                console.error('Logout error:', error)
                });
            }
        } catch (error) {
            console.error(error);
        }
        },

    async sysem(){
        try {
            const res = await this.$api.get(`/sy-sem`, {
                    headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    }
                });
            this.semesters = res.data.semesters;
            this.schoolyears = res.data.school_years;
    
        } catch (error) {
            console.error(error);
        }
    },

    handleSubmit(){
      this.$router.push({
        name: 'ManageBillings',
        query: {
          schoolYearId: this.selectedsy,
          semesterId: this.selectedsem,
        }
      })



    },

    async fetchNotifications() {
      try {
        const res = await this.$api.get('/notifications', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.notifications = res.data;
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    }


    

    
  },

  mounted(){
    this.sysem();
    this.fetchNotifications();

        // Fix dropdowns not working
     setTimeout(() => {
      initDropdowns(); // ✅ initialize all dropdowns that use data-dropdown-toggle
      initDrawers();
    }, 0);
  },
};
</script>