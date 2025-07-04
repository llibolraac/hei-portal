<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>

    <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
    <span class="font-medium">Important Instructions:</span> Please be informed that you are <strong>not allowed to tamper</strong> with the generated template in any way, including changing the <strong>data types</strong> of the cells. The file must remain in <strong>CSV format</strong>, exactly as it was when downloaded. You are only required to fill in the <strong> Zip Code, Email Address, and Contact Number for each grantee.</strong><br /> <br />

    If you need to change any details related to the grantee's name, please coordinate with your respective UniFAST Regional Coordinator assigned to your institution.


    </div>



        
  




        <form @submit.prevent="uploadTemplate">

    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Year</label>
    <select v-model="selectedsy" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="">Select School Year</option>
        <option v-for="schoolyear in schoolyears" :key="schoolyear.id" :value="schoolyear.id">{{ schoolyear.school_year }}</option>
    </select>

  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
  <select v-model="selectedsem" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">Select School Year</option>
    <option v-for="semester in semesters" :key="semester.id" :value="semester.id">{{ semester.semester }}</option>

  </select>

    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" @change="handleFileChange" ref="fileInput">
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>



    <button   type="button"
  @click="uploadTemplate" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload File</button>
    </form>


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
        semesters: [],
        schoolyears: [],
        programs: [],
        program_id: null,
        selectedFile: null,

    };
  },

  
  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName', 'heiId']),
  },

methods: {

  handleFileChange(event) {
    const file = event?.target?.files?.[0];
    if (file) {
      this.selectedFile = file;
    } else {
      alert("No file selected");
    }
  },
  async uploadTemplate() {
    const file = this.selectedFile;

    if (!file) {
      alert("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('school_year_id', this.selectedsy);
    formData.append('semester_id', this.selectedsem);
    formData.append('hei_id', this.heiId); // from your auth module

    try {
      await this.$api.post('/grantees/batch-update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.accessToken}`, // if needed
        },
      });

      alert('Batch update successful!');
    } catch (e) {
      if (e.response?.data?.errors) {
        console.error('Validation errors:', e.response.data.errors);
        alert('Some rows failed. Check console for details.');
      } else {
        console.error('Upload failed:', e);
        alert('Upload failed. Try again.');
      }
    }
  },

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
            console.log(res);
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