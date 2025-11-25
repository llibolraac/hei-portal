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

  <div v-else class="w-full">
    <!-- Billing Documents Table -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <!-- Table Header with Academic Period -->
      <div
        class="px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-gray-700"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Billing Documents
          </h2>
          <div
            v-if="billings?.data?.length > 0"
            class="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg"
          >
            <span class="text-gray-600 dark:text-gray-300">
              SY {{ billings.data[0].schoolyear?.school_year || "N/A" }}
            </span>
            <span class="text-gray-400">•</span>
            <span class="text-gray-600 dark:text-gray-300">
              {{ billings.data[0].semester?.semester || "N/A" }}
            </span>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap"
              >
                #
              </th>
              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Transaction
              </th>
              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell"
              >
                Batch
              </th>
              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell"
              >
                ASC
              </th>
              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Grantees
              </th>

              <th
                scope="col"
                class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody
            class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <tr v-if="billings?.data?.length === 0">
              <td colspan="9" class="px-6 py-12 text-center">
                <div
                  class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400"
                >
                  <svg
                    class="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                  <h3
                    class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    No billings available
                  </h3>
                  <p class="text-sm">
                    There are no billing records to display.
                  </p>
                </div>
              </td>
            </tr>
            <tr
              v-else
              v-for="(billing, index) in billings.data"
              :key="billing.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td
                class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
              >
                {{ calculateIndex(index) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ billing.transaction_no }}
                </div>
                <div class="text-xs text-gray-500 sm:hidden">
                  {{ billing.program?.batch_name || "N/A" }}
                </div>
              </td>
              <td
                class="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell"
              >
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ billing.program?.batch_name || "N/A" }}
                </div>
                <div class="text-xs text-gray-500">
                  Batch {{ billing.program?.batch_no || "N/A" }}
                </div>
              </td>
              <td
                class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 text-right"
              >
                {{ formatCurrency(billing.amount) }}
              </td>
              <td
                class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right hidden md:table-cell"
              >
                {{ formatCurrency(billing.program_oc) }}
              </td>
              <td
                class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-right"
              >
                {{ formatCurrency(billing.total_amount) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
                <span
                  class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium dark:bg-blue-900/30 dark:text-blue-200"
                >
                  {{ billing.grantee_count || 0 }}
                </span>
              </td>

              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusClass(billing.billing_status.id)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ billing.billing_status.status_name }}
                </span>
              </td>
              <td
                class="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex justify-end space-x-2">
                  <button
                    v-if="billing.hei.hei_type === 0"
                    @click="handleViewBilling(billing.id)"
                    class="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="View details"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="billing.hei.hei_type === 1"
                    @click="handleViewBilling(billing.id)"
                    class="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="View details"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="handleBillingDelete(billing.id)"
                    :disabled="billing.billing_status.id !== 1"
                    :class="[
                      'p-1.5 rounded-full transition-colors',
                      billing.billing_status.id === 1
                        ? 'text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/50'
                        : 'text-gray-300 dark:text-gray-600 cursor-not-allowed',
                    ]"
                    :title="
                      billing.billing_status.id === 1
                        ? 'Delete billing'
                        : 'Cannot delete processed billing'
                    "
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal component -->
    <Modal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      title="View Billing Documents"
      :isSubmit="false"
      :size="'large'"
    >
      <div>
        <!-- Tab buttons -->
        <ul class="flex space-x-4 border-b">
          <li>
            <button
              :class="{
                'border-b-2 border-blue-500 text-blue-600 text-sm':
                  currentTab === 'billing_details',
                'text-gray-500 hover:text-gray-700 text-sm':
                  currentTab !== 'billing_details',
              }"
              @click="currentTab = 'billing_details'"
              class="py-2 px-4"
            >
              Billing Details
            </button>
          </li>
          <li>
            <button
              :class="{
                'border-b-2 border-blue-500 text-blue-600 text-sm':
                  currentTab === 'grantee_details',
                'text-gray-500 hover:text-gray-700 text-sm':
                  currentTab !== 'grantee_details',
              }"
              @click="currentTab = 'grantee_details'"
              class="py-2 px-4"
            >
              Grantees Details
            </button>
          </li>

          <li>
            <button
              :class="{
                'border-b-2 border-blue-500 text-blue-600 text-sm':
                  currentTab === 'BillingLog',
                'text-gray-500 hover:text-gray-700 text-sm':
                  currentTab !== 'BillingLog',
              }"
              @click="currentTab = 'BillingLog'"
              class="py-2 px-4"
            >
              Billing Log
            </button>
          </li>
        </ul>

        <!-- Tab content -->
        <div class="mt-2">
          <div v-show="currentTab === 'billing_details'" class="p-4 bg-white">
            <!-- Billing Details -->

            <BillingDetails
              v-if="currentTab === 'billing_details' && formData.hei_type === 0"
              :formData="formData"
              :billingId="billingId"
            />

            <SUCBillingDetails
              v-if="currentTab === 'billing_details' && formData.hei_type === 1"
              :formData="formData"
              :billingId="billingId"
            />

            <!-- Ends Here -->
          </div>
          <div v-show="currentTab === 'grantee_details'" class="p-4">
            <GranteesDetails
              v-if="currentTab === 'grantee_details'"
              :billingId="billingId"
            />
          </div>

          <div v-show="currentTab === 'BillingLog'" class="p-4">
            <BillingLog
              v-if="currentTab === 'BillingLog'"
              :voucherId="formData.voucher_id"
              :billingId="this.billingId"
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import BillingLog from "../../BillingLog/BillingLog.vue";
import GranteesDetails from "./GranteesDetails.vue";
import BillingDetails from "../Components/BillingDetails.vue";
import SUCBillingDetails from "./SUCBillingDetails.vue";

export default {
  props: {
    semesterId: {
      type: String,
      required: true,
    },
    schoolYearId: {
      type: String,
      required: true,
    },
  },

  components: {
    GranteesDetails,
    BillingLog,
    BillingDetails,
    SUCBillingDetails,
  },

  data() {
    return {
      showModal: false,
      billings: [],
      currentTab: "billing_details", // Default active tab
      billingId: null,
      loading: false,
      formData: {
        transaction_no: null,
        school_year: null,
        semester: null,
        batch_name: null,
        batch_no: null,
        amount: null,
        program_oc: null,
        total_amount: null,
        billing_status: null,
        voucher_id: null,
        hei_type: null,
        is_consolidated: null,
      },
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "userType", "userId", "heiId"]),
  },

  methods: {
    formatCurrency(value) {
      if (!value) return "₱0.00";
      const number = parseFloat(value);
      return number.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
      });
    },

    formatDecimalValue(decimalValue) {
      return Number(decimalValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    getStatusClass(id) {
      const classes = {
        1: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        2: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        3: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        // Add more status IDs as needed
      };

      return (
        classes[id] ||
        "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      ); // default
    },

    handleBillingDetails() {
      this.currentTab = "billing_details"; // Switch to billing details tab
    },

    handleGranteeDetails() {
      this.currentTab = "grantee_details"; // Switch to grantee details tab
    },

    handleBillingLog() {
      this.currentTab = "BillingLog"; // Switch to grantee details tab
    },
    handleBillingDelete(id) {
      if (
        window.confirm("Are you sure you want to delete this billing document?")
      ) {
        this.$api
          .delete(`/delete-billing-hei/${id}`, {
            data: {
              school_year_id: this.schoolYearId,
              semester_id: this.semesterId,
              billing_id: id,
            },
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          })
          .then((res) => {
            alert(res.data.message);
            this.billings.data = this.billings.data.filter(
              (billing) => billing.id !== id
            );
          })
          .catch((err) => {
            console.error(err);
            alert("Failed to delete billing. Please try again.");
          });
      }
    },

    handleViewBilling(billingId) {
      this.billingId = billingId;

      const selectedBilling = this.billings.data.find(
        (billing) => billing.id === billingId
      );

      this.formData = {
        transaction_no: selectedBilling.transaction_no,
        school_year: selectedBilling.schoolyear.school_year,
        semester: selectedBilling.semester.semester,
        batch_name: selectedBilling.program.batch_name,
        batch_no: selectedBilling.program.batch_no,
        amount: selectedBilling.amount,
        program_oc: selectedBilling.program_oc,
        total_amount: selectedBilling.total_amount,
        billing_status: selectedBilling.billing_status,
        voucher_id: selectedBilling.voucher_id,
        hei_type: selectedBilling.hei.hei_type,
        is_consolidated: selectedBilling.is_consolidated,
      };
      this.showModal = true;
    },

    calculateIndex(index) {
      return (
        index + 1 + (this.billings.current_page - 1) * this.billings.per_page
      );
    },

    fetchBillingDocuments(page = 1) {
      this.loading = true;
      this.$api
        .get(`/tes-billings/${this.heiId}?page=${page}`, {
          params: {
            sy: this.schoolYearId,
            sem: this.semesterId,
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.billings = res.data.billings;

          this.loading = false;
        });
    },
  },

  watch: {
    schoolYearId: "fetchBillingDocuments",
    semesterId: "fetchBillingDocuments",
  },

  mounted() {
    this.fetchBillingDocuments();
  },
};
</script>
