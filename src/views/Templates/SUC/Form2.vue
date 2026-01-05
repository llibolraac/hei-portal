<template>
  <div v-if="loading">Loading...</div>

  <div id="form2-wrapper" v-else>
    <div style="text-align: right">
      <span style="text-align: right; font-size: 12px; font-style: italic"
        >System Generated Billing Document</span
      >
    </div>
    <table width="200">
      <tbody>
        <tr>
          <td class="border-bottom" colspan="17" style="text-align: right">
            <h3 style="font-weight: 700; font-size: 10px">
              TES
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span>

              Form 2 -

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
          <td colspan="17" class="text-center border-top">
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
          <td
            colspan="15"
            class="border-top border-right"
            style="text-align: right"
          >
            <p>TES Billing Details Reference Number:</p>
          </td>
          <td colspan="2" class="border-top">
            <p>{{ this.billing_data.tes_ref_no }}</p>
          </td>
        </tr>
        <tr>
          <td
            colspan="15"
            class="border-top border-right"
            style="text-align: right"
          >
            <p>Date:</p>
          </td>
          <td colspan="2" class="border-top">
            <p>{{ formattedDate }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <p><strong>INSTRUCTIONS</strong></p>
            <p>
              1. Generate the list of
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span>
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> grantees from the HEI portal. Include only
              in this form the names of
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span> grantees WHO ARE CURRENTLY enrolled this
              semester.
            </p>
            <p>&nbsp;</p>
            <p>
              2. In the table below, list down the names of enrolled
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span>
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> grantees per campus in alphabetical order.
            </p>
            <p>
              if applicable. (1) by campus; (2) by college; (3) by progra; and
              (4) by student name (Last Name, First Name, MI).
            </p>
            <p>&nbsp;</p>
            <p>
              3. Include and update all information required in the space
              provided.
            </p>
            <p>&nbsp;</p>
            <p>
              4. Assign a 5-digit Control Number for each enrolled student. The
              control number should be assigned in chronological order to the
              students listed according to the instruction no. 2.
            </p>
            <p>&nbsp;</p>
            <p>
              5.Submit pdf files of the Certificate of Registration (COR) of
              Official Enrollment in the
              {{ this.billing_data.semester.semester }} of Academic Year
              {{ this.billing_data.schoolyear.school_year }} in the order as it
              appears in the
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span>
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span> Form 2.
            </p>
          </td>
          <td colspan="10" style="vertical-align: top" class="border-right">
            <p>
              6. Submit the Notarized Registrar's Certification of
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> Grantees, as an endorsement document, for
              all the PDF files of the CORs submitted.
            </p>
            <p>
              7. Submit electronic and hard copies of the following forms to
              CHEDRO as supporting documents:
            </p>
            <ul>
              <li>
                <p>
                  7.1
                  <span
                    v-if="
                      billing_data.program.program_name ===
                      'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                    "
                    >TES-TDP</span
                  >
                  <span v-else>TES</span>
                  <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                    >CONTINUING</span
                  >
                  <span v-else>NEW</span> Form 1
                </p>
              </li>
              <li>
                <p>
                  7.2
                  <span
                    v-if="
                      billing_data.program.program_name ===
                      'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                    "
                    >TES-TDP</span
                  >
                  <span v-else>TES</span>
                  <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                    >CONTINUING</span
                  >
                  <span v-else>NEW</span> Form 2
                </p>
              </li>
              <li>
                <p>
                  7.3
                  <span
                    v-if="
                      billing_data.program.program_name ===
                      'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                    "
                    >TES-TDP</span
                  >
                  <span v-else>TES</span>
                  <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                    >CONTINUING</span
                  >
                  <span v-else>NEW</span> Form 3
                </p>
              </li>
              <li>
                <p>7.4 Notarized Registrar's Certifiication</p>
              </li>
            </ul>
            <p></p>
          </td>
          <td colspan="2"><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td colspan="17">
            <p>TO: <strong>CHED - Regional Office CARAGA</strong></p>
          </td>
        </tr>
        <tr>
          <td colspan="17">
            <p>Address: <strong>Address of CHED Regional Office</strong></p>
          </td>
        </tr>
        <tr>
          <td width="4%" rowspan="3"><p>&nbsp;</p></td>
          <td colspan="16">
            <p>
              <strong
                >TES
                <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                  >CONTINUING</span
                >
                <span v-else>NEW</span> Grantees Details:</strong
              >
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="16">
            <p>
              <strong>
                <span
                  v-if="
                    billing_data.program.program_name ===
                    'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                  "
                  >TES-TDP</span
                >
                <span v-else>TES</span> will have to be listed and tabulated PER
                CAMPUS. </strong
              >The Total Number of
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> grantees for all
            </p>
            <p>
              campuses should tally with the total number of
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span> in the Annex 2-
              <span
                v-if="
                  billing_data.program.program_name ===
                  'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                "
                >TES-TDP</span
              >
              <span v-else>TES</span>
              <span v-if="billing_data.program.batch_type === 'ON-GOING'"
                >CONTINUING</span
              >
              <span v-else>NEW</span> Form 1
            </p>
            <p>Note: Please insert additional line as needed</p>
          </td>
        </tr>
        <tr>
          <td colspan="16">
            <p>
              <strong
                >Tertiary Education Subsidy: Based on Section 23 of Rule IV of
                IRR of R.A. No. 10931</strong
              >
            </p>
          </td>
        </tr>
        <tr>
          <td><p>&nbsp;</p></td>
          <td width="5%"><p>&nbsp;</p></td>
          <td width="9%"><p>&nbsp;</p></td>
          <td colspan="3">
            <p><strong>Student's Name</strong></p>
          </td>
          <td colspan="5">
            <p><strong>Student Profile</strong></p>
          </td>
          <td colspan="3">
            <p><strong>Contact Information</strong></p>
          </td>
          <td width="5%">
            <p><strong>TES Benefits</strong></p>
          </td>
          <td width="3%">
            <p><strong>TES-3a</strong></p>
          </td>
          <td width="6%"><p>&nbsp;</p></td>
        </tr>

        <tr>
          <td colspan="16">
            <p>HEI Campus Name</p>
          </td>
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
          <td width="6%">
            <p>Academic Units Enrolled (Credit and non-credit courses)</p>
          </td>
          <td width="3%"><p>ZIP code</p></td>
          <td width="4%"><p>Email Address</p></td>
          <td width="5%"><p>Phone Number</p></td>
          <td><p>Amount</p></td>
          <td><p>Person with Disability</p></td>
          <td>
            <p><strong>TOTAL AMOUNT</strong></p>
          </td>
        </tr>

        <template v-for="heiData in grantees" :key="heiData.hei.id">
          <!-- HEI NAME ROW -->
          <tr>
            <td
              colspan="17"
              style="font-weight: bold; background-color: #f3f4f6"
            >
              {{ heiData.hei.hei_name }}
            </td>
          </tr>

          <!-- GRANTEES ROWS -->
          <tr v-for="(grantee, i) in heiData.grantees" :key="grantee.id">
            <td>
              <p>{{ String(i + 1).padStart(5, "0") }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.student_number }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.award_no }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.lastname }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.firstname }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.middlename }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.sex }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.birthdate }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.course_program }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.year_level }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.academic_units }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.zip_code }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.email_address }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.contact_number }}</p>
            </td>
            <td>
              <p>{{ formatDecimalValue(billing_data.program.amount) }}</p>
            </td>
            <td>
              <p>{{ grantee.grantees.is_pwd ? "Yes" : "No" }}</p>
            </td>
            <td>
              <p>{{ formatDecimalValue(billing_data.program.amount) }}</p>
            </td>
          </tr>

          <tr>
            <td
              colspan="17"
              style="
                font-weight: bold;
                background-color: #f3f4f6;
                text-align: right;
              "
            >
              <!-- const amount = this.billing_data.program.amount * heiData.grantees.length;
      const program_oc = amount * this.billing_data.program.asc; -->
              Total Tertiary Education Subsidy:
              {{
                formatDecimalValue(
                  this.billing_data.program.amount * heiData.grantees.length
                )
              }}
            </td>
          </tr>

          <tr>
            <td
              colspan="17"
              style="
                font-weight: bold;
                background-color: #f3f4f6;
                text-align: right;
              "
            >
              Add 1 percent (1%)
              <span v-if="this.billing_data.schoolyear.id >= 3"
                >Management Fee</span
              >
              <span v-else>Administrative Support </span> for Partner
              Instsitutions:
              {{
                formatDecimalValue(
                  this.billing_data.program.amount *
                    heiData.grantees.length *
                    this.billing_data.program.asc
                )
              }}
            </td>
          </tr>

          <tr>
            <td
              colspan="17"
              style="
                font-weight: bold;
                background-color: #f3f4f6;
                text-align: right;
              "
            >
              Total Amount:
              {{ subTotalAmount(heiData) }}
            </td>
          </tr>
        </template>

        <!-- <tr v-for="(grantee, i) in grantees" :key="grantee.id">
          <td>
            <p>{{ String(i + 1).padStart(5, "0") }}</p>
          </td>
          <td>
            <p>{{ grantee.grantees.student_number }}</p>
          </td>
          <td>
            <p>{{ grantee.grantees.award_no }}</p>
          </td>
          <td>
            <p
              style="
                max-width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ grantee.grantees.lastname }}
            </p>
          </td>
          <td>
            <p
              style="
                max-width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ grantee.grantees.firstname }}
            </p>
          </td>
          <td>
            <p
              style="
                max-width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ grantee.grantees.middlename }}
            </p>
          </td>
          <td>
            <p>{{ grantee.grantees.sex }}</p>
          </td>
          <td><p></p></td>
          <td>
            <p>{{ grantee.grantees.course_program }}</p>
          </td>
          <td>
            <p>{{ grantee.grantees.year_level }}</p>
          </td>
          <td><p></p></td>
          <td>
            <p>{{ grantee.grantees.zip_code }}</p>
          </td>
          <td>
            <p>{{ grantee.grantees.email_address }}</p>
          </td>
          <td>
            <p>{{ grantee.grantees.contact_number }}</p>
          </td>
          <td>
            <p>{{ formatDecimalValue(billing_data.program.amount) }}</p>
          </td>
          <td><p>&nbsp;</p></td>
          <td>
            <p>{{ formatDecimalValue(billing_data.program.amount) }}</p>
          </td>
        </tr> -->

        <tr>
          <td colspan="16"><p>Page Total</p></td>
          <td><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td colspan="16"><p>Page Accumulated Total</p></td>
          <td><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td colspan="16">
            <p><strong>TOTAL TERTIARY EDUCATION SUBSIDY</strong></p>
          </td>
          <td>
            <p>{{ formatDecimalValue(billing_data.amount) }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="16">
            <p>
              Add 1 percent (1%)
              <span v-if="this.billing_data.schoolyear.id >= 3"
                >Management Fee</span
              >
              <span v-else>Administrative Support </span> for Partner
              Instsitutions
            </p>
          </td>
          <td>
            <p>{{ formatDecimalValue(billing_data.program_oc) }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="16">
            <p>
              <strong
                >TOTAL
                <span
                  v-if="
                    billing_data.program.program_name ===
                    'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                  "
                  >TES-TDP</span
                >
                <span v-else>TES</span> BILLING PER CAMPUS</strong
              >
            </p>
          </td>
          <td><p>&nbsp;</p></td>
        </tr>
        <tr>
          <td colspan="16">
            <p>
              <strong
                >TOTAL
                <span
                  v-if="
                    billing_data.program.program_name ===
                    'Tertiary Education Subsidy - Tulong Dunong Program (TES-TDP)'
                  "
                  >TES-TDP</span
                >
                <span v-else>TES</span> BILLING ALL CAMPUSES</strong
              >
            </p>
          </td>
          <td>
            <p>{{ formatDecimalValue(billing_data.total_amount) }}</p>
          </td>
        </tr>
        <tr style="margin-top: 15px">
          <td class="border-left border-bottom" colspan="3">
            <p>Prepared By:</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p style="font-size: 11px; font-weight: bold">
              {{ this.signatories.form2_tes_focal }}
            </p>
            <p>{{ this.signatories.form2_tes_focal_position }}</p>
          </td>
          <td class="border-left border-bottom" colspan="2">
            <p>Certified by (As to correctness of enrollment data):</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p style="font-size: 11px; font-weight: bold">
              {{ this.signatories.form2_registrar }}
            </p>
            <p>{{ this.signatories.form2_registrar_position }}</p>
          </td>
          <td class="border-left border-bottom" colspan="3">
            <p>Certified by (as to correctness of financial data):</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p style="font-size: 11px; font-weight: bold">
              {{ this.signatories.form2_accountant }}
            </p>
            <p>{{ this.signatories.form2_accountant_position }}</p>
          </td>
          <td class="border-left border-bottom border-right" colspan="3">
            <p>Approved by:</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p style="font-size: 11px; font-weight: bold">
              {{ this.signatories.president }}
            </p>
            <p>{{ this.signatories.president_position }}</p>
          </td>

          <td class="border-left border-bottom border-right"></td>

          <td class="border-left border-bottom border-right"></td>

          <td class="border-left border-bottom border-right"></td>
          <td class="border-left border-bottom border-right"></td>
          <td class="border-left border-bottom border-right"></td>
          <td class="border-left border-bottom border-right"></td>
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
      grantees: [],
      grantees_count: null,
      signatories: [],
      loading: true,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "heiId", "userName"]),

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
    subTotalAmount(heiData) {
      const amount = this.billing_data.program.amount * heiData.grantees.length;
      const program_oc = amount * this.billing_data.program.asc;

      return this.formatDecimalValue(amount + program_oc);
    },

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
        .get(`/fetch-suc-billing-grantees/${this.billingId}?page=${page}`, {
          params: {
            hei_id: this.heiId,
          },

          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.billing_data = res.data.billing;
          // this.grantees_count = res.data.grantees_count;
          this.signatories = res.data.signatories;
          this.grantees = res.data.grouped_grantees;
          console.log(this.grantees);
          this.loading = false;

          setTimeout(() => {
            // window.print();
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
  width: 98%;
  border: 1px solid black;
  border-collapse: collapse;
  overflow: hidden;
  word-wrap: normal;
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
.text-center {
  text-align: center;
}
</style>
