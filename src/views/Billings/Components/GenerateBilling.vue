<template>

<div v-if="loading" class="text-center">
    <div role="status">
        <svg class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>

<div v-else>
  
<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span class="font-medium">Instructions:</span> Please ensure that the grantee's profile — including Student Number, Contact Number, Zip Code, and Email Address — is updated before generating a billing document to facilitate a smooth process.
</div>

<div class="mt-3">

<label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Program:</label>
<select v-model="programId" id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="fetchGrantees">
                <option value="">Select a Program</option>
                <option v-for="program in programs" :key="program.id" :value="program.id" >Program: {{ program.grant }} || Batch No: {{ program.batch_no }} || Batch type: {{ program.batch_type }}</option>
            </select>

<p class="text-gray-900 text-right font-bold text-sm mt-3">No. of Grantees: {{ formatDecimalValue(selectedGrantees.length) }}</p>
</div>

<table v-if="grantees && grantees.data && grantees.data.length > 0" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-6">
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
                  <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.lastname}}</p> 
                </td>
                <td class="px-6 py-4">
                    <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.firstname}}</p>
                </td>
                <td style="overflow: hidden;" class="px-6 py-4">
                                        <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.middlename }}</p>
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

                <button v-if="grantees && grantees.data && grantees.data.length > 0"  @click="exportGrantees" class="bg-orange-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg">
                    Export Grantees
                </button>
                <button v-if="grantees && grantees.data && grantees.data.length > 0"  @click="fwdBilling" class="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg">
                    Generate Billing
                </button>
            </div>


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
        programId: "",
        loading: false,
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
      {
        granteeIds: this.granteeIds,
        billingForm: this.billingForm
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    )
    .then(res => {
      if (res.data.success) {
        window.location.reload();
      } else {
        this.$toast.error(res.data.message || 'Failed to generate billing.');
      }
    })
    .catch(error => {
      console.error("Billing error:", error);
      this.$toast.error('An unexpected error occurred.');
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
      this.loading = true;
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
                this.loading = false;
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
                this.selectedGrantees = this.granteeIds;

                this.updateBillingForm();
            })

    },

exportGrantees() {


if(window.confirm('Are you Sure you want to export grantees?')){
  this.$api.post('/tes-grantees-export', {
    sy: this.schoolYearId,
    sem: this.semesterId,
    hei_id: this.heiId,
    programId: this.programId,
  }, {
    headers: {
      Authorization: `Bearer ${this.accessToken}`,
    },
    responseType: 'blob', // Important for downloading files
  })
  .then((response) => {
    // Create a blob from the response
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tes-grantees-export.xlsx';
    link.click();
    URL.revokeObjectURL(link.href);
  })
  .catch((error) => {
    console.error('Export failed:', error);
  });
}
}




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