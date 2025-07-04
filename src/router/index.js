import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importing components (pages)
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import ManageGrantees from '../views/Manage/ManageGrantees.vue'
import ManageBilling from '../views/Billings/Billing.vue'
import BatchUpdate from '../views/BatchUpdate/BatchUpdate.vue'
import Form1 from '../views/Templates/Form1.vue'
import Form2 from '../views/Templates/Form2.vue'
import Form3 from '../views/Templates/Form3.vue'
import Form4 from '../views/Templates/Form4.vue'
import TravelAuthority from '../views/Templates/TravelAuthority.vue'
import Home from '../views/Home/Home.vue'

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Using HTML5 History mode (No hash in the URL)
  routes: [
    {
      path: '/', // Default route
      name: 'Login',
      component: Login, // Login component will be rendered
      meta: {
        requiresAuth: false, // Example of a meta field for routes
      },


    },

    {
      path: '/print_form_1',
      name: 'PrintForm1',
      component: Form1,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      }
    },


    {
      path: '/print_form_2',
      name: 'PrintForm2',
      component: Form2,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      }
    },

    {
      path: '/print_form_3',
      name: 'PrintForm3',
      component: Form3,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      }
    },

    {
      path: '/print_form_4',
      name: 'PrintForm4',
      component: Form4,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      }
    },

    {
      path: '/travel_authority',
      name: 'TravelAuthority',
      component: TravelAuthority,

    },


    {
      path: '/home', // Home route
      name: 'Dashboard',
      component: Dashboard, // Home component will be rendered
      children: [
        {
          path: 'manage_grantees',
          name: 'ManageGrantees',
          component: ManageGrantees,
        },

        {
          path: 'dashboard',
          name: 'Home',
          component: Home,
        },

        {
          path: 'manage_billings',
          name: 'ManageBillings',
          component: ManageBilling,
        },


        {
          path: 'batch_update',
          name: 'BatchUpdate',
          component: BatchUpdate,
        },

      ],
      meta: {
        requiresAuth: true, // Example of a meta field for routes
      },

    },
    // You can add more routes here in the future
  ],
})

// Route guard: Check for authentication before navigating
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next({ name: 'Login' });
  } else if (to.meta.requiresAuth === false && store.getters['auth/isAuthenticated']) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router