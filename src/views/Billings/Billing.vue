<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4">

<!-- Breadcrumbs -->
<nav class="flex" aria-label="Breadcrumb">
<ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li class="inline-flex items-center">
    <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Home
    </a>
    </li>
    <li aria-current="page">
    <div class="flex items-center">
        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Manage Billings</span>
    </div>
    </li>

    <li aria-current="page">
    <div class="flex items-center">
        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{{ currentTab }}</span>
    </div>
    </li>
</ol>
</nav>

<!-- Starts Here -->


<ul class="mt-4 flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400" 
    data-tabs-toggle="#tabContent" 
    role="tablist">

    <li class="me-2">
        <button id="billing-tab" 
                data-tabs-target="#billing-documents" 
                type="button" 
                role="tab" 
                aria-controls="billing-documents" 
                aria-selected="true"
                :class="{
                'inline-block px-4 py-3 text-white bg-blue-600 rounded-lg': currentTab === 'Billing Documents',
                'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white': currentTab !== 'generate-billing-documents'
                }"
                @click="switchToBillingDocuments"
                >
            Billing Documents
        </button>
    </li>
    
    <li class="me-2">
        <button id="generate-billing-tab" 
                data-tabs-target="#generate-billing-documents" 
                type="button" 
                role="tab" 
                aria-controls="generate-billing-documents" 
                aria-selected="false"
                :class="{
                'inline-block px-4 py-3 text-white bg-blue-600 rounded-lg hover:text-blue-900': currentTab === 'Generate Billing Documents',
                'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white': currentTab !== 'Generate Billing Documents'
                }"
                @click="switchToGenerateVoucher"
                >
            Generate Billing Documents
        </button>
    </li>

</ul>

<div id="tabContent">
    <div id="billing-documents" role="tabpanel" class="p-4 bg-white rounded-lg dark:bg-gray-800">
        <BillingDocuments :schoolYearId="schoolYearId" :semesterId="semesterId"/>
    </div>

    <div id="generate-billing-documents" role="tabpanel" class="hidden p-4 bg-white rounded-lg dark:bg-gray-800">
        <GenerateBilling :schoolYearId="schoolYearId" :semesterId="semesterId"/>
    </div>
</div>
<!-- Ends Here -->
 

</div>  
</template>
<script>
import { mapActions } from 'vuex';
import BillingDocuments from './Components/BillingDocuments.vue';
import GenerateBilling from './Components/GenerateBilling.vue'
  
export default {

  components: {
    BillingDocuments,
    GenerateBilling
  },


  data() {
    return {
        semesterId: '',
        schoolYearId: '',
        currentTab: 'Billing Documents'
    };
  },

  watch: {
    '$route.query': {
      handler(newQuery) {
        this.updateQueryParams();
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    updateQueryParams() {
      this.schoolYearId = this.$route.query.schoolYearId || '';
      this.semesterId = this.$route.query.semesterId || '';
    },

    switchToBillingDocuments(){
      this.currentTab = 'Billing Documents'
    },

    switchToGenerateVoucher(){
      this.currentTab = 'Generate Billing Documents'
    }
  },

  mounted(){
    this.updateQueryParams();
  }

  
};
</script>

<style scoped>
</style>