<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>
  <div
    class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
    role="alert"
  >
    <span class="font-medium">Instructions:</span> The table below shows the
    profile status per batch for each school year and semester, which is
    required before you can proceed with your billing documents.
  </div>

  <label
    for="schoolYearSelect"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >School Year</label
  >
  <select
    @change="fetchBatchProfileStatus"
    v-model="selectedsy"
    id="countries"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    required
  >
    <option value="">Select School Year</option>
    <option
      v-for="schoolyear in schoolyears"
      :key="schoolyear.id"
      :value="schoolyear.id"
    >
      {{ schoolyear.school_year }}
    </option>
  </select>

  <label
    for="countries"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Semester</label
  >
  <select
    @change="fetchBatchProfileStatus"
    v-model="selectedsem"
    id="countries"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    required
  >
    <option value="">Select School Year</option>
    <option
      v-for="semester in semesters"
      :key="semester.id"
      :value="semester.id"
    >
      {{ semester.semester }}
    </option>
  </select>

  <div v-if="loading" class="flex items-center justify-center mt-5">
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>

  <div v-else class="mt-4">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">No.</th>
          <th scope="col" class="px-6 py-3">Grant</th>

          <th scope="col" class="px-6 py-3">Batch No.</th>
          <th scope="col" class="px-6 py-3">Batch Type</th>

          <th scope="col" class="px-6 py-3">Grantees Total</th>

          <th scope="col" class="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(batch, i) in batches"
          :key="batch.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
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
                  : 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300',
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
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  components: {},

  data() {
    return {
      selectedsem: 1,
      selectedsy: 3,
      semesters: [],
      schoolyears: [],
      batches: [],
      loading: false,
    };
  },

  computed: {
    ...mapGetters("auth", [
      "accessToken",
      "userType",
      "userId",
      "userName",
      "heiId",
    ]),
  },

  methods: {
    async sysem() {
      this.loading = true;

      try {
        const res = await this.$api.get(`/sy-sem`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.semesters = res.data.semesters;
        this.schoolyears = res.data.school_years;
        this.fetchBatchProfileStatus();
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchBatchProfileStatus() {
      this.$api
        .get(`/batch-profile-status`, {
          params: {
            school_year_id: this.selectedsy, // Correct: send the ID
            semester_id: this.selectedsem, //  Correct: send the ID
            hei_id: this.heiId,
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.batches = res.data;
        })
        .catch((error) => {
          console.error("Error fetching programs:", error);
        });
    },
  },

  mounted() {
    this.sysem();
  },
};
</script>

<style scoped></style>
