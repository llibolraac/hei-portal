<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>
Hello World

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
    
        } catch (error) {
            console.error(error);
        }
    },





  },

  mounted(){
        this.sysem();
  },
  
};
</script>

<style scoped>
</style>