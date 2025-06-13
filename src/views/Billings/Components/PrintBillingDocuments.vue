<template>

<button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="printForm1">Print Form 1</button>


<button type="submit" class="mt-3 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="printForm2">Print Form 2</button>
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
       
            };
        },
    
        computed: {
            ...mapGetters('auth', ['accessToken']),
        },
    
    
        methods: {
            fetchBillingGrantees(page = 1) {
                this.$api.get(`/fetch-billing-details/${this.billingId}?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                })
                .then(res => {
                        console.log(res)

                });
        },

        async printForm1() {
          const childRouteURL = this.$router.resolve({
            name: 'PrintForm1',
            query: {
              billingId: this.billingId,
            }
          }).href;
          // Open the new window to the child component's route URL
          const childWindow = window.open(childRouteURL, '_blank', 'width=800,height=600');


        },


        async printForm2() {
          const childRouteURL = this.$router.resolve({
            name: 'PrintForm2',
            query: {
              billingId: this.billingId,
            }
          }).href;
          // Open the new window to the child component's route URL
          const childWindow = window.open(childRouteURL, '_blank', 'width=800,height=600');


        },

        
        },
    
        mounted() {
            // fetchBillingGrantees();
        },
    
    }
    </script>
    
    <style lang="scss" scoped>
    
    </style>