<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>

<div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <span class="font-medium">Instructions:</span> The table below shows the profile status per batch for each school year and semester, which is required before you can proceed with your billing documents.
</div>



<label for="schoolYearSelect" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Year</label>
<select v-model="selectedsy" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="">Select School Year</option>
        <option v-for="schoolyear in schoolyears" :key="schoolyear.id" :value="schoolyear.id">{{ schoolyear.school_year }}</option>
    </select>

  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
  <select v-model="selectedsem" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">Select School Year</option>
    <option v-for="semester in semesters" :key="semester.id" :value="semester.id">{{ semester.semester }}</option>

  </select>

  <div class="mt-4">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

                <th scope="col" class="px-6 py-3">
                    No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Grant
                </th>

                <th scope="col" class="px-6 py-3">
                    Batch No.
                </th>
                <th scope="col" class="px-6 py-3">
                    Batch Type
                </th>

                <th scope="col" class="px-6 py-3">
                    Grantees Total
                </th>

                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(batch, i) in batches" :key="batch.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                <td class="px-6 py-4">
                {{ i + 1 }}
                </td>

                <td class="px-6 py-4">
                {{ batch.grant }}
                </td>

                <td class="px-6 py-4">
                {{ batch.batch_no }}
                </td>


                <td class="px-6 py-4">
                {{ batch.batch_type }}
                </td>

                <td class="px-6 py-4">
                  {{ batch.total_grantees }}
                </td>

                <td class="px-6 py-4">
                  <span 
                    :class="[
                      batch.status.toLowerCase() === 'incomplete' 
                        ? 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300' 
                        : 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300'
                    ]"
                  >
                    {{ batch.status }}
                  </span>
</td>

            </tr>

        </tbody>
    </table>
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
        semesters: [],
        schoolyears: [],
        batches: [],
    };
  },

  
  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName', 'heiId']),
  },

methods: {

    async sysem(){
        try {
            const res = await this.$api.get(`/sy-sem`, {
                    headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    }
                });
            this.semesters = res.data.semesters;
            this.schoolyears = res.data.school_years;
            this.fetchBatchProfileStatus();
    
        } catch (error) {
            console.error(error);
        }
    },


    async fetchBatchProfileStatus(){


      this.$api.get(`/batch-profile-status/`, {
            params: {
                school_year_id: this.selectedsy, // Correct: send the ID
                semester_id: this.selectedsem, // Correct: send the ID
                hei_id: this.heiId
            },
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        })
        .then(res => {
          this.batches = res.data;
        })
        .catch(error => {
            console.error("Error fetching programs:", error);
        });
    },




  },

  mounted(){
        this.sysem();

  },
  
};
</script>

<style scoped>
</style>