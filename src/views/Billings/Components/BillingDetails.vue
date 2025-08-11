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
    <PrintBillingDocuments :programName="program" :billingId="billingId" />

    <div
      v-if="
        this.formData.billing_status.id === 1 ||
        this.formData.billing_status.id === 3
      "
      class="space-y-4 border-t border-gray-200 pt-4 mt-4"
    >
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
          {{ option === "hand" ? "Hand Deliver" : "Courier" }}
        </button>
      </div>

      <!-- Courier Form -->
      <form
        v-if="selectedDelivery === 'courier'"
        @submit.prevent="submitDelivery"
        class="mt-3"
      >
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
            required
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
        <div class="mb-3">
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

        <!-- Submit Button for Courier -->
        <div class="flex justify-end pt-2">
          <button
            type="submit"
            :disabled="!submit_billing.courier_id || !trackingNumber"
            class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>

      <!-- Submit Button for Hand Delivery -->
      <div
        v-else-if="selectedDelivery === 'hand'"
        class="flex justify-end pt-2"
      >
        <button
          @click="submitDelivery"
          class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Confirm Hand Delivery
        </button>
      </div>
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
      program: null,
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
    },
    async submitDelivery() {
      const isCourier = this.selectedDelivery === "courier";

      // Set delivery_type
      this.submit_billing.delivery_type = isCourier ? 1 : 0;

      // For courier delivery, validate required fields
      if (isCourier) {
        if (!this.submit_billing.courier_id) {
          alert("Please select a courier.");
          return;
        }
        if (!this.trackingNumber) {
          alert("Please enter the tracking number.");
          return;
        }
      }

      // Prepare the data to be sent
      const submitData = {
        ...this.submit_billing,
        // Only include courier_id and tracking_number for courier delivery
        ...(isCourier && {
          courier_id: this.submit_billing.courier_id,
          tracking_no: this.trackingNumber,
        }),
        // Always include these fields
        status: 2, // Assuming 2 means 'submitted' or similar
        delivery_type: isCourier ? 1 : 0, // 1 for courier, 0 for hand delivery
      };

      // Confirm before proceeding
      const confirmationMessage = isCourier
        ? "Are you sure you want to submit with courier delivery?"
        : "Are you sure you want to confirm hand delivery?";

      if (!confirm(confirmationMessage)) return;

      try {
        await this.$api.post("/submit-billing", submitData, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        this.$toast.success("Billing submitted successfully");
        // Optionally redirect or reset the form
        // this.$router.push('/billing');
      } catch (e) {
        if (e.response?.data?.errors) {
          console.error("Validation errors:", e.response.data.errors);
          alert(
            "Some fields failed validation. Please check the console for more info."
          );
        } else if (e.response?.status === 409) {
          alert(e.response.data.message);
        } else {
          console.error("Submission failed:", e);
          alert("Submission failed. Please try again.");
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
          this.program = res.data.billing.program.program_name;
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
