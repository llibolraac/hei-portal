<template>

    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    No.
                </th>

                <th scope="col" class="px-6 py-3">
                    Transaction No.
                </th>

                <th scope="col" class="px-6 py-3">
                    School Year
                </th>
                <th scope="col" class="px-6 py-3">
                    Semester
                </th>

                <th scope="col" class="px-6 py-3">
                    Batch Name
                </th>

                <th scope="col" class="px-6 py-3">
                    Batch No.
                </th>

                <th scope="col" class="px-6 py-3">
                    Amount
                </th>

                <th scope="col" class="px-6 py-3">
                    ASC
                </th>

                <th scope="col" class="px-6 py-3">
                    Total Amount
                </th>

                <th scope="col" class="px-6 py-3">
                    Total Grantees
                </th>

                <th scope="col" class="px-6 py-3">
                    Status
                </th>


                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(billing, index) in billings.data" :key="billing.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {{ calculateIndex(index) }}
                </th>

                <td class="px-6 py-4">
                    {{ billing.transaction_no}}
                </td>

                <td class="px-6 py-4">
                    {{ billing.schoolyear.school_year}}
                </td>

                <td class="px-6 py-4">
                    {{ billing.semester.semester}}
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
                            : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
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
            'border-b-2 border-blue-500 text-blue-600 text-sm': currentTab === 'billing_details',
            'text-gray-500 hover:text-gray-700 text-sm': currentTab !== 'billing_details',
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
            'border-b-2 border-blue-500 text-blue-600 text-sm': currentTab === 'grantee_details',
            'text-gray-500 hover:text-gray-700 text-sm': currentTab !== 'grantee_details',
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
            'border-b-2 border-blue-500 text-blue-600 text-sm': currentTab === 'print_billing_documents',
            'text-gray-500 hover:text-gray-700 text-sm': currentTab !== 'print_billing_documents',
          }"
          @click="currentTab = 'print_billing_documents'"
          class="py-2 px-4"
        >
          Print Billing Documents
        </button>
      </li>
    </ul>

    <!-- Tab content -->
    <div class="mt-2">
      <div v-show="currentTab === 'billing_details'" class="p-4 bg-white">

        <!-- Billing Details -->

        <form class="max-w mx-auto">

                
            <div class="mb-2">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction No.</label>
            <input v-model="formData.transaction_no" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
            </div>
            <div class="flex gap-4 mb-2">
            <!-- School Year -->
            <div class="w-1/2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Year</label>
            <input v-model="formData.school_year"
                    type="text"
                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled />
            </div>

            <!-- Semester -->
            <div class="w-1/2 mb-1">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
            <input v-model="formData.semester"
                    type="text"
                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled />
            </div>
            </div>

            <div class="flex gap-4">
            <!-- School Year -->
            <div class="w-1/2">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batch name</label>
            <input v-model="formData.batch_name" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
            </div>

            <!-- Semester -->
            <div class="w-1/2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
            <input v-model="formData.batch_no"
                    type="text"
                    class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled />
            </div>
            </div>

            <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
            <input v-model="formData.amount" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
            </div>

            <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Administrative Support Cost:</label>
            <input v-model="formData.program_oc" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
            </div>
            <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Amount:</label>
            <input v-model="formData.total_amount" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
            </div>
          

        </form>

        <!-- Ends Here -->
      </div>
      <div v-show="currentTab === 'grantee_details'" class="p-4">
        <GranteesDetails v-if="currentTab === 'grantee_details'" :billingId="billingId" />
      </div>

      <div v-show="currentTab === 'print_billing_documents'" class="p-4">
        <PrintBillingDocuments v-if="currentTab === 'print_billing_documents'" :billingId="billingId" />
      </div>
    </div>
  </div>



    
    </Modal>

</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import GranteesDetails from './GranteesDetails.vue'
import PrintBillingDocuments from './PrintBillingDocuments.vue'

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
        PrintBillingDocuments
    },

    data() {
        return {
            showModal: false,
            billings: [],
            currentTab: 'billing_details', // Default active tab
            billingId: null,
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
            }
        };
    },

    computed: {
        ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'heiId']),
    },

    methods: {

        formatDecimalValue(decimalValue) {
            return Number(decimalValue).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            },

        getStatusClass(id) {
            const classes = {
            1: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            2: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
            3: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
            // Add more status IDs as needed
            };

            return classes[id] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'; // default
        },


        handleBillingDetails() {
            this.currentTab = 'billing_details'; // Switch to billing details tab
        },

        handleGranteeDetails() {
            this.currentTab = 'grantee_details'; // Switch to grantee details tab
        },

        handleBillingDelete(id) {
            if (window.confirm('Are you sure you want to delete this billing document?')) {
                this.$api.delete(`/delete-billing-hei/${id}`, {
                    data: {
                        school_year_id: this.schoolYearId,
                        semester_id: this.semesterId,
                        billing_id: id,
                    },
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                })
                .then(res => {
                    alert(res.data.message);
                    this.billings.data = this.billings.data.filter(billing => billing.id !== id);
                })
                .catch(err => {
                    console.error(err);
                    alert('Failed to delete billing. Please try again.');
                });
            }
        },


        handleViewBilling(billingId) {
            this.showModal = true;
            this.billingId = billingId;

            const selectedBilling = this.billings.data.find((billing) => billing.id === billingId);
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
            };
        },

        calculateIndex(index) {
            return index + 1 + ((this.billings.current_page - 1) * this.billings.per_page);
        },

        fetchBillingDocuments(page = 1) {
            this.$api.get(`/tes-billings/${this.heiId}?page=${page}`, {
                params: {
                    sy: this.schoolYearId,
                    sem: this.semesterId,
                },
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            })
            .then(res => {
                this.billings = res.data.billings;
            });
        },
    },

    watch: {
        schoolYearId: 'fetchBillingDocuments',
        semesterId: 'fetchBillingDocuments',
    },

    mounted() {
        this.fetchBillingDocuments();
    },
};
</script>
