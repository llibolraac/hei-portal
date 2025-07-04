<template>

<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Lastname
                </th>

                <th scope="col" class="px-6 py-3">
                    Firstname
                </th>

                <th scope="col" class="px-6 py-3">
                    Middle Name
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(grantee, i) in grantees.data" :key="grantee.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                <td class="px-6 py-4">

                     <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.grantees.lastname}}</p>
                </td>   

                <td class="px-6 py-4">
                    <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.grantees.firstname}}</p>
                </td>

                <td class="px-6 py-4">
                    <p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.grantees.middlename}}</p>
                </td>

            </tr>

        </tbody>
    </table>

    <div class="mt-5">
    <TailwindPagination
        :data="grantees"
        @pagination-change-page="fetchBillingGrantees"
        :limit="5"

    />
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    props: {
        billingId: {
            required: true,
        },
    },

    data () {
        return {
            grantees: [],
        };
    },

    computed: {
        ...mapGetters('auth', ['accessToken']),
    },


    methods: {
        fetchBillingGrantees(page = 1) {
            this.$api.get(`/get-billing-grantees/${this.billingId}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            })
            .then(res => {
                if(res.data.success){
                    this.grantees = res.data.grantees
                    console.log(this.grantees)
                }
            });
        },
    },

    mounted() {
        this.fetchBillingGrantees();
    },

}
</script>

<style lang="scss" scoped>

</style>