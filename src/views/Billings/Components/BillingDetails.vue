<template>
  <div v-if="loading" class="text-center">
    <div role="status">
      <svg
        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div
    v-else
    class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl space-y-6"
  >
    <!-- Title -->
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
      Billing Summary
    </h2>

    <!-- Billing Details (smaller version) -->
    <div class="divide-y divide-gray-200 dark:divide-gray-700 space-y-3">
      <div
        v-for="(label, key) in displayFields"
        :key="key"
        class="flex justify-between"
      >
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ label }}
        </span>
        <span
          class="text-sm font-medium text-gray-900 dark:text-white"
          :class="{
            'text-green-600 dark:text-green-400 font-semibold': [
              'amount',
              'program_oc',
            ].includes(key),
            'text-blue-600 dark:text-blue-400 font-bold':
              key === 'total_amount',
          }"
        >
          {{ formatValue(key) }}
        </span>
      </div>
    </div>
    <PrintBillingDocuments :billingId="billingId" />

    <div class="space-y-4 border-t border-gray-200 pt-4 mt-4">
      <!-- Delivery Method -->
      <h3 class="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Select Delivery Method
      </h3>
      <div class="flex gap-2">
        <button
          v-for="option in ['hand', 'courier']"
          :key="option"
          @click="selectDelivery(option)"
          type="button"
          class="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition border shadow-sm focus:ring-2 focus:outline-none"
          :class="[
            selectedDelivery === option
              ? 'bg-blue-600 text-white border-transparent focus:ring-blue-300'
              : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 focus:ring-gray-400',
          ]"
        >
          <svg
            v-if="option === 'hand'"
            class="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 4h2a2 2 0 012 2v2a2 2 0 01-2 2h-2m0-6v6"
            />
          </svg>
          <svg
            v-else
            class="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-7l-9 6-9-6v7a2 2 0 002 2z"
            />
          </svg>
          {{ option === "hand" ? "Hand Deliver" : "Courier" }}
        </button>
      </div>

      <!-- Tracking Number -->
      <div v-if="selectedDelivery === 'courier'" class="mt-3">
        <!-- Courier Dropdown -->
        <div class="mb-3">
          <label
            for="courier"
            class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            Select Courier
          </label>
          <select
            id="courier"
            v-model="submit_billing.courier_id"
            class="w-full rounded-md border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          >
            <option value="" disabled>Select a courier</option>
            <option
              v-for="courier in couriers"
              :key="courier.id"
              :value="courier.id"
            >
              {{ courier.courier_name }}
            </option>
          </select>
        </div>

        <!-- Tracking Number Input -->
        <label
          for="tracking_number"
          class="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          Tracking Number
        </label>
        <input
          type="text"
          id="tracking_number"
          v-model="trackingNumber"
          class="w-full rounded-md border border-gray-300 bg-gray-50 p-1.5 text-xs text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Enter tracking number"
          required
        />
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end pt-2">
      <button
        @click="submitDelivery"
        :disabled="selectedDelivery === 'courier' && !trackingNumber"
        class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PrintBillingDocuments from "./PrintBillingDocuments.vue";
export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
    billingId: {
      type: [String, Number], // Specify the expected type(s)
      required: true, // Indicates that this prop is required
      default: null,
    },
  },

  components: {
    PrintBillingDocuments,
  },

  data() {
    return {
      selectedDelivery: null,
      loading: false,
      couriers: [],
      selectedCourier: null,
      trackingNumber: "",
      billing_data: [],
      submit_billing: {
        delivery_type: null,
        billing_id: null,
        school_year_id: null,
        semester_id: null,
        hei_id: null,
        courier_id: null,
        status: 2,
        userId: null,
      },
      // formData: {
      //   transaction_no: "TXN-00123",
      //   school_year: "2024-2025",
      //   semester: "2nd",
      //   batch_name: "CHED-TDP",
      //   batch_no: "Batch-08",
      //   amount: 15000,
      //   program_oc: 3000,
      //   total_amount: 18000,
      // },
    };
  },
  computed: {
    ...mapGetters("auth", ["accessToken", "heiId", "userId"]),

    displayFields() {
      return {
        transaction_no: "Transaction No.",
        school_year: "School Year",
        semester: "Semester",
        batch_name: "Batch Name",
        batch_no: "Batch No.",
        amount: "Amount",
        program_oc: "Administrative Support Cost",
        total_amount: "Total Amount",
      };
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(value);
    },
    formatValue(key) {
      const value = this.formData[key];
      return ["amount", "program_oc", "total_amount"].includes(key)
        ? this.formatCurrency(value)
        : value;
    },
    selectDelivery(option) {
      this.selectedDelivery = option;
      this.submit_billing.delivery_type = option === "hand" ? 0 : 1;

      console.log(this.submit_billing);
    },
    async submitDelivery() {
      const isCourier = this.selectedDelivery === "courier";

      // Set delivery_type
      this.submit_billing.delivery_type = isCourier ? 1 : 0;

      // Handle fields based on delivery type
      if (isCourier) {
        if (!this.submit_billing.courier_id) {
          alert("Please select a courier.");
          return;
        }
        if (!this.trackingNumber) {
          alert("Please enter the tracking number.");
          return;
        }
      } else {
        this.submit_billing.courier_id = null; // Null courier if hand-delivered
        this.trackingNumber = null; // Optional: also clear the tracking number if stored
      }

      // Confirm before proceeding
      if (!confirm("Are you sure? This action is irreversible.")) return;

      try {
        await this.$api.post("/submit-billing", this.submit_billing, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        this.$toast.success("Successfully Submitted Billing");
      } catch (e) {
        if (e.response?.data?.errors) {
          console.error("Validation errors:", e.response.data.errors);
          alert(
            "Some fields failed validation. Check the console for more info."
          );
        } else if (e.response?.status === 409) {
          alert(e.response.data.message);
        } else {
          console.error("Upload failed:", e);
          alert("Upload failed. Try again.");
        }
      }
    },

    fetchCouriers() {
      this.$api
        .get(`/fetch-couriers`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.couriers = res.data.couriers;
        });
    },

    fetchBillingDetails() {
      this.loading = true;
      this.$api
        .get(`/fetch-billing-details/${this.billingId}`, {
          params: {
            hei_id: this.heiId,
          },

          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.billing_data = res.data.billing;
          this.submit_billing.billing_id = this.billingId;
          this.submit_billing.hei_id = this.billing_data.hei_id;
          this.submit_billing.school_year_id = this.billing_data.school_year_id;
          this.submit_billing.semester_id = this.billing_data.semester_id;
          this.submit_billing.status = 2;
          this.submit_billing.userId = this.userId;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchCouriers();
    this.fetchBillingDetails();
  },
};
</script>
