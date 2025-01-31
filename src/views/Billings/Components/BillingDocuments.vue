<template>

{{ sy_id }} {{ sem_id }}

<!--     
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
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" @click="handleViewProfile(grantee.id)">View Profile</a>
                </td>
            </tr>

        </tbody>
    </table>

 -->

</template>

<script>
import { mapActions } from 'vuex';
  
export default {

  data() {
    return {
        sem_id: null,
        sy_id: null,
    };
  },

  methods: {
    ...mapActions('auth', ['login']),
  },

  mounted(){
    this.sem_id = localStorage.getItem('sem');
    this.sy_id = localStorage.getItem('sy');

    
  },

  

  
};
</script>