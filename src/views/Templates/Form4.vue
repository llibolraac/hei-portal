  <template>

 <div v-if="loading" >
    Loading...
  </div>    
<div v-else style="padding: 50px;">



<div style="display: flex; justify-content: space-between;">
<h2 style="margin-bottom: 60px;">
  Annex 2 - {{ billing_Data.program.batch_name.slice(-3) }} Continuing Form
</h2> 
  <span style="font-size: 12px; font-style: italic;">System Generated Billing Document</span>
</div>


  <img src="/src/assets/unifast.png" alt="logo" style="width: 70px; height: 70px; position: absolute; left: 20%; top: 11.5%;">
<div style="display: flex; align-items: center; justify-content: center; margin-top: 30px;">

  <div style="text-align: left;">
    <div class="centered-text">Republic of the Philippines<br /></div>
    <div class="centered-text">{{ billing_data.hei.hei_name }}<br /></div>
    <div class="centered-text">{{ billing_data.hei.municipality }}, {{ billing_data.hei.province }}</div>
  </div>
</div>


  <p style="text-align: right;">Date: {{ formattedDate }}</p>

  <h2 style="text-align: center; font-weight: bold; font-size: 20px; margin-top: 20px;">CERTIFICATION OF ENROLLED GRANTEES</h2>

  <div style="margin-top: 50px;">
    <strong>TO WHOM IT MAY CONCERN:</strong>
    <p style="text-indent: 50px; line-height: 1;">
      This is to certify that the total number of {{ billing_data.program.batch_type }} TES grantees by campus as shown below,are qualified to avail of the Tertiary Education Subsidy (TES) program under R.A. No. 10931 also known as Universal Access to Quality Tertiary Education (UAQTE) for the {{billing_data.semester.semester }} of Academic Year {{ billing_data.schoolyear.school_year }}.
    </p>

    <div class="table-container">
            <table>Z4
        <thead>
          <tr>
            <th width="130">Name of Campus</th>
            <th width="187">Number of TES Grantees</th>
            <th width="195">Number of TES Grantees with TES3-a</th>
            <th width="127">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>{{ billing_data.hei.abbr }}</td><td>{{ this.grantees_count }}</td><td>0</td><td>{{ this.grantees_count }}</td></tr>

          <tr><td colspan="3">Total</td><td>{{ this.grantees_count }}</td></tr>
        </tbody>
      </table>
    </div>

    <p style="text-indent: 50px; line-height: 1; margin-top: 30px;">
      This further certifies that the student’s information indicated in Annex 2 - TES Continuing Form 2 is accurate and complete.
    </p>

    <p style="text-indent: 50px; line-height: 1; margin-top: 30px; font-weight: bold;">
      This certification is being issued in accordance with the CHED-UniFAST Memorandum Circular No. 01 Series of 2022,
      Amended Tertiary Education Subsidy (TES) Guidelines of 2022.
    </p>

    <div class="signature-section">
      <div class="signature-block">
        <p style="font-weight: bold; margin-bottom: 50px;">Certified By:</p>
        <strong>{{ this.signatories.registrar }}</strong>
        <p style="font-style: italic; line-height: 0.8;">School Registrar</p>
        <br><br>
        <p style="font-weight: bold; margin-bottom: 50px;">Approved By:</p>
        <strong>{{ this.signatories.president }}</strong>
        <p style="font-style: italic; line-height: 0.8;">{{ this.signatories.president_position }}</p>
      </div>
    </div>
  </div>
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
            grantees_count: null,
            signatories: [],
            loading: true,
          };
      },

      computed: {
          ...mapGetters('auth', ['accessToken', 'heiId']),

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
              this.$api.get(`/fetch-billing-details/${this.billingId}?page=${page}`, {
                params: {
                    hei_id: this.heiId,
                },

                  headers: {
                      Authorization: `Bearer ${this.accessToken}`,
                  },
              })
              .then(res => {
                  this.billing_data = res.data.billing;
                  this.grantees_count = res.data.grantees_count;
                  this.signatories = res.data.signatories;
                  this.loading = false;
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
  @media print {
      @page {
        size: A4 landscape;
        margin: 15px;
        /* Ensure no margin is added when printing */
      }

    
    }

      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    .container {
      padding: 30px;
      width: 80%;
      margin: auto;
    }

    .centered-text {
      text-align: center;
      font-weight: bold;
      line-height: 1;
    }

    .table-container {
      text-align: center;
      margin-top: 20px;
    }

    table {
      border-collapse: collapse;
      display: inline-table;
    }

    th, td {
      border: 1px solid #000;
      padding: 5px 10px;
      text-align: center;
    }

    .signature-section {
      margin-top: 40px;
      display: flex;
      justify-content: flex-end;
    }

    .signature-block {
      width: 300px;
    }
  </style>