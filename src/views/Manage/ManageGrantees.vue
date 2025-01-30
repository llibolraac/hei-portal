<template>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
    <div class="pb-4 bg-white dark:bg-gray-900">

        <div class="grid grid-cols-7 gap-3">

            

            <div>
                <div class="max-w-sm mx-auto">
            <select id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Select School Year</option>
                <option v-for="schoolyear in schoolyears" :key="schoolyear.id">{{ schoolyear.school_year }}</option>
            </select>

  
                </div>
            </div>


            <div>
                <select id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Semester</option>
                <option v-for="semester in semesters" :key="semester.id">{{ semester.semester }}</option>
            </select>
            </div>
            <div>
                <select id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Program</option>
                <option v-for="program in programs" :key="program.id"></option>
            </select>
            </div>


            <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-lg">
                    Filter
                </button>
            </div>

  
        </div>


  


        
  
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                    Action
                </th>
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
                <td class="px-6 py-4">
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
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="handleViewProfile(grantee.id)">View Profile</a>
                </td>
            </tr>

        </tbody>
    </table>

</div>


    <TailwindPagination
        :data="grantees"
        @pagination-change-page="fetch_grantees"
        :limit="5"
    />



    <!-- Modal component -->
    <Modal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      title="View Profile"
      :isSubmit="false"
    >




    <form class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
    <input v-model="formData.lastname" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
    <input v-model="formData.firstname" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
  </div>

  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
    <input v-model="formData.middlename" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
  </div>

  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course/Program</label>
    <input v-model="formData.course_program" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year level</label>
    <input v-model="formData.year_level" type="text" id="email" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
  </div>
  
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status Validation</label>
    <span v-if="formData.status_validation === '1'" class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Validated</span>

    <span v-else class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Delisted</span>
  </div>

</form>


    </Modal>

</template>

<script>
import Modal from '../Modal/Modal.vue'
import { mapGetters } from 'vuex';

export default {
    components: {
    Modal,
  },

    data() {
        return {
            showModal: false,
            grantees: [],
            schoolyears: [],
            semesters: [],
            programs: [],
            formData: {
                lastname: '',
                firstname: '',
                middlename: '',
                course_program: '',
                year_level: '',
                status_validation: '',

            },
        };
    },

    computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName', 'heiId']),
  },


    methods: {

        async fetchPrograms(){
        try {
            const res = await this.$api.get(`/program`, {
                    headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    }
                });
            this.programs = res.data.programs;
    
        } catch (error) {
            
        }
        },
        
        handleViewProfile(granteeId) {
            this.showModal = true;

            const selectedGrantee = this.grantees.data.find((grantee) => grantee.id === granteeId);
            this.formData = {
                lastname: selectedGrantee.lastname,
                firstname: selectedGrantee.firstname,
                middlename: selectedGrantee.middlename,
                course_program: selectedGrantee.course_program,
                year_level: selectedGrantee.year_level,
                status_validation: selectedGrantee.status_validation,
            };

        },
 

        calculateIndex(index) {
        return index + 1 + ((this.grantees.current_page - 1) * this.grantees.per_page);
        },

        async fetch_grantees(page = 1){
            try {
                const res = await this.$api.get(`/tes-grantees/${this.heiId}?page=${page}`, {

                        headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                        }
                    });
            this.grantees = res.data.grantees;  
             

            } catch (error) {
                console.error(error);
            }
        },

        async sysem(page = 1){
            try {
                const res = await this.$api.get(`/sy-sem`, {
                        headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                        }
                    });
                this.semesters = res.data.semesters;
                this.schoolyears = res.data.school_years;
          

            } catch (error) {
                console.error(error);
            }
        },
    },

    mounted() {
        this.fetch_grantees();
        this.fetchPrograms();
        this.sysem();
    }
};
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>