<template>
  <div v-if="loading">Loading...</div>
  <div v-else style="padding: 30px">
    <div style="display: flex; justify-content: space-between">
      <h3 style="font-weight: 700; font-size: 10px">
        <span v-if="billing_data.program.batch_type === 'ON-GOING'"
          >CONTINUING</span
        >
        <span v-else>NEW</span>

        TDP Form 3 - Annex 7
      </h3>
      <span style="font-size: 12px; font-style: italic"
        >System Generated Billing Document</span
      >
    </div>

    <img
      :src="billing_data.hei.logo_url"
      alt="logo"
      style="width: 80px; height: 80px; position: absolute; left: 15%; top: 7%"
    />
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
      "
    >
      <div style="text-align: left">
        <div class="centered-text">Republic of the Philippines<br /></div>
        <div class="centered-text">{{ billing_data.hei.hei_name }}<br /></div>
        <div class="centered-text">
          {{ billing_data.hei.municipality }}, {{ billing_data.hei.province }}
        </div>
      </div>
    </div>

    <p style="text-align: right; font-size: 15px">Date: {{ formattedDate }}</p>

    <h2
      style="
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        margin-top: 40px;
      "
    >
      CERTIFICATION OF ENROLLED GRANTEES
    </h2>

    <div style="margin-top: 50px">
      <strong>TO WHOM IT MAY CONCERN:</strong>
      <p style="text-indent: 50px; line-height: 1">
        This is to certify that the total number of TDP grantees grantees by
        campus as shown below, are qualified to avail of the Tulong Dunong
        Program (TDP) program under R.A. No. 10931 also known as Universal
        Access to Quality Tertiary Education (UAQTE) for the
        {{ billing_data.semester.semester }} of Academic Year
        {{ billing_data.schoolyear.school_year }}.
      </p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th width="130">Name of Campus</th>
              <th width="187">
                Number of
                <span v-if="billing_data.program.batch_name === 'CHED-TDP'"
                  >TDP
                </span>
                <span v-else>TES </span> Grantees
              </th>
              <th width="195">
                Number of
                <span v-if="billing_data.program.batch_name === 'CHED-TDP'"
                  >TDP
                </span>
                <span v-else>TES </span> Grantees with TES3-a
              </th>
              <th width="127">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="heiData in grantees" :key="heiData.id">
              <td>{{ heiData.hei.abbr }}</td>
              <td>{{ heiData.grantees_count }}</td>
              <td>0</td>
              <td>{{ heiData.grantees_count }}</td>
            </tr>

            <tr>
              <td colspan="3">Total</td>
              <td>{{ totalGrantees }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style="text-indent: 50px; line-height: 1; margin-top: 30px">
        This further certifies that the student’s information indicated in the
        billing statement of the Masterlist of
        <span v-if="billing_data.program.batch_type === 'ON-GOING'"
          >CONTINUING</span
        >
        <span v-else>NEW</span> TDP Grantees (Annex 6) is accurate and complete.
      </p>

      <p
        style="
          text-indent: 50px;
          line-height: 1;
          margin-top: 30px;
          font-weight: bold;
        "
      >
        This certification is being issued in accordance with the niFAST
        Memorandum Circular (JMC) No. __ Series of 2022, on the Enhanced
        Guidelines of the Tulong Dunong Program (TDP).
      </p>

      <div class="signature-section">
        <div class="signature-block">
          <p style="font-weight: bold; margin-bottom: 50px">Certified By:</p>
          <strong>{{ this.signatories.registrar }}</strong>
          <p style="font-style: italic; line-height: 0.8">School Registrar</p>
          <br /><br />
          <p style="font-weight: bold; margin-bottom: 50px">Approved By:</p>
          <strong>{{ this.signatories.president }}</strong>
          <p style="font-style: italic; line-height: 0.8">
            {{ this.signatories.president_position }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // props: {
  //     billingId: {
  //         required: true,
  //     },
  // },

  data() {
    return {
      billingId: null,
      billing_data: [],
      grantees: [],
      signatories: [],
      loading: true,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "heiId"]),

    TESBenefits() {
      return this.grantees_count * (this.billing_data?.program?.amount || 0);
    },

    ProgramASC() {
      const amount =
        this.grantees_count * (this.billing_data?.program?.amount || 0);
      return amount * (this.billing_data?.program?.asc || 0);
    },

    TotalTESAmount() {
      const amount =
        this.grantees_count * (this.billing_data?.program?.amount || 0);
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
    fetchBillingId() {
      this.billingId = this.$route.query.billingId;
    },

    formatDecimalValue(decimalValue) {
      return Number(decimalValue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    fetchBillingDetails(page = 1) {
      this.loading = true;
      this.$api
        .get(`/fetch-suc-billing-details/${this.billingId}?page=${page}`, {
          params: {
            hei_id: this.heiId,
          },

          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.billing_data = res.data.billing;
          this.grantees = res.data.grouped_grantees;
          this.signatories = res.data.signatories;
          this.loading = false;

          setTimeout(() => {
//            window.print();
          }, 1000);
          window.onafterprint = function () {
            window.close();
          };
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
  },
};
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

th,
td {
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
