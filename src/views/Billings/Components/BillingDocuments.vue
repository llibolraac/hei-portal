<template>

    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    No.
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
                    {{ billing.amount }}
                </td>

                <td class="px-6 py-4">
                    {{ billing.program_oc }}
                </td>

                <td class="px-6 py-4">
                    {{ billing.total_amount }}
                </td>

                <td class="px-6 py-4">
                    {{ billing.billing_status }}
                </td>

                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="">View</a>
                </td>
            </tr>

        </tbody>
    </table>




</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {

    props: {
        semesterId: {
            type: String, // Define the type of the prop if needed
            required: true // Specify if the prop is required or not
        },

        schoolYearId: {
            type: String, // Define the type of the prop if needed
            required: true // Specify if the prop is required or not
        },

    },

  data() {
    return {
        billings: [],
    };
  },

  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'heiId']),
  },

  methods: {

    
    calculateIndex(index) {
        return index + 1 + ((this.billings.current_page - 1) * this.billings.per_page);
        },

    fetchBillingDocuments(page = 1){
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
            })

    }
  },

  watch: {
        schoolYearId: 'fetchBillingDocuments',
    semesterId: 'fetchBillingDocuments'
  },


  mounted(){
    this.fetchBillingDocuments();
    
  },

  

  
};
</script>