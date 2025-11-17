<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>
  <div v-if="loading" class="flex items-center justify-center mb-3">
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

  <div v-else class="p-3">
    <div
      class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <span class="font-medium">Instructions:</span> Please ensure that the
      grantee's profile — including Student Number, Contact Number, Zip Code,
      and Email Address — is updated before generating a billing document to
      facilitate a smooth process.
    </div>

    <form @submit.prevent="downloadTemplate">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >School Year</label
      >
      <select
        @change="fetchPrograms()"
        v-model="selectedsy"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option value="">Select School Year</option>
        <option
          v-for="schoolyear in schoolyears.filter((sy) => sy.id !== 4)"
          :key="schoolyear.id"
          :value="schoolyear"
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
        @change="fetchPrograms()"
        v-model="selectedsem"
        id="countries"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option value="">Select School Year</option>
        <option
          v-for="semester in semesters"
          :key="semester.id"
          :value="semester"
        >
          {{ semester.semester }}
        </option>
      </select>

      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Programs</label
      >
      <select
        v-model="selected_program"
        id="program-select"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        @change="fetchGrantees"
      >
        <option :value="null" disabled>Select a Program</option>
        <option v-for="program in programs" :key="program.id" :value="program">
          ID: {{ program.id }} Program: {{ program.grant }} || Batch No:
          {{ program.batch_no }} || Batch type: {{ program.batch_type }} ||
          Amount: {{ program.amount }}
        </option>
      </select>
      <button
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Download Template
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  components: {},

  data() {
    return {
      selectedsem: null,
      selectedsy: null,
      selected_program: null,
      semesters: [],
      schoolyears: [],
      programs: [],
      program_id: null,
      loading: true,
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
    downloadTemplate() {
      const filters = {
        sy: this.selectedsy.id,
        sem: this.selectedsem.id,
        program_id: this.selected_program["id"], // ensure this is not null/undefined
        hei_id: this.heiId,
      };

      this.$api
        .post("/grantees/template", filters, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${this.selectedsy.school_year} ${this.selectedsem.semester} ${this.selected_program.grant} Batch ${this.selected_program.batch_no} ${this.selected_program.batch_type} ${this.selected_program.amount}.csv`;
          link.click();
        })
        .catch((error) => {
          console.error("Template download failed:", error);
        });
    },

    fetchPrograms(page = 1) {
      this.$api
        .get(`/get-programs/${this.heiId}?page=${page}`, {
          params: {
            sy: this.selectedsy["id"],
            sem: this.selectedsem["id"],
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })

        .then((res) => {
          this.programs = res.data.programs;
          // this.file_sy = res.data.sy;
          // this.file_sem = res.data.sem;
          this.loading = false;
        });
    },

    async sysem() {
      try {
        const res = await this.$api.get(`/sy-sem`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.semesters = res.data.semesters;
        this.schoolyears = res.data.school_years;
        this.selectedsy = this.schoolyears[2];
        this.selectedsem = this.semesters[1];

        this.fetchPrograms();
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.sysem();
  },
};
</script>

<style scoped></style>
