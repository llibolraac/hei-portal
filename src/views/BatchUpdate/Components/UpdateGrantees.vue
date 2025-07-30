<template>
  <div v-if="loading" class="flex items-center justify-center mb-3">
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else>
    <div
      class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <span class="font-medium">Important Instructions:</span> Please be
      informed that you are <strong>not allowed to tamper</strong> with the
      generated template in any way, including changing the
      <strong>data types</strong> of the cells. The file must remain in
      <strong>CSV format</strong>, exactly as it was when downloaded. You are
      only required to fill in the
      <strong>
        Zip Code, Email Address, and Contact Number for each grantee.</strong
      ><br />
      <br />

      If you need to change any details related to the grantee's name, please
      coordinate with your respective UniFAST Regional Coordinator assigned to
      your institution.
    </div>

    <div
      v-if="validationErrors.length"
      class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
    >
      <h3 class="font-semibold">Validation Errors:</h3>
      <ul class="list-disc pl-5 mt-2">
        <li v-for="(error, index) in validationErrors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="uploadTemplate">
      <label
        for="schoolYearSelect"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >School Year</label
      >
      <select
        @change="handleSchoolYearChange"
        v-model="selectedsy"
        id="schoolYearSelect"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option :value="null">Select School Year</option>
        <option
          v-for="schoolyear in schoolyears"
          :key="schoolyear.id"
          :value="schoolyear"
        >
          {{ schoolyear.school_year }}
        </option>
      </select>

      <label
        for="semesterSelect"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Semester</label
      >
      <select
        @change="handleSemesterChange"
        v-model="selectedsem"
        id="semesterSelect"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      >
        <option :value="null">Select Semester</option>
        <option
          v-for="semester in semesters"
          :key="semester.id"
          :value="semester"
        >
          {{ semester.semester }}
        </option>
      </select>

      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="file_input"
        >Upload file</label
      >
      <input
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        @change="handleFileChange"
        ref="fileInput"
        accept=".csv"
      />
      <p
        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        CSV files only.
      </p>

      <button
        type="submit"
        :disabled="!isFileValid"
        class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Upload File
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Papa from "papaparse";

export default {
  components: {},

  data() {
    return {
      selectedsem: null,
      selectedsy: null,
      semesters: [],
      schoolyears: [],
      // These are likely redundant if selectedsy/sem hold the objects
      // schoolyear: null,
      // semester: null,
      programs: [],
      loading: true,
      program_id: null,
      selectedFile: null,
      validationErrors: [],
      isFileValid: false, // Ensure this is initialized
    };
  },

  computed: {
    ...mapGetters("auth", [
      "accessToken",
      "userType",
      "userId",
      "userName",
      "heiId",
    ]),
  },

  methods: {
    handleSchoolYearChange() {
      // Console log for debugging, now safe with null check
      console.log(
        "Selected School Year:",
        this.selectedsy ? this.selectedsy.id : null
      );
      // If changing SY should update programs, call fetchPrograms here
      if (this.selectedsy && this.selectedsem) {
        this.fetchPrograms();
      }

      console.log(this.selectedsy);
      // Also, clear file input and reset validation if SY/Sem changes after file selection
      this.resetFileInputAndValidation();
    },
    handleSemesterChange() {
      // Console log for debugging, now safe with null check
      console.log(
        "Selected Semester:",
        this.selectedsem ? this.selectedsem.id : null
      );
      // If changing Semester should update programs, call fetchPrograms here
      if (this.selectedsy && this.selectedsem) {
        this.fetchPrograms();
      }
      // Also, clear file input and reset validation if SY/Sem changes after file selection
      this.resetFileInputAndValidation();
    },

    handleFileChange(event) {
      const file = event?.target?.files?.[0];
      this.validationErrors = [];
      this.selectedFile = null;
      this.isFileValid = false;

      const selectedSy = this.selectedsy?.school_year;
      const selectedSem = this.selectedsem?.semester;

      if (!selectedSy || !selectedSem) {
        this.validationErrors.push(
          "Please select a School Year and Semester from the form dropdowns before uploading the file."
        );
        this.$refs.fileInput.value = "";
        return;
      }

      if (!file) {
        this.validationErrors.push("No file selected.");
        return;
      }

      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        this.validationErrors.push(
          "Invalid file type. Please upload a CSV file."
        );
        this.$refs.fileInput.value = "";
        return;
      }

      this.selectedFile = file;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data;
          const tempErrors = [];
          const processedRows = [];

          if (rows.length === 0) {
            tempErrors.push(
              "The selected CSV file is empty or contains no valid data rows."
            );
            this.validationErrors = tempErrors;
            this.isFileValid = false;
            this.$refs.fileInput.value = "";
            return;
          }

          rows.forEach((row, index) => {
            const rowNumber = index + 2;
            let currentRowHasErrors = false;

            // ✅ Match "School Year" and "Semester" column names
            if (!row["School Year"]) {
              tempErrors.push(`Row ${rowNumber}: "School Year" is missing.`);
              currentRowHasErrors = true;
            } else if (row["School Year"].trim() !== selectedSy) {
              tempErrors.push(
                `Row ${rowNumber}: "School Year" must be "${selectedSy}".`
              );
              currentRowHasErrors = true;
            }

            if (!row["Semester"]) {
              tempErrors.push(`Row ${rowNumber}: "Semester" is missing.`);
              currentRowHasErrors = true;
            } else if (row["Semester"].trim() !== selectedSem) {
              tempErrors.push(
                `Row ${rowNumber}: "Semester" must be "${selectedSem}".`
              );
              currentRowHasErrors = true;
            }

            // 👇 Other required field validations
            if (!row.student_number) {
              tempErrors.push(`Row ${rowNumber}: Student number is required.`);
              currentRowHasErrors = true;
            }

            if (!row.zip_code) {
              tempErrors.push(`Row ${rowNumber}: ZIP code is required.`);
              currentRowHasErrors = true;
            } else if (!/^\d{4}$/.test(row.zip_code)) {
              tempErrors.push(
                `Row ${rowNumber}: ZIP code must be exactly 4 digits.`
              );
              currentRowHasErrors = true;
            }

            if (!row.email_address) {
              tempErrors.push(`Row ${rowNumber}: Email address is required.`);
              currentRowHasErrors = true;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email_address)) {
              tempErrors.push(`Row ${rowNumber}: Invalid email format.`);
              currentRowHasErrors = true;
            }

            if (!row.contact_number) {
              tempErrors.push(`Row ${rowNumber}: Contact number is required.`);
              currentRowHasErrors = true;
            }

            if (!currentRowHasErrors) {
              processedRows.push(row);
            }
          });

          this.validationErrors = tempErrors;
          this.isFileValid = tempErrors.length === 0;

          if (!this.isFileValid) {
            console.error("Validation errors:", this.validationErrors);
            this.$refs.fileInput.value = "";
          } else {
            console.log("CSV file is valid. Processed rows:", processedRows);
          }
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          this.validationErrors.push(
            `Error parsing file: ${err.message || "Invalid CSV format."}`
          );
          this.isFileValid = false;
          this.$refs.fileInput.value = "";
        },
      });
    },

    async uploadTemplate() {
      if (this.validationErrors.length) {
        alert("Please fix the validation errors before uploading.");
        return;
      }

      if (!this.selectedFile) {
        this.$toast.error("No file selected for upload.");
        return;
      }

      if (
        window.confirm(
          "Are you sure to upload this file? This action is irreversible."
        )
      ) {
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        formData.append("school_year_id", this.selectedsy.id);
        formData.append("semester_id", this.selectedsem.id);
        formData.append("hei_id", this.heiId);

        try {
          await this.$api.post("/grantees/batch-update", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.accessToken}`,
            },
          });
          this.$toast.success("Batch update Successful!");
        } catch (e) {
          if (e.response?.data?.errors) {
            console.error("Validation errors:", e.response.data.errors);
            alert("Some rows failed. Check console for details.");
          } else {
            console.error("Upload failed:", e);
            alert("Upload failed. Try again.");
          }
        }
      }
    },

    fetchPrograms(page = 1) {
      // Ensure selectedsy and selectedsem are valid objects with IDs before fetching programs
      if (
        !this.selectedsy ||
        !this.selectedsem ||
        !this.selectedsy.id ||
        !this.selectedsem.id
      ) {
        console.warn(
          "School year or semester not fully selected, cannot fetch programs."
        );
        return;
      }

      this.$api
        .get(`/get-programs/${this.heiId}?page=${page}`, {
          params: {
            sy: this.selectedsy.id, // Correct: send the ID
            sem: this.selectedsem.id, // Correct: send the ID
          },
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .then((res) => {
          this.programs = res.data.programs;
        })
        .catch((error) => {
          console.error("Error fetching programs:", error);
        });
    },

    async sysem() {
      this.loading = true;
      try {
        const res = await this.$api.get(`/sy-sem`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        this.semesters = res.data.semesters;
        this.schoolyears = res.data.school_years;

        // Set default selected values (first available object)
        if (this.schoolyears.length > 0 && !this.selectedsy) {
          this.selectedsy = this.schoolyears[0];
        }
        if (this.semesters.length > 0 && !this.selectedsem) {
          this.selectedsem = this.semesters[0];
        }

        // Only fetch programs if both selectedsy and selectedsem are now set (as objects with IDs)
        if (
          this.selectedsy &&
          this.selectedsem &&
          this.selectedsy.id &&
          this.selectedsem.id
        ) {
          this.fetchPrograms();
        }
        this.loading = false;
      } catch (error) {
        console.error("Error fetching SY/Sem:", error);
        this.loading = false;
      }
    },

    // New helper method to reset file input and validation state
    resetFileInputAndValidation() {
      this.selectedFile = null;
      this.validationErrors = [];
      this.isFileValid = false;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ""; // Clear the file input visually
      }
    },

    // New helper method to reset the entire form state after successful upload
    resetFormState() {
      this.resetFileInputAndValidation();
      // Reset dropdowns to null or re-fetch them
      this.selectedsy = null;
      this.selectedsem = null;
      this.programs = []; // Clear programs list
      this.sysem(); // Re-fetch SY/Sem to reset dropdowns and initial programs
    },
  },

  mounted() {
    this.sysem();
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
