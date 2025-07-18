<template>
  <div
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

    <div class="space-y-4 border-t border-gray-200 pt-4 mt-4">
      <PrintBillingDocuments :billingId="billingId" />
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
      trackingNumber: "",
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
    },
    submitDelivery() {
      if (this.selectedDelivery === "courier" && !this.trackingNumber) return;
      alert(
        `Delivery method: ${this.selectedDelivery}\nTracking: ${this.trackingNumber}`
      );
    },
  },
};
</script>
