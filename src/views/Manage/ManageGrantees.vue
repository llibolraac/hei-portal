<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
    <!-- Breadcrumb -->
    <nav class="flex mb-4" aria-label="Breadcrumb">
      <ol
        class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
      >
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg class="w-3 h-3 me-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M19.707 9.293l-2-2-7-7a1 1 0 00-1.414 0l-7 7-2 2a1 1 0 001.414 1.414L2 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414z"
              />
            </svg>
            Home
          </a>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg
              class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
            <span
              class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
              >Manage Grantees</span
            >
          </div>
        </li>
      </ol>
    </nav>

    <!-- Filters -->
    <div class="mt-5 pb-4 bg-white dark:bg-gray-900">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4"
      >
        <!-- Lastname -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Lastname</label
          >
          <input
            v-model="searchForm.lastname"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <!-- Firstname -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Firstname</label
          >
          <input
            v-model="searchForm.firstname"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <!-- Middlename -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Middlename</label
          >
          <input
            v-model="searchForm.middlename"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <!-- School Year -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >School Year</label
          >
          <select
            @change="fetchPrograms"
            v-model="searchForm.school_year_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select</option>
            <option v-for="sy in schoolyears" :key="sy.id" :value="sy.id">
              {{ sy.school_year }}
            </option>
          </select>
        </div>

        <!-- Semester -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Semester</label
          >
          <select
            @change="fetchPrograms"
            v-model="searchForm.semester_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select</option>
            <option v-for="sem in semesters" :key="sem.id" :value="sem.id">
              {{ sem.semester }}
            </option>
          </select>
        </div>

        <!-- Program -->
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Program</label
          >
          <select
            v-model="searchForm.program_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select</option>
            <option
              v-for="program in programs"
              :key="program.id"
              :value="program.id"
            >
              ID: {{ program.id }} || {{ program.batch_name }} || Batch
              {{ program.batch_no }} || Amount
              {{ program.amount }}
            </option>
          </select>
        </div>

        <!-- Filter Button -->
        <div class="flex items-end">
          <button
            @click="fetch_grantees"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Filter
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center mt-3">
      <div role="status">
        <svg
          class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    <!-- Table -->
    <table v-else class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">No.</th>
          <th class="px-6 py-3">Last Name</th>
          <th class="px-6 py-3">First Name</th>
          <th class="px-6 py-3">Middle Name</th>
          <th class="px-6 py-3">Grant</th>
          <th class="px-6 py-3">Batch</th>

          <th class="px-6 py-3">Year Level</th>
          <th class="px-6 py-3">Semester</th>
          <th class="px-6 py-3">School Year</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Remarks</th>
          <th class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(grantee, index) in grantees.data"
          :key="grantee.id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <td class="px-6 py-4">{{ calculateIndex(index) }}</td>
          <td class="px-6 py-4 truncate max-w-[120px]">
            {{ grantee.lastname }}
          </td>
          <td class="px-6 py-4 truncate max-w-[120px]">
            {{ grantee.firstname }}
          </td>
          <td class="px-6 py-4 truncate max-w-[120px]">
            {{ grantee.middlename }}
          </td>
          <td class="px-6 py-4">{{ grantee.grant }}</td>
          <td class="px-6 py-4">{{ grantee.batch_no }}</td>

          <td class="px-6 py-4">{{ grantee.year_level }}</td>
          <td class="px-6 py-4">{{ grantee.semester.semester }}</td>
          <td class="px-6 py-4">{{ grantee.schoolyear.school_year }}</td>
          <td class="px-6 py-4">
            <span
              v-if="grantee.status_validation === '1'"
              class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >Validated</span
            >
            <span
              v-else
              class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >Delisted</span
            >
          </td>

          <td class="px-6 py-4">
            {{ grantee.remarks }}
          </td>
          <td class="px-6 py-4">
            <a
              href="#"
              @click.prevent="handleViewProfile(grantee.id)"
              class="text-blue-600 hover:underline"
              >View</a
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-5 flex flex-col md:flex-row justify-between items-center">
      <div>
        <TailwindPagination
          :data="grantees"
          @pagination-change-page="fetch_grantees"
          :limit="5"
        />
      </div>

      <div class="mt-4 md:mt-0">
        <button
          @click="exportGrantees"
          class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-md rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Export Grantees
        </button>
      </div>
    </div>

    <!-- Modal -->
    <Modal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      title="View Profile"
      :isSubmit="false"
    >
      <form class="max-w-sm mx-auto space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            v-model="formData.lastname"
            disabled
            class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            v-model="formData.firstname"
            disabled
            class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Middle Name</label
          >
          <input
            v-model="formData.middlename"
            disabled
            class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Course/Program</label
          >
          <input
            v-model="formData.course_program"
            disabled
            class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Year Level</label
          >
          <input
            v-model="formData.year_level"
            disabled
            class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700"
            >Status</label
          >
          <span
            v-if="formData.status_validation === '1'"
            class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >Validated</span
          >
          <span
            v-else
            class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >Delisted</span
          >
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import Modal from "../Modal/Modal.vue";
import { mapGetters } from "vuex";

export default {
  components: { Modal },
  data() {
    return {
      showModal: false,
      loading: false,
      grantees: [],
      schoolyears: [],
      semesters: [],
      programs: [],
      formData: {
        lastname: "",
        firstname: "",
        middlename: "",
        course_program: "",
        year_level: "",
        status_validation: "",
      },
      searchForm: {
        lastname: "",
        firstname: "",
        middlename: "",
        semester_id: 2,
        school_year_id: 1,
        program_id: "",
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["accessToken", "heiId"]),
  },
  methods: {
    async fetchPrograms() {
      const res = await this.$api.get(`/get-programs/${this.heiId}`, {
        params: {
          sy: this.searchForm.school_year_id,
          sem: this.searchForm.semester_id,
        },
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      this.programs = res.data.programs;
    },

    handleViewProfile(id) {
      this.showModal = true;
      const grantee = this.grantees.data.find((g) => g.id === id);
      this.formData = { ...grantee };
    },

    calculateIndex(index) {
      return (
        index + 1 + (this.grantees.current_page - 1) * this.grantees.per_page
      );
    },

    async fetch_grantees(page = 1) {
      this.loading = true;
      const res = await this.$api.post(
        `/tes-grantees/${this.heiId}?page=${page}`,
        this.searchForm,
        {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );
      this.grantees = res.data.grantees;
      this.loading = false;
    },

    async sysem() {
      const res = await this.$api.get(`/sy-sem`, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      this.semesters = res.data.semesters;
      this.schoolyears = res.data.school_years;
    },

    exportGrantees() {
      if (window.confirm("Are you sure you want to export grantees?")) {
        this.$api
          .post(
            "/tes-grantees-export",
            {
              sy: this.searchForm.school_year_id,
              sem: this.searchForm.semester_id,
              hei_id: this.heiId,
              programId: this.searchForm.program_id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.accessToken}`,
              },
              responseType: "blob", // Important for downloading files
            }
          )
          .then((response) => {
            const blob = new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "tes-grantees-export.xlsx";
            link.click();
            URL.revokeObjectURL(link.href);
          })
          .catch((error) => {
            console.error("Export failed:", error);
          });
      }
    },
  },
  mounted() {
    this.fetch_grantees();
    this.fetchPrograms();
    this.sysem();
  },
};
</script>
