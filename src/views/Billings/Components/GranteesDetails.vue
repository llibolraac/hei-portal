<template>
  <div class="overflow-x-auto">
    <table
      class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-4 py-3 whitespace-nowrap">Lastname</th>
          <th scope="col" class="px-4 py-3 whitespace-nowrap">Firstname</th>
          <th scope="col" class="px-4 py-3 whitespace-nowrap">Middle Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(grantee, i) in grantees.data"
          :key="grantee.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="px-4 py-3 max-w-[120px] truncate">
            {{ grantee.grantees.lastname }}
          </td>
          <td class="px-4 py-3 max-w-[120px] truncate">
            {{ grantee.grantees.firstname }}
          </td>
          <td class="px-4 py-3 max-w-[120px] truncate">
            {{ grantee.grantees.middlename }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-5">
      <TailwindPagination
        :data="grantees"
        @pagination-change-page="fetchBillingGrantees"
        :limit="1"
        :keepLength="true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    billingId: {
      required: true,
    },
  },

  data() {
    return {
      grantees: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        prev_page_url: null,
        next_page_url: null,
      },
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken"]),
  },

  methods: {
    fetchBillingGrantees(page = 1) {
      this.$api
        .get(`/get-billing-grantees/${this.billingId}?page=${page}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.grantees = res.data.grantees;
          }
        });
    },
  },

  mounted() {
    this.fetchBillingGrantees();
  },
};
</script>

<style lang="scss" scoped></style>
