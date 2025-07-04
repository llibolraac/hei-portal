<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>
<div v-if="loading">
    Loading ...
</div>

<div v-else>
    <form @submit.prevent="downloadTemplate">

    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Year</label>
    <select @change="fetchPrograms()" v-model="selectedsy" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="">Select School Year</option>
        <option v-for="schoolyear in schoolyears" :key="schoolyear.id" :value="schoolyear.id">{{ schoolyear.school_year }}</option>
    </select>

  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
  <select @change="fetchPrograms()" v-model="selectedsem" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">Select School Year</option>
    <option v-for="semester in semesters" :key="semester.id" :value="semester.id">{{ semester.semester }}</option>

  </select>

   <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Programs</label>
    <select v-model="selected_program" id="schoolyear" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="fetchGrantees">
                    <option selected>Select a Program</option>
                    <option v-for="program in programs" :key="program.id" :value="program" >ID: {{program.id}} Program: {{ program.grant }} || Batch No: {{ program.batch_no }} || Batch type: {{ program.batch_type }} || Amount: {{ program.amount }}</option>
                </select>
    <button class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Download Template</button>
    </form>
</div>



</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {

  components: {


  },


  data() {
    return {
        selectedsem: 1,
        selectedsy: 3,
        selected_program: null,
        semesters: [],
        schoolyears: [],
        programs: [],
        program_id: null,
        loading: true,

    };
  },

  
  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName', 'heiId']),
  },

  methods: {

    downloadTemplate() {
    const filters = {
        selectedsy: this.selectedsy,
        selectedsem: this.selectedsem,
        batch_no: this.selected_program['batch_no'],// ensure this is not null/undefined
        hei_id: this.heiId,
        batch_type: this.selected_program['batch_type'],// ensure this is not null/undefined
        grant: this.selected_program['grant'],// ensure this is not null/undefined

    };

    this.$api.post('/grantees/template', filters, {
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${this.accessToken}`,
        },
    })
    .then(response => {
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'grantee_update_template.xlsx';
        link.click();
    })
    .catch(error => {
        console.error('Template download failed:', error);
    });
},


    fetchPrograms(page = 1){
        this.$api.get(`/get-programs/${this.heiId}?page=${page}`, {
            params: {
            sy: this.selectedsy,
            sem: this.selectedsem,
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

    async sysem(){
        try {
            const res = await this.$api.get(`/sy-sem`, {
                    headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    }
                });
            this.semesters = res.data.semesters;
            this.schoolyears = res.data.school_years;
            this.fetchPrograms();



    
        } catch (error) {
            console.error(error);
        }
    },



  },

  mounted(){
        this.sysem();
  },
  
};
</script>

<style scoped>
</style>