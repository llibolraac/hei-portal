<template>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">

    <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
        <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 me-2.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
        </a>
        </li>
        <li aria-current="page">
        <div class="flex items-center">
            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Manage Grantees</span>
        </div>
        </li>
    </ol>
    </nav>



    <div class="mt-5 pb-4 bg-white dark:bg-gray-900">

        <div class="grid grid-cols-7 gap-3">

            

            <div>
                <div class="max-w-sm mx-auto">
            <select @change="fetchPrograms" v-model="searchForm.school_year_id" id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Select School Year</option>
                <option v-for="schoolyear in schoolyears" :key="schoolyear.id" :value="schoolyear.id">{{ schoolyear.school_year }}</option>
            </select>

  
                </div>
            </div>


            <div>
                <select @change="fetchPrograms" v-model="searchForm.semester_id" id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Semester</option>
                <option v-for="semester in semesters" :key="semester.id" :value="semester.id">{{ semester.semester }}</option>
            </select>
            </div>
            <div>
                <select v-model="searchForm.program_id" id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Program</option>
                <option v-for="program in programs" :key="program.id" :value="program.id">{{ program.batch_name }} || {{ program.batch_no }}</option>
            </select>
            </div>


            <div>
                <button @click="fetch_grantees" class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-lg">
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
                    Grant
                </th>

                <th scope="col" class="px-6 py-3">
                    Batch
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
                    Semester
                </th>

                <th scope="col" class="px-6 py-3">
                    School Year
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
                     <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.lastname}}</p>
                </td>
                <td class="px-6 py-4">
                     <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.firstname}}</p>
                </td>
                <td class="px-6 py-4">
                     <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.middlename }}</p>
                </td>
                <td class="px-6 py-4">
                    {{ grantee.grant }}
                </td>

                <td class="px-6 py-4">
                    {{ grantee.batch_no }}
                </td>
                <td class="px-6 py-4">
                    {{ grantee.course_program }}
                </td>

                <td class="px-6 py-4">
                    {{ grantee.year_level }}
                </td>

                <td class="px-6 py-4">
                    {{ grantee.schoolyear.school_year }}
                </td>

                <td class="px-6 py-4">
                    {{ grantee.semester.semester }}
                </td>

                <td class="px-6 py-4">

                    <span v-if="grantee.status_validation === '1'" class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Validated</span>

                    <span v-else class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Delisted</span>
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="handleViewProfile(grantee.id)">View</a>
                </td>
            </tr>

        </tbody>
    </table>

</div>


<div class="mt-5">
    <TailwindPagination
        :data="grantees"
        @pagination-change-page="fetch_grantees"
        :limit="5"

    />
</div>




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
            searchForm: {
                semester_id: 2,
                school_year_id: 1,
                program_id: '',
            }
        };
    },

    computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName', 'heiId']),
  },


    methods: {

        async fetchPrograms(){
            this.$api.get(`/get-programs/${this.heiId}`, {
              params: {
                sy: this.searchForm.school_year_id,
                sem: this.searchForm.semester_id,
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
                const res = await this.$api.post(`/tes-grantees/${this.heiId}?page=${page}`, this.searchForm, {

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
                const res = await this.$api.get(`/sy-sem?page=${page}`, {
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