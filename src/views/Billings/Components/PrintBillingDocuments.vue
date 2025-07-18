<template>
  <div class="relative inline-block w-full">
    <button
      @click="toggleDropdown"
      class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
    >
      Print Documents
      <svg
        class="w-4 h-4 ml-2"
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
        ></path>
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200"
    >
      <ul class="text-sm text-gray-700">
        <li>
          <button
            @click="printForm1()"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Form 1 (Billing Statement)
          </button>
        </li>
        <li>
          <button
            @click="printForm2()"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Form 2 (Enrolled/Validated Grantees)
          </button>
        </li>
        <li>
          <button
            @click="printForm3()"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Form 3 (Delisted Grantees)
          </button>
        </li>
        <li>
          <button
            @click="printForm4()"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Certification of Enrolled Grantees
          </button>
        </li>
        <!-- <li>
          <button
            @click="
              printForm5;
              showDropdown = false;
            "
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Certification of Graduated Grantees
          </button>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    billingId: {
      required: true,
    },
  },

  data() {
    return {
      showDropdown: false,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken"]),
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    fetchBillingGrantees(page = 1) {
      this.$api
        .get(`/fetch-billing-details/${this.billingId}?page=${page}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },

    async printForm1() {
      this.showDropdown = false;
      const childRouteURL = this.$router.resolve({
        name: "PrintForm1",
        query: {
          billingId: this.billingId,
        },
      }).href;
      // Open the new window to the child component's route URL
      const childWindow = window.open(
        childRouteURL,
        "_blank",
        "width=800,height=600"
      );
    },

    async printForm2() {
      this.showDropdown = false;
      const childRouteURL = this.$router.resolve({
        name: "PrintForm2",
        query: {
          billingId: this.billingId,
        },
      }).href;

      const childWindow = window.open(
        childRouteURL,
        "_blank",
        "width=800,height=600"
      );

      // Wait for the child window to load before injecting styles
      childWindow.onload = () => {
        const style = childWindow.document.createElement("style");
        style.textContent = `
      @media print {
        @page {
          size: A4 landscape;
        }
      }
    `;
        childWindow.document.head.appendChild(style);
      };
    },

    async printForm3() {
      this.showDropdown = false;
      const childRouteURL = this.$router.resolve({
        name: "PrintForm3",
        query: {
          billingId: this.billingId,
        },
      }).href;
      // Open the new window to the child component's route URL
      const childWindow = window.open(
        childRouteURL,
        "_blank",
        "width=800,height=600"
      );

      // Wait for the child window to load before injecting styles
      childWindow.onload = () => {
        const style = childWindow.document.createElement("style");
        style.textContent = `
              @media print {
                @page {
                  size: A4 landscape;
                }
              }
            `;
        childWindow.document.head.appendChild(style);
      };
    },

    async printForm4() {
      this.showDropdown = false;
      const childRouteURL = this.$router.resolve({
        name: "PrintForm4",
        query: {
          billingId: this.billingId,
        },
      }).href;
      // Open the new window to the child component's route URL
      const childWindow = window.open(
        childRouteURL,
        "_blank",
        "width=800,height=600"
      );

      // Wait for the child window to load before injecting styles
      childWindow.onload = () => {
        const style = childWindow.document.createElement("style");
        style.textContent = `
              @media print {
                @page {
                  size: A4 portrait;
                  margin: 15mm;
                }

              }
            `;
        childWindow.document.head.appendChild(style);
      };
    },
  },

  mounted() {
    // fetchBillingGrantees();
  },
};
</script>

<style lang="scss" scoped></style>
