import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

// Importing components (pages)
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import ManageGrantees from '../views/Manage/ManageGrantees.vue'
import ManageBilling from '../views/Billings/Billing.vue'

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
          path: 'manage_billings',
          name: 'ManageBillings',
          component: ManageBilling,
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