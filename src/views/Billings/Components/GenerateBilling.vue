<template>
<select v-model="programId" id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="fetchGrantees">
                <option selected>Select a Program</option>
                <option v-for="program in programs" :key="program.id" :value="program.id" >Program: {{ program.grant }} || Batch No: {{ program.batch_no }} || Batch type: {{ program.batch_type }}</option>
            </select>

<p class="text-gray-900 text-right font-bold text-sm mt-3">No. of Grantees: {{ formatDecimalValue(selectedGrantees.length) }}</p>

<table  class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                    First Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Middle Name
                </th>

                <th scope="col" class="px-6 py-3">
                    Course
                </th>

                <th scope="col" class="px-6 py-3">
                    Year Level
                </th>

                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                
                <th scope="col" class="px-6 py-3">
                    School Year
                </th>

                <th scope="col" class="px-6 py-3">
                    Semester
                </th>

                <!-- <th scope="col" class="px-6 py-3">
                    Select


                </th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="(grantee, index) in grantees.data" :key="grantee.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {{ calculateIndex(index) }}
                </th>

                <td class="px-6 py-4">
                    {{ grantee.lastname}}
                </td>
                <td class="px-6 py-4">
                    {{ grantee.firstname}}
                </td>
                <td style="overflow: hidden;" class="px-6 py-4">
                    {{ grantee.middlename }}
                </td>
                <td class="px-6 py-4">
                    {{ grantee.course_program }}
                </td>

                <td class="px-6 py-4">
                    {{ grantee.year_level }}
                </td>

                <td class="px-6 py-4">

                    <span v-if="grantee.status_validation === '1'" class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Validated</span>

                    <span v-else class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Delisted</span>
                </td>

                <td class="px-6 py-4">
                    {{ grantee.schoolyear.school_year }}
                </td>

                <td class="px-6 py-4">
                    {{ grantee.semester.semester }}
                </td>


                <!-- <td class="px-6 py-4">
                    <input v-model="selectedGrantees" id="default-checkbox" type="checkbox" :value="grantee.id" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                </td> -->
            </tr>

        </tbody>
    </table>

    <div class="mt-5">

        <div class="grid grid-cols-6">
            <div>
                <TailwindPagination
        :data="grantees"
        @pagination-change-page="fetchGrantees"
        :limit="5"

    />
            </div>



            <div class="col-end-8 gap-3">

                <!-- <button @click="selectAllGrantees" class="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 m-1 rounded-lg">
                    Select All
                </button> -->
                <button @click="fwdBilling" class="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg">
                    Generate Billing
                </button>
            </div>


            </div>

</div>


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
        grantees: [],
        granteeIds: [],
        selectedGrantees: [],
        programs: [],
        programId: null,
        billingForm:{
            hei_id: null,
            semester_id: null,
            school_year_id: null,
            program_id: null,
            amount: null,
            program_oc: null,
            total_amount: null,
            billing_status: 1,
            receipt: '',
            transaction_no: null,
        }
    };
  },

  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'heiId']),
  },

  methods: {


    fwdBilling() {
    if (window.confirm('Do you want to proceed?')) {
        this.$api.post('/gen-billing', 
            {   // ✅ Send data directly in the body
                granteeIds: this.granteeIds,
                billingForm: this.billingForm
            }, 
            {   // ✅ Headers should be in a separate object
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            }
        )
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(error => {
            console.error("Error in billing request:", error);
        });
    }
},

    selectAllGrantees() {
        if(this.selectedGrantees.length === this.granteeIds.length){
          this.selectedGrantees = [];
        }else{
          this.selectedGrantees = this.granteeIds;
        }
    },

    formatDecimalValue(decimalValue) {
      return Number(decimalValue).toLocaleString(); // Format to a string
    },

    
    calculateIndex(index) {
        return index + 1 + ((this.grantees.current_page - 1) * this.grantees.per_page);
        },

    fetchPrograms(page = 1){
            this.$api.get(`/get-programs/${this.heiId}?page=${page}`, {
              params: {
                sy: this.schoolYearId,
                sem: this.semesterId,
              },
                headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
            })

            .then(res => {
                this.programs = res.data.programs;
                console.log(res);
            })

    },

    updateBillingForm(){
        const selectedProgram = this.programs.find((program) => program.id === this.programId);

        this.billingForm.hei_id = this.heiId;
        this.billingForm.school_year_id = this.schoolYearId;
        this.billingForm.semester_id = this.semesterId;
        this.billingForm.program_id = this.programId;   
        this.billingForm.amount = this.granteeIds.length * selectedProgram.amount;
        this.billingForm.program_oc = this.billingForm.amount * selectedProgram.asc;
        this.billingForm.total_amount = this.billingForm.amount + this.billingForm.program_oc;

        console.log(this.billingForm);
    },

    fetchGrantees(page = 1){


            this.$api.get(`/get-grantees/${this.heiId}?page=${page}`, {
              params: {
                sy: this.schoolYearId,
                sem: this.semesterId,
                programId: this.programId,
              },
                headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
            })

            .then(res => {
                this.grantees = res.data.grantees;
                this.granteeIds = res.data.granteeIds;

                this.updateBillingForm();


            })

    },
  },

  watch: {
    schoolYearId: 'fetchPrograms',
    semesterId: 'fetchPrograms'
  },


  mounted(){
    this.fetchPrograms();
    
  },

  

  
};
</script>