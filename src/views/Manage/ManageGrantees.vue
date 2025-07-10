<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">

    <!-- Breadcrumb -->
    <nav class="flex mb-4" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li class="inline-flex items-center">
          <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 me-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M19.707 9.293l-2-2-7-7a1 1 0 00-1.414 0l-7 7-2 2a1 1 0 001.414 1.414L2 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414z"/>
            </svg>
            Home
          </a>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9l4-4-4-4"/>
            </svg>
            <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Manage Grantees</span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Filters -->
    <div class="mt-5 pb-4 bg-white dark:bg-gray-900">
      <div class="grid grid-cols-7 gap-3">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
          <input v-model="searchForm.lastname" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
          <input v-model="searchForm.firstname" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middlename</label>
          <input v-model="searchForm.middlename" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Year</label>
          <select @change="fetchPrograms" v-model="searchForm.school_year_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option value="">Select</option>
            <option v-for="sy in schoolyears" :key="sy.id" :value="sy.id">{{ sy.school_year }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
          <select @change="fetchPrograms" v-model="searchForm.semester_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option value="">Select</option>
            <option v-for="sem in semesters" :key="sem.id" :value="sem.id">{{ sem.semester }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Program</label>
          <select v-model="searchForm.program_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <option value="">Select</option>
            <option v-for="program in programs" :key="program.id" :value="program.id">{{ program.batch_name }} || Batch {{ program.batch_no }}</option>
          </select>
        </div>

        <div>
          <button @click="fetch_grantees" class="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">Filter</button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-6 py-3">No.</th>
          <th class="px-6 py-3">Last Name</th>
          <th class="px-6 py-3">First Name</th>
          <th class="px-6 py-3">Middle Name</th>
          <th class="px-6 py-3">Grant</th>
          <th class="px-6 py-3">Batch</th>
          <th class="px-6 py-3">Course</th>
          <th class="px-6 py-3">Year Level</th>
          <th class="px-6 py-3">Semester</th>
          <th class="px-6 py-3">School Year</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(grantee, index) in grantees.data" :key="grantee.id" class="bg-white border-b hover:bg-gray-50">
          <td class="px-6 py-4">{{ calculateIndex(index) }}</td>
          <td class="px-6 py-4 truncate max-w-[120px]">{{ grantee.lastname }}</td>
          <td class="px-6 py-4 truncate max-w-[120px]">{{ grantee.firstname }}</td>
          <td class="px-6 py-4 truncate max-w-[120px]">{{ grantee.middlename }}</td>
          <td class="px-6 py-4">{{ grantee.grant }}</td>
          <td class="px-6 py-4">{{ grantee.batch_no }}</td>
          <td class="px-6 py-4">{{ grantee.course_program }}</td>
          <td class="px-6 py-4">{{ grantee.year_level }}</td>
          <td class="px-6 py-4">{{ grantee.semester.semester }}</td>
          <td class="px-6 py-4">{{ grantee.schoolyear.school_year }}</td>
          <td class="px-6 py-4">
            <span v-if="grantee.status_validation === '1'" class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Validated</span>
            <span v-else class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Delisted</span>
          </td>
          <td class="px-6 py-4">
            <a href="#" @click.prevent="handleViewProfile(grantee.id)" class="text-blue-600 hover:underline">View</a>
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
    <Modal :isVisible="showModal" @update:isVisible="showModal = $event" title="View Profile" :isSubmit="false">
      <form class="max-w-sm mx-auto space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
          <input v-model="formData.lastname" disabled class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">First Name</label>
          <input v-model="formData.firstname" disabled class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Middle Name</label>
          <input v-model="formData.middlename" disabled class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Course/Program</label>
          <input v-model="formData.course_program" disabled class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Year Level</label>
          <input v-model="formData.year_level" disabled class="w-full p-2.5 rounded bg-gray-100 border border-gray-300 text-gray-900 text-sm" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Status</label>
          <span v-if="formData.status_validation === '1'" class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Validated</span>
          <span v-else class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Delisted</span>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import Modal from '../Modal/Modal.vue'
import { mapGetters } from 'vuex'

export default {
  components: { Modal },
  data() {
    return {
      showModal: false,
      grantees: [],
      schoolyears: [],
      semesters: [],
      programs: [],
      formData: {
        lastname: '', firstname: '', middlename: '', course_program: '', year_level: '', status_validation: ''
      },
      searchForm: {
        lastname: '', firstname: '', middlename: '',
        semester_id: 2, school_year_id: 1, program_id: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['accessToken', 'heiId'])
  },
  methods: {

    async fetchPrograms() {
      const res = await this.$api.get(`/get-programs/${this.heiId}`, {
        params: { sy: this.searchForm.school_year_id, sem: this.searchForm.semester_id },
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })
      this.programs = res.data.programs
    },

    handleViewProfile(id) {
      this.showModal = true
      const grantee = this.grantees.data.find(g => g.id === id)
      this.formData = { ...grantee }
    },

    calculateIndex(index) {
      return index + 1 + ((this.grantees.current_page - 1) * this.grantees.per_page)
    },

    async fetch_grantees(page = 1) {
      const res = await this.$api.post(`/tes-grantees/${this.heiId}?page=${page}`, this.searchForm, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })
      this.grantees = res.data.grantees
    },

    async sysem() {
      const res = await this.$api.get(`/sy-sem`, {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })
      this.semesters = res.data.semesters
      this.schoolyears = res.data.school_years
    },

exportGrantees() {
  if (!this.searchForm.program_id) {
    alert('Please select a Program before exporting grantees.');
    return;
  }

  if (window.confirm('Are you sure you want to export grantees?')) {
    this.$api.post('/tes-grantees-export', {
      sy: this.searchForm.school_year_id,
      sem: this.searchForm.semester_id,
      hei_id: this.heiId,
      programId: this.searchForm.program_id,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      responseType: 'blob', // Important for downloading files
    })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

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
  mounted() {
    this.fetch_grantees()
    this.fetchPrograms()
    this.sysem()
  }
}
</script>
