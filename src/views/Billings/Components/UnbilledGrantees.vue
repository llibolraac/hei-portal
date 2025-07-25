<template>

<div v-if="loading" class="text-center">
    <div role="status">
        <svg class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>

  <div v-else class="relative overflow-x-auto rounded-lg shadow-sm">
    <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300">
      <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
        <tr>
          <th class="px-4 py-3">No.</th>
          <th class="px-4 py-3">Lastname</th>
          <th class="px-4 py-3">First Name</th>
          <th class="px-4 py-3">Middle Name</th>
          <th class="px-4 py-3">Program</th>
          <th class="px-4 py-3">Batch No.</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="unbilled_grantees.total > 0"
          v-for="(grantee, i) in unbilled_grantees.data"
          :key="grantee.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="px-4 py-2">{{ calculateIndex(i) }}</td>
          <td class="px-4 py-2">{{ grantee.grantee.lastname }}</td>
          <td class="px-4 py-2">{{ grantee.grantee.firstname }}</td>
          <td class="px-4 py-2">{{ grantee.grantee.middlename }}</td>
          <td class="px-4 py-2">{{ grantee.grantee.course_program }}</td>
          <td class="px-4 py-2">{{ grantee.grantee.batch_no }}</td>
          <td class="px-4 py-2">
            <span
              class="px-2 py-1 rounded text-xs font-semibold"
              :class="grantee.status_validation === '1' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
            >
              {{ grantee.status_validation === '1' ? 'ENROLLED' : 'DELISTED' }}
            </span>
          </td>
          <td class="px-4 py-2">{{ grantee.unbilled_validation.unbilled_description }}</td>
        </tr>
        <tr v-else>
          <td colspan="8" class="text-center py-6 text-gray-500 dark:text-gray-400">No Grantees Available</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="mt-4">
    <TailwindPagination
      :data="unbilled_grantees"
      @pagination-change-page="fetchData"
      :limit="2"
      :keepLength="true"
    />
  </div>

  <!-- Modal -->
  <Modal v-if="addToUnbilledModal" @close="closeUnbilled" @save="submitUnbilledGrantee">
    <h4 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Add to Unbilled</h4>
    <div class="mt-2">
      <label for="validation" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
        Select a Reason
      </label>
      <select
        v-model="validation"
        id="validation"
        class="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="" disabled>Select a Reason</option>
        <option
          v-for="validation in unbilled_grantees_validations"
          :key="validation.id"
          :value="validation.id"
        >
          {{ validation.unbilled_description }}
        </option>
      </select>
    </div>
  </Modal>
</template>


<script>
import { mapGetters } from 'vuex';
import Modal from '../../Modal/Modal.vue';

export default {
  components: {
    Modal,
  },

  props: {
    semesterId: { type: String, required: true },
    schoolYearId: { type: String, required: true },
  },

  data() {
    return {
      unbilled_grantees: [],
      grantees: [],
      lastname: '',
      firstname: '',
      middlename: '',
      unbilled_grantees_validations: [],
      validation: '',
      addToUnbilledModal: false,
      selectedGrantee: null,
    };
  },

  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName', 'heiId']),
  },

  methods: {
    calculateIndex(index) {
      return index + 1 + ((this.unbilled_grantees.current_page - 1) * this.unbilled_grantees.per_page);
    },

    async fetchData(page = 1) {
        this.loading = true;
      try {
        const res = await this.$api.get(`/delist?page=${page}`, {
          params: {
            heiId: this.heiId,
            school_year_id: this.schoolYearId,
            semester_id: this.semesterId,
          },
          headers: { Authorization: `Bearer ${this.accessToken}` },
        });
        this.unbilled_grantees = res.data.unbilledGrantees;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
