<template>
  <div
    class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
    role="alert"
  >
    <span class="font-medium">Instructions:</span> Please ensure that the
    grantee's profile — including Student Number, Contact Number, Zip Code, and
    Email Address — is updated before generating a billing document to
    facilitate a smooth process.
  </div>

<!-- Missing Submission Alert -->
<div
  v-if="no_submission.length > 0"
  class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
  role="alert"
>
  <span class="font-medium">Some submissions are missing:</span>

  <div
    v-for="(batch, index) in no_submission"
    :key="index"
    class="mt-3"
  >


    <ul class="mt-2 list-disc list-inside">
      <li
        v-for="(hei, i) in batch.missing_heis"
        :key="i"
      >
        {{ hei }}
      </li>
    </ul>
  </div>
</div>



  <div class="w-full">
    <!-- Program Selection -->
    <div class="w-full">
      <label
        for="program"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select Program
      </label>
      <select
        v-model="programId"
        id="program"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :disabled="isLoading"
        @change="fetchBillings"
      >
        <option value="">Select a Program</option>
        <option
          v-for="program in programs"
          :key="program.id"
          :value="program.id"
        >
          ID: {{ program.id }} {{ program.grant }} | Batch
          {{ program.batch_no }} ({{ program.batch_type }})
        </option>
      </select>
    </div>

    <!-- Billings Table -->
    <div class="relative overflow-x-autosm:rounded-lg">
      <div v-if="isLoading" class="p-4 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"
        ></div>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Loading billings...</p>
      </div>

      <div
        v-else-if="billings.length === 0"
        class="p-6 text-center text-gray-500 dark:text-gray-400"
      >
        <p>No billings found for the selected program.</p>
      </div>

      <table
        v-else
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">No.</th>
            <th scope="col" class="px-6 py-3">Higher Education Institution</th>
            <th scope="col" class="px-6 py-3">Date Generated</th>
            <th scope="col" class="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(billing, i) in billings"
            :key="billing.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ i + 1 }}
            </td>
            <td class="px-6 py-4">
              {{ billing.hei_name }}
            </td>
            <td class="px-6 py-4">
              {{ formatDate(billing.billing_created_at) || "Not generated" }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="{
                  'bg-green-100 text-green-800': billing.has_prepared_billing,
                  'bg-yellow-100 text-yellow-800':
                    !billing.has_prepared_billing,
                }"
                class="text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {{ billing.has_prepared_billing ? "Generated" : "Pending" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="billings.length > 0" class="mt-4 flex justify-end">
      <div class="flex gap-2">
        <button
          @click="generateVoucher"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-lg text-sm"
        >
          Generate SUC Voucher
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GenerateSUCVoucher",
  props: {
    semesterId: {
      type: String,
      required: true,
    },
    schoolYearId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      programs: [],
      programId: "",
      billings: [],
      isLoading: false,
      isGenerating: false,
      no_submission: [],
    };
  },

  methods: {
    formatDate(dateString) {
      if (!dateString) return "";
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },

    async fetchPrograms() {
      this.isLoading = true;
      try {
        const res = await this.$api.get(`/suc/suc-programs`, {
          params: {
            school_year_id: this.schoolYearId,
            semester_id: this.semesterId,
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.programs = res.data.data;
      } catch (error) {
        console.error("Error fetching programs:", error);
        this.$toast.error("Failed to load programs. Please try again.");
      } finally {
        this.isLoading = false;
      }
    },

    async fetchBillings() {
      if (!this.programId) return;

      this.isLoading = true;
      try {
        const res = await this.$api.get(`/suc/suc-vouchers`, {
          params: {
            school_year_id: this.schoolYearId,
            semester_id: this.semesterId,
            program_id: this.programId,
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.billings = res.data.data;
      } catch (error) {
        console.error("Error fetching billings:", error);
        this.$toast.error("Failed to load billings. Please try again.");
      } finally {
        this.isLoading = false;
      }
    },

    async generateVoucher(billing) {
      if (!confirm(`Generate Consolidated Voucher?`)) return;

      this.isGenerating = true;
      try {
        const res =await this.$api.post(
          "/suc/gen-voucher",
          {
            program_id: this.programId,
            school_year_id: this.schoolYearId,
            semester_id: this.semesterId,
          },
          {
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        if(res.data.success) {
        this.$toast.success("Voucher generated successfully!");
        window.location.reload();
        }else{
        this.no_submission = res.data.missing_submissions

        }
        
        
      } catch (error) {
        console.error("Error generating voucher:", error);
        this.$toast.error("Failed to generate voucher. Please try again.");
      } finally {
        this.isGenerating = false;
      }
    },

    async downloadVoucher(billing) {
      try {
        const response = await this.$api.get(
          `/suc/download-voucher/${billing.id}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `voucher-${billing.hei_name}-${
            new Date().toISOString().split("T")[0]
          }.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error downloading voucher:", error);
        this.$toast.error("Failed to download voucher. Please try again.");
      }
    },
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "userType", "userId", "userName"]),
  },

  mounted() {
    this.fetchPrograms();
  },
};
</script>
