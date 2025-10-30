import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

// Importing components (pages)
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import ManageGrantees from "../views/Manage/ManageGrantees.vue";
import ManageBilling from "../views/Billings/Billing.vue";
import BatchUpdate from "../views/BatchUpdate/BatchUpdate.vue";

//TES Forms
import Form1 from "../views/Templates/TES/Form1.vue";
import Form2 from "../views/Templates/TES/Form2.vue";
import Form3 from "../views/Templates/TES/Form3.vue";
import Form4 from "../views/Templates/TES/Form4.vue";

//TDP Forms
import TDPForm1 from "../views/Templates/TDP/TDPForm1.vue"; // Assuming this is the correct
import TDPForm2 from "../views/Templates/TDP/TDPForm2.vue"; // Assuming this is the correct
import TDPForm3 from "../views/Templates/TDP/TDPForm3.vue"; // Assuming this is the correct
import TDPForm4 from "../views/Templates/TDP/TDPForm4.vue"; // Assuming this is the correct

//SUC Forms
import SUCForm1 from "../views/Templates/SUC/Form1.vue";
import SUCForm2 from "../views/Templates/SUC/Form2.vue";
import SUCForm3 from "../views/Templates/SUC/Form3.vue";
import SUCForm4 from "../views/Templates/SUC/Form4.vue";

//SUC TDP Forms
import SUCTDPForm1 from "../views/Templates/SUC/TDPForm1.vue";
import SUCTDPForm2 from "../views/Templates/SUC/TDPForm2.vue";
import SUCTDPForm3 from "../views/Templates/SUC/TDPForm3.vue";
import SUCTDPForm4 from "../views/Templates/SUC/TDPForm4.vue";

// Importing other components
import Home from "../views/Home/Home.vue";
import Support from "../views/Support/Support.vue";

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Using HTML5 History mode (No hash in the URL)
  routes: [
    {
      path: "/", // Default route
      name: "Login",
      component: Login, // Login component will be rendered
      meta: {
        requiresAuth: false, // Example of a meta field for routes
      },
    },

    {
      path: "/print_form_1",
      name: "PrintForm1",
      component: Form1,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_form_2",
      name: "PrintForm2",
      component: Form2,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_form_3",
      name: "PrintForm3",
      component: Form3,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_form_4",
      name: "PrintForm4",
      component: Form4,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_tdp_form_1",
      name: "PrintTDPForm1",
      component: TDPForm1,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_tdp_form_2",
      name: "PrintTDPForm2",
      component: TDPForm2,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_tdp_form_3",
      name: "PrintTDPForm3",
      component: TDPForm3,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_tdp_form_4",
      name: "PrintTDPForm4",
      component: TDPForm4,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    //PHEIs Emplate Ends Here

    //SUC Starts here

    {
      path: "/print_suc-form_1",
      name: "PrintSUCForm1",
      component: SUCForm1,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_suc-form_2",
      name: "PrintSUCForm2",
      component: SUCForm2,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_suc-form_3",
      name: "PrintSUCForm3",
      component: SUCForm3,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_suc-form_4",
      name: "PrintSUCForm4",
      component: SUCForm4,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_suc-tdp_form_1",
      name: "PrintSUCTDPForm1",
      component: SUCTDPForm1,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_suc-tdp_form_2",
      name: "PrintSUCTDPForm2",
      component: SUCTDPForm2,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_suc-tdp_form_3",
      name: "PrintSUCTDPForm3",
      component: SUCTDPForm3,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/print_suc-tdp_form_4",
      name: "PrintSUCTDPForm4",
      component: SUCTDPForm4,
      meta: {
        requiresAuth: true, // Set the requiresAuth meta field to true for protected routes
      },
    },

    {
      path: "/home", // Home route
      name: "Dashboard",
      component: Dashboard, // Home component will be rendered
      children: [
        {
          path: "manage_grantees",
          name: "ManageGrantees",
          component: ManageGrantees,
        },

        {
          path: "dashboard",
          name: "Home",
          component: Home,
        },

        {
          path: "manage_billings",
          name: "ManageBillings",
          component: ManageBilling,
        },

        {
          path: "batch_update",
          name: "BatchUpdate",
          component: BatchUpdate,
        },

        {
          path: "support",
          name: "Support",
          component: Support,
        },
      ],
      meta: {
        requiresAuth: true, // Example of a meta field for routes
      },
    },
    // You can add more routes here in the future
  ],
});

// Route guard: Check for authentication before navigating
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    next({ name: "Login" });
  } else if (
    to.meta.requiresAuth === false &&
    store.getters["auth/isAuthenticated"]
  ) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
