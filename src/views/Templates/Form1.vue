<template>
  <div v-if="loading">Loading...</div>

  <div v-else>
    <div style="text-align: right">
      <span style="text-align: right; font-size: 12px; font-style: italic"
        >System Generated Billing Document</span
      >
    </div>

    <table width="80%">
      <tbody>
        <tr>
          <td
            height="3"
            colspan="6"
            style="text-align: right; border-bottom: hidden"
          >
            <h3 style="font-weight: 700; font-size: 10px">
              TES
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span>

              Form 1 -

              <span
                v-if="
                  billing_data.program.batch_type === 'ON-GOING' &&
                  billing_data.program.program_name ===
                    'Tertiary Education Subsidy (TES)'
                "
              >
                ANNEX 2
              </span>

              <span
                v-if="
                  billing_data.program.batch_type === 'NEW' &&
                  billing_data.program.program_name ===
                    'Tertiary Education Subsidy (TES)'
                "
              >
                ANNEX 5
              </span>

              <span
                v-if="
                  billing_data.program.batch_type === 'ON-GOING' &&
                  billing_data.program.program_name ===
                    'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
              >
                ANNEX 5
              </span>

              <span
                v-if="
                  billing_data.program.batch_type === 'NEW' &&
                  billing_data.program.program_name ===
                    'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
              >
                ANNEX 7
              </span>
            </h3>
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-center border-bottom border-top">
            <div class="flex-container">
              <div class="flex-item">
                <img
                  src="/src/assets/unifast.png"
                  alt="logo"
                  style="width: 50px; height: 50px"
                />
              </div>
              <div class="flex-item" style="text-align: center">
                <p>Republic of the Philippines</p>
                <p>
                  <strong>{{ this.billing_data.hei.hei_name }}</strong>
                </p>
                <p>
                  {{ this.billing_data.hei.municipality }},
                  {{ this.billing_data.hei.province }}
                </p>
                <p style="font-size: 17px; font-weight: bold">
                  CONSOLIDATED
                  <span
                    v-if="
                      billing_data.program.program_name ===
                      'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                    "
                    >TES-TDP</span
                  >
                  <span v-else>TES</span> BILLING STATEMENT
                </p>
              </div>

              <div class="flex-item">
                <img
                  src="/src/assets/chedlogo.png"
                  alt="logo"
                  style="width: 50px; height: 50px"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: right" class="border-right">
            <p>TDP Billing Statement Reference No.:</p>
          </td>
          <td style="text-align: left" class="border-bottom">
            <p>CARAGA-BGFC-2024-1-1</p>
          </td>
        </tr>
        <tr>
          <td
            colspan="5"
            style="text-align: right"
            class="border-top border-right"
          >
            <p>Date:</p>
          </td>
          <td>
            <p>{{ formattedDate }}</p>
          </td>
        </tr>
        <tr>
          <td><p>To</p></td>
          <td colspan="5"><p>CHED - Regional Office CARAGA</p></td>
        </tr>

        <tr>
          <td><p>Address</p></td>
          <td colspan="5"><p>CSU Main, Ampayon, Butuan City</p></td>
        </tr>

        <tr>
          <td rowspan="11" style="vertical-align: top">
            <p>Responsibility Center</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </td>
          <td colspan="3" class="border-bottom">
            <p>CHED - Regional Office CARAGA<br /></p>
          </td>
          <td class="border-bottom"><p>Account Code</p></td>
          <td class="border-bottom"><p>Amouunt</p></td>
        </tr>
        <tr>
          <td height="10" colspan="3" style="vertical-align: top">
            <p style="font-size: 9px; line-height: 1.3">
              Request for payment of the Tertiary Education Subsidy (TES) grant
              for ({{ this.billing_data.semester.semester }}), Academic Year
              {{ this.billing_data.schoolyear.school_year }} to be charged
              against the funds for Universal Access to Quality Tertiary
              Education (UAQTE) under General Appropriation Act (GAA) for Fiscal
              Year 2025, as per attached supporting documents ……..
            </p>
          </td>
          <td><p>&nbsp;</p></td>
          <td>
            <p>PhP {{ TotalTESAmount.toLocaleString() }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="border-bottom">
            <p>
              Total Number of
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> student-grantee in the Higher Education
              Institution (HEI) : {{ this.grantees_count }}
            </p>
          </td>
          <td><p>&nbsp;</p></td>
          <td class="border-bottom"><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td width="30"><p>&nbsp;</p></td>
          <td colspan="2" class="border-left">
            <p>
              <strong>TES Benefits</strong> for all the TES
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>TES</span> grantees enrolled in the HEI
            </p>
          </td>
          <td>
            <p>Php {{ formatDecimalValue(TESBenefits) }}</p>
          </td>
          <td class="border-bottom"><p></p></td>
        </tr>

        <tr>
          <td class="border-top"><p></p></td>
          <td colspan="2" class="border-left border-top">
            <p v-if="billing_data.program.batch_type === 'NEW'">
              <strong>TES-3a </strong>for all TES
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span> grantees with disability enrolled in the
              HEI
            </p>
          </td>
          <td><p>PhP</p></td>
          <td class="border-bottom"><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td colspan="3" class="border-top border-bottom">
            <p>Total Amount</p>
          </td>
          <td><p>PhP</p></td>
          <td class="border-bottom"><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td class="border-bottom"><p>&nbsp;</p></td>
          <td colspan="2" class="border-left border-bottom">
            <p>
              Add: 1 percent (1%)
              <span
                v-if="
                  [1, 2].includes(billing_data.schoolyear.id) &&
                  [1, 2].includes(billing_data.semester.id)
                "
              >
                Administrative Support Cost (ASC)
              </span>
              <span v-else>Management Fee</span>

              for partner HEI
            </p>
          </td>
          <td>
            <p>PhP {{ formatDecimalValue(ProgramASC) }}</p>
          </td>
          <td class="border-bottom"><p></p></td>
        </tr>
        <tr>
          <td colspan="3">
            <p>
              TOTAL:
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> Billing Amount
            </p>
          </td>
          <td width="150"><p>PhP</p></td>
          <td width="450">
            <p>PhP {{ TotalTESAmount.toLocaleString() }}</p>
          </td>
        </tr>

        <tr>
          <td colspan="3" rowspan="3" style="vertical-align: top">
            <p>
              Basis for the Tertiary Education Subsidy: Section 23, Rule IV, IRR
              of R.A. No. 10931
            </p>
          </td>
          <td colspan="2">
            <p>Action to be taken (To be approved by CHEDRO)</p>
          </td>
        </tr>
        <tr>
          <td height="30"><p>PhP</p></td>
          <td style="vertical-align: top">
            <p>Excess (deficient) billing noted for further action</p>
          </td>
        </tr>
        <tr>
          <td height="30"><p>PhP</p></td>
          <td height="30" style="vertical-align: top">
            <p>Approved for payment</p>
          </td>
        </tr>
        <tr>
          <td colspan="3"><p>Certified</p></td>
          <td colspan="3"><p>Approved</p></td>
        </tr>
        <tr>
          <td colspan="3" style="vertical-align: top">
            <p>
              Supporting Documents Complete and amount claimed proper. <br />
              is this the last batch of Billing for this term of AY
              {{ this.billing_data.schoolyear.school_year }} ? <br />
              ☐ YES ☐ NO
            </p>
          </td>
          <td colspan="3"><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td colspan="2" height="30"><p>Signature</p></td>
          <td width="791"><p></p></td>
          <td width="180" height="30"><p>Signature</p></td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2"><p>Printed Name</p></td>
          <td style="text-align: center">
            <p style="font-weight: bold">{{ this.signatories.finance_head }}</p>
          </td>
          <td><p>Printed Name</p></td>
          <td colspan="2" style="text-align: center">
            <p style="font-weight: bold">{{ this.signatories.president }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2" rowspan="2" height="10"><p>Position</p></td>
          <td style="text-align: center">Finance Head</td>
          <td rowspan="2" height="10"><p>Position</p></td>
          <td colspan="2" style="text-align: center">
            {{ this.signatories.president_position }}
          </td>
        </tr>
        <tr>
          <td style="text-align: center">
            Head, Accounting/Authorized Representative
          </td>
          <td colspan="2" style="text-align: center">
            President/Authorized Representative
          </td>
        </tr>
        <tr>
          <td colspan="2"><p>Date</p></td>
          <td></td>
          <td><p>Date</p></td>
          <td colspan="2">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td colspan="3" style="vertical-align: top">
            <p>INSTRUCTIONS:</p>
            <p>
              1. The HEIs are allowed a maximum of two (2) tranches of payments
              per semester.
            </p>
            <p>
              2. the
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> statement reference number shall
              compromise of the Regional Code (2-digit). HEII CODE (alpha
              codes), ACADEMIC YEAR (4-digit), TERM 1(1-digit). and BATCH NUMBER
              (1 digit). The description and codes are provided below:
            </p>
            <div style="clear: both"></div>
            <p>
              &quot;HEI Code&quot; shall be the Acronym used by the HEI for its
              institution <br />
              e.g. Jose Rizal University - JRU
            </p>
            <p>
              &quot;Academic Year&quot; the year when the AY began (e.g. 2020
              for AY 2020-2021)
            </p>
          </td>
          <td colspan="3" style="vertical-align: top">
            <p>&quot;Term refers to the academic year semester or terms:</p>
            <table>
              <tbody>
                <tr>
                  <td><p>Term</p></td>
                  <td><p>Code</p></td>
                  <td><p>Term</p></td>
                  <td><p>Code</p></td>
                </tr>
                <tr>
                  <td><p>1st Semester</p></td>
                  <td><p>1</p></td>
                  <td><p>3rd Semester</p></td>
                  <td><p>3</p></td>
                </tr>
                <tr>
                  <td><p>2nd Semester</p></td>
                  <td><p>2</p></td>
                  <td><p>Summer</p></td>
                  <td><p>3</p></td>
                </tr>
              </tbody>
            </table>
            <p>
              &quot;Batch&quot; refers to the number of times HEI bills the CHED
              within a semester. <br />
              <strong
                >Note that the HEIs can only bill the CHED up to two(2) batches
                per semester</strong
              >
            </p>
            <p>&nbsp;</p>
            <p>
              <strong>Example of A Billing Statement No.</strong> <br />
              The first batch of
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> statement submitted by JRU in 1st sem AQY
              2020-2021:
            </p>
            <p>
              <br />
              The second batch of
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> Statement submitted by Jose Rizal
              University in the First Semester for AY 2020 - 2021
              NCR-JRU-2020-1-1
            </p>

            <p>
              3. Submit A printed copy of complete
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> Statement Form (Form 1) including other
              required documents and a cover letter address to:
            </p>
            <p>&nbsp;</p>
            <p>
              <strong>Dr. Nelia A. Alibin, PhD </strong><br />
              Regional Director <br />
              Commission on Higher Education - Caraga Region
            </p>
            <p></p>
            <p>&nbsp;</p>
          </td>
        </tr>
      </tbody>
    </table>
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
      grantees_count: null,
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
      this.$api
        .get(`/fetch-billing-details/${this.billingId}?page=${page}`, {
          params: {
            hei_id: this.heiId,
          },

          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
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
  },
};
</script>

<style scoped>
@media print {
  @page {
    size: A4 portrait;
    margin: 15mm;
  }
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
}

th,
td {
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

.border-right {
  border-right: hidden;
}
.border-left {
  border-left: hidden;
}
.border-top {
  border-top: hidden;
}
.border-bottom {
  border-bottom: hidden;
}
</style>
