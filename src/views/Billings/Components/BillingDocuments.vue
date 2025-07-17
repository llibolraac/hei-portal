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

  <div v-else class="w-full overflow-x-auto">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">No.</th>

          <th scope="col" class="px-6 py-3">Transaction No.</th>

          <th scope="col" class="px-6 py-3">School Year</th>
          <th scope="col" class="px-6 py-3">Semester</th>

          <th scope="col" class="px-6 py-3">Batch Name</th>

          <th scope="col" class="px-6 py-3">Batch No.</th>

          <th scope="col" class="px-6 py-3">Amount</th>

          <th scope="col" class="px-6 py-3">ASC</th>

          <th scope="col" class="px-6 py-3">Total Amount</th>

          <th scope="col" class="px-6 py-3">Total Grantees</th>

          <th scope="col" class="px-6 py-3">Voucher Status</th>

          <th scope="col" class="px-6 py-3">Status</th>

          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(billing, index) in billings.data"
          :key="billing.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ calculateIndex(index) }}
          </th>

          <td class="px-6 py-4">
            {{ billing.transaction_no }}
          </td>

          <td class="px-6 py-4">
            {{ billing.schoolyear.school_year }}
          </td>

          <td class="px-6 py-4">
            {{ billing.semester.semester }}
          </td>

          <td class="px-6 py-4">
            {{ billing.program.batch_name }}
          </td>

          <td class="px-6 py-4">
            {{ billing.program.batch_no }}
          </td>

          <td class="px-6 py-4">
            {{ formatDecimalValue(billing.amount) }}
          </td>

          <td class="px-6 py-4">
            {{ formatDecimalValue(billing.program_oc) }}
          </td>

          <td class="px-6 py-4">
            {{ formatDecimalValue(billing.total_amount) }}
          </td>

          <td class="px-6 py-4">
            {{ formatDecimalValue(billing.total_amount) }}
          </td>

          <td class="px-6 py-4">
            <span
              v-if="billing.voucher_id"
              class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            >
              Processed
            </span>

            <span
              v-else
              class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            >
              NO DV
            </span>
          </td>

          <td class="px-6 py-4">
            <span
              :class="getStatusClass(billing.billing_status.id)"
              class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm"
            >
              {{ billing.billing_status.status_name }}
            </span>
          </td>

          <td class="px-6 py-4">
            <div class="flex space-x-4">
              <button
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="handleViewBilling(billing.id)"
              >
                View
              </button>

              <button
                @click.prevent="handleBillingDelete(billing.id)"
                :disabled="billing.billing_status.id !== 1"
                :class="[
                  'font-medium hover:underline',
                  billing.billing_status.id === 1
                    ? 'text-red-600 dark:text-red-600'
                    : 'text-gray-400 dark:text-gray-500 cursor-not-allowed',
                ]"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

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
              v-if="currentTab === 'billing_details'"
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
      this.showModal = true;
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
      };
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
