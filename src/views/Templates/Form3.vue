<template>
  
  <div v-if="loading">
    Loading...
  </div>

<div v-else>
  <div style="text-align: right;">
 <span style="text-align: right; font-size: 12px; font-style: italic;;">System Generated Billing Document</span>
    </div>

<table width="200">
  
  <tbody>
    <tr>
      <td class="border-bottom" colspan="13"><h2 style="text-align: right; font-size: 10px;">Annex 2 - TES Continuing Form 3</h2></td>
    </tr>
    <tr>
      <td colspan="13" class="text-center border-top">
        <div class="flex-container">
          <div class="flex-item">
            <img src="/src/assets/unifast.png" alt="logo" style="width: 50px; height: 50px;">
          </div>
          <div class="flex-item" style="text-align: center;">
            <p >Republic of the Philippines</p>
            <p><strong>Name of Higher Education Institution</strong></p>
            <p>Address of Higher Education Institution</p>
            <p style="font-size: 17px; font-weight: bold;">CONSOLIDATED TES BILLING STATEMENT</p>
          </div>



          <div class="flex-item">
            <img src="/src/assets/chedlogo.png" alt="logo" style="width: 50px; height: 50px;">
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="11" class="border-top border-right" style="text-align:  right;"><p>Date:</p></td>
      <td colspan="2" class="border-top">{{ formattedDate }}</td>
    </tr>
    <tr>
      <td colspan="5"><p><strong>INSTRUCTIONS</strong></p>
        <p>1. This form shall only include the names of those continuing TES grantees who are NOT INCLUDED in TES Continuing Form 2</p>
        <p>&nbsp;</p>
        <p>2. In the table below, list down the names of continuing TES grantees per campus in alphabetical order, if applicable, </p>
        <p>if applicable. (1) by campus; (2) by college; (3) by progra; and (4) by student name (Last Name, First Name, MI).</p>
        <p>&nbsp;</p>
        <p>3. Include and update all information required in the space provided.</p>
        <p>&nbsp;</p>
        <p>4. Assign a 5-digit Control Number for each enrolled student. The control number should be assigned in chronological order to the students listed according to the instruction no. 2.</p>
        <p>&nbsp;</p>
      <p>5.Indicate the current status of each student by selecting one of the following options under the column provided in the table: not enrolled, dropped, waived, on LOA, transferee, or graduated. Add remarks if necessary.</p></td>
      <td colspan="6" style="vertical-align: top;" class="border-right"><p></p>
        <p>6. Submit electronic and hard copies of the following forms to CHEDRO as supporting documents:      </p>
      <ul>
        <li>
          <p>6.1 TES Continuing Form 1</p>
        </li>
        <li>
          <p>6.2 TES Continuing Form 2</p>
        </li>
        <li>
          <p>6.3 TES Continuing Form 3</p>
        </li>
        <li>
          <p>6.4 Notarized Registrar's Certifiication</p>
        </li>
      </ul>
      <p></p></td>
      <td colspan="2"><p>&nbsp;</p></td>
    </tr>
    <tr>
      <td colspan="13"><p>TO: <strong>CHED - Regional Office ___________</strong></p></td>
    </tr>
    <tr>
      <td colspan="13"><p>Address: <strong>Address of CHED Regional Office</strong></p></td>
    </tr>
    <tr>
      <td width="4%" rowspan="3"><p>&nbsp;</p></td>
      <td colspan="12"><p><strong>TES Continuing Grantees Details:</strong></p></td>
    </tr>
    <tr>
      <td colspan="12">
      <p>Note: Please insert additional line as needed</p></td>
    </tr>
    <tr>
      <td colspan="12"><p><strong>Tertiary Education Subsidy: Based on Section 23 of Rule IV of IRR of R.A. No. 10931</strong></p></td>
    </tr>
    <tr>
      <td><p>&nbsp;</p></td>
      <td width="5%"><p>&nbsp;</p></td>
      <td width="9%"><p>&nbsp;</p></td>
      <td colspan="3"><p style="text-align: center;"><strong>Student's Name</strong></p></td>
      <td colspan="5"><p style="text-align: center;"><strong>Student Profile</strong></p></td>
      <td colspan="2"><p><strong></strong></p>        <p>&nbsp;</p></td>
    </tr>
    <tr>
      <td><p>5-digit Control Number</p></td>
      <td><p>Student Number</p></td>
      <td><p>TES Award Number</p></td>
      <td width="11%"><p>Last Name</p></td>
      <td width="9%"><p>Given Name</p></td>
      <td width="9%"><p>Middle Initial</p></td>
      <td width="3%"><p>Sex at Birth (M/F)</p></td>
      <td width="3%"><p>Birthdate</p></td>
      <td width="15%"><p>Degree Program</p></td>
      <td width="3%"><p>Year Level</p></td>
      <td width="6%"><p>Status</p></td>
      <td colspan="2"><p>Remarks</p></td>
    </tr>
    <tr v-for="(grantee,i) in grantees" :key="grantee.id"> 
      <td><p>{{ String(i + 1).padStart(5, '0') }}</p></td>
      <td><p> Student Number </p></td>
      <td><p>{{ grantee.award_no }}</p></td>
      <td><p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.lastname }}</p></td>
      <td><p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ grantee.firstname }}</p></td>
      <td><p style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" >{{ grantee.middlename }}</p></td>
      <td><p>{{ grantee.sex }}</p></td>
      <td><p></p></td>
      <td><p>{{ grantee.course_program }}</p></td>
      <td><p>{{ grantee.year_level }}</p></td>
      <td><p>{{ grantee.remarks }}</p></td>
      <td colspan="2"><p>&nbsp;</p></td>
    </tr>

    <tr>
      <td colspan="12"><p>Page Total</p></td>
      <td width="6%"><p>&nbsp;</p></td>
    </tr>
    <tr>
      <td colspan="12"><p>Page Accumulated Total</p></td>
      <td><p>&nbsp;</p></td>
    </tr>
    <tr>
      <td class="border-left border-bottom" colspan="3"><p style="margin-top: 20px;">Prepared By:</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p style="font-size: 11px; font-weight: bold;">{{ this.userName }}</p>
      <p>TES Focal Person</p></td>
      <td class="border-left border-bottom"  colspan="2"><p style="margin-top: 20px;">Certified by (As to correctness of enrollment data):</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p style="font-size: 11px; font-weight: bold;">{{ this.signatories.registrar }}</p>
      <p>Registrar</p></td>
      <td class="border-left border-bottom"  colspan="3"><p style="margin-top: 20px;">Certified by (as to correctness of financial data):</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p style="font-size: 11px; font-weight: bold;">{{ this.signatories.finance_head }}</p>
      <p>Accountant</p></td>
      <td class="border-left border-bottom"  colspan="3"><p style="margin-top: 20px;">Approved by:</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p style="font-size: 11px; font-weight: bold;">{{ this.signatories.president }}</p> 
      <p>{{ this.signatories.president_position }}</p></td>
      <td class="border-left border-bottom border-right"  colspan="2"><p>&nbsp;</p></td>
    </tr>
  </tbody>
</table>
</div>

    
</template>

<script>
import { mapGetters } from 'vuex';
export default {

    // props: {
    //     billingId: {
    //         required: true,
    //     },
    // },

    data () {
        return {
          billingId: null,
          billing_data: [],
          grantees: [],
          grantees_count: null,
          signatories: [],
          loading: true,
        };
    },

    computed: {
        ...mapGetters('auth', ['accessToken', 'heiId', 'userName']),

        TESBenefits(){
          return this.grantees_count * (this.billing_data?.program?.amount || 0);
        },

        ProgramASC() {
        const amount = this.grantees_count * (this.billing_data?.program?.amount || 0);
        return amount * (this.billing_data?.program?.asc || 0);
      },

      TotalTESAmount(){
        const amount = this.grantees_count * (this.billing_data?.program?.amount || 0);
        const program_oc = amount * (this.billing_data?.program?.asc || 0);
        return amount + program_oc;
      },

      formattedDate() {
        const date = new Date(this.billing_data.created_at);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
        

    },


    methods: {
      fetchBillingId(){
        this.billingId = this.$route.query.billingId;
      },


      formatDecimalValue(decimalValue) {
    return Number(decimalValue).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  },


      fetchBillingDetails(page = 1) {
            this.$api.get(`/fetch-delisted-grantees/${this.billingId}?page=${page}`, {
              params: {
                  hei_id: this.heiId,
              },

                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            })
            .then(res => {
                this.billing_data = res.data.billing;
                // this.grantees_count = res.data.grantees_count;
                this.signatories = res.data.signatories;
                this.grantees = res.data.delisted_grantees;
                this.loading = false;

                console.log(this.grantees);
            });
        },
    },

    mounted() {
      this.fetchBillingId();
        if (this.billingId) {
          this.fetchBillingDetails();
        } else {
          this.loading = false; // Ensure loading stops even if billingId is not found
        }


  }


}
</script>

<style scoped>
@page {
      size: A4 landscape;
      margin: 10mm;
    }

    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    table {
      width: 100%;
      border: 1px solid black;      
      border-collapse: collapse;
      overflow:hidden; 
      word-wrap: normal;
    }

    th, td {
      border: 1px solid black;
      padding: 6px;
      text-align: left;
      font-size: 8px;
    }

    p {
      margin: 0;
      padding: 0;
	  font-size: 9px;
    }

    .flex-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .flex-item {
      margin: 0 10px;
    }
	
	.border-right{
		border-right: hidden;
	}
	.border-left{
		border-left: hidden;
	}
	.border-top{
		border-top: hidden;
	}	
	.border-bottom{
		border-bottom: hidden;
	}	
	.text-center{
		text-align: center;
	}

</style>