<!-- filepath: /Users/billbaconguis/Documents/Projects/sites/hei-portal/src/views/Login.vue -->
<template>

  <div v-if="loading" class="-m-px">
    <span>Loading...</span>
  </div>

  <div v-else>
    <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
    <span class="font-medium">Important Instructions:</span> Please be informed that you are <strong>not allowed to tamper</strong> with the generated template in any way, including changing the <strong>data types</strong> of the cells. The file must remain in <strong>CSV format</strong>, exactly as it was when downloaded. You are only required to fill in the <strong> Zip Code, Email Address, and Contact Number for each grantee.</strong><br /> <br />

    If you need to change any details related to the grantee's name, please coordinate with your respective UniFAST Regional Coordinator assigned to your institution.

    </div>

    <div v-if="validationErrors.length" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <h3 class="font-semibold">Validation Errors:</h3>
      <ul class="list-disc pl-5 mt-2">
        <li v-for="(error, index) in validationErrors" :key="index">{{ error }}</li>
      </ul>
    </div>

        <form @submit.prevent="uploadTemplate">

    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Year</label>
    <select @change="updateSchoolYear" v-model="selectedsy" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="">Select School Year</option>
        <option v-for="schoolyear in schoolyears" :key="schoolyear.id" :value="schoolyear">{{ schoolyear.school_year }}</option>
    </select>

  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
  <select  @change="updateSemester" v-model="selectedsem" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    <option value="">Select School Year</option>
    <option v-for="semester in semesters" :key="semester.id" :value="semester.id">{{ semester.semester }}</option>

  </select>

    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" @change="handleFileChange" ref="fileInput">
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>



    <button   type="button"
  @click="uploadTemplate" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Upload File</button>
    </form>

  </div>

</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Papa from 'papaparse';
export default {

  components: {


  },


  data() {
    return {
        selectedsem: 1,
        selectedsy: 3,
        semesters: [],
        schoolyears: [],
        schoolyear: null,
        semester: null,
        programs: [],
        loading: true,
        program_id: null,
        selectedFile: null,
        validationErrors: [],

    };
  },

  
  computed: {
    ...mapGetters('auth', ['accessToken', 'userType', 'userId', 'userName', 'heiId']),
  },

methods: {

  updateSchoolYear() {
  console.log(this.selectedsy)
  },

// Assume you have selectedsy and selectedsem available in your component's data
// For example:
// data() {
//   return {
//     selectedsy: null, // This would come from your UI selection (e.g., school year ID)
//     selectedsem: null,   // This would come from your UI selection (e.g., semester ID)
//     validationErrors: [],
//     selectedFile: null,
//     isFileValid: false,
//     // ... other data properties
//   };
// },

handleFileChange(event) {
  const file = event?.target?.files?.[0];
  this.validationErrors = []; // Clear previous errors
  this.selectedFile = null; // Clear previously selected file
  this.isFileValid = false; // Add a flag to indicate overall validity

  // Use the correct property names: this.selectedsy and this.selectedsem
  const expectedSchoolYearId = this.selectedsy;
  const expectedSemesterId = this.selectedsem;

  // Pre-check for expected context IDs
  if (!expectedSchoolYearId || !expectedSemesterId) {
    this.validationErrors.push("Please select a School Year and Semester before uploading the file.");
    return;
  }

  if (!file) {
    this.validationErrors.push("No file selected.");
    return;
  }

  this.selectedFile = file;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      let rows = results.data;
      const tempErrors = [];
      const processedRows = []; // To store rows that pass client-side validation

      if (rows.length === 0) {
        tempErrors.push("The selected CSV file is empty or contains no valid data rows.");
        this.validationErrors = tempErrors;
        this.isFileValid = false;
        return;
      }

      let skippedRowsCount = 0;

      rows.forEach((row, index) => {
        const rowNumber = index + 2; // +2 because of heading row and 0-based index

        // --- School Year and Semester Mismatch Check ---
        // Assuming 'school_year_id' and 'semester_id' are the column headers in the CSV
        const fileSchoolYearId = parseInt(row.school_year_id);
        const fileSemesterId = parseInt(row.semester_id);

        // Check for NaN if parsing failed (e.g., non-numeric data)
        if (isNaN(fileSchoolYearId) || isNaN(fileSemesterId)) {
          tempErrors.push(`Row ${rowNumber}: School Year ID or Semester ID is missing or not a valid number in the file.`);
          skippedRowsCount++;
          return; // Skip this row
        }

        if (fileSchoolYearId !== expectedSchoolYearId || fileSemesterId !== expectedSemesterId) {
          tempErrors.push(`Row ${rowNumber}: School Year/Semester mismatch. Expected SY: ${expectedSchoolYearId}, Sem: ${expectedSemesterId}. Found SY: ${fileSchoolYearId}, Sem: ${fileSemesterId}. This row will be skipped.`);
          skippedRowsCount++;
          return; // Skip this row
        }
        // --- End School Year and Semester Mismatch Check ---

        // Existing Validations
        // These remain unchanged and apply AFTER the SY/Sem check
        if (!row.student_number) {
          tempErrors.push(`Row ${rowNumber}: Student number is required.`);
        }

        if (!row.zip_code) {
          tempErrors.push(`Row ${rowNumber}: ZIP code is required.`);
        } else if (!/^\d{4}$/.test(row.zip_code)) {
          tempErrors.push(`Row ${rowNumber}: ZIP code must be exactly 4 digits.`);
        }

        if (!row.email_address) {
          tempErrors.push(`Row ${rowNumber}: Email address is required.`);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email_address)) {
          tempErrors.push(`Row ${rowNumber}: Invalid email format.`);
        }

        if (!row.contact_number) {
          tempErrors.push(`Row ${rowNumber}: Contact number is required.`);
        }

        // Add to processedRows only if no errors were added for this specific row by any of the checks above
        // This is a slightly more robust way than the previous `indexOf` check.
        // It relies on a temporary flag for the current row's validity.
        let currentRowHasErrors = false;
        // Check if any error messages were just added for this specific row.
        // This is a simplified check. For very complex validation, you might pass a row-specific error object.
        for (let i = tempErrors.length - 1; i >= 0; i--) {
            if (tempErrors[i].startsWith(`Row ${rowNumber}`)) {
                currentRowHasErrors = true;
                break;
            }
        }

        if (!currentRowHasErrors) {
            processedRows.push(row);
        }
      });

      this.validationErrors = tempErrors;
      this.isFileValid = tempErrors.length === 0;

      if (!this.isFileValid) {
        console.error("Validation errors:", this.validationErrors);
        if (skippedRowsCount > 0) {
            const skipMessage = `${skippedRowsCount} rows were skipped due to School Year/Semester mismatch or invalid ID format.`;
            console.warn(skipMessage);
            // Optionally, add this specific message to the beginning of validationErrors
            // if you want it to always appear clearly for the user.
            if (!this.validationErrors.includes(skipMessage)) { // Prevent duplicates
                this.validationErrors.unshift(skipMessage);
            }
        }
      } else {
        console.log("CSV file is valid and parsed successfully. Processed rows:", processedRows);
        // You would typically send 'processedRows' to your backend now.
        // this.uploadDataToBackend(processedRows);
      }
    },
    error: (err) => {
      console.error("Error parsing CSV:", err);
      this.validationErrors.push(`Error parsing file: ${err.message || "Invalid CSV format."}`);
      this.isFileValid = false;
    },
  });
},
async uploadTemplate() {
  if (this.validationErrors.length) {
    alert("Please fix the validation errors before uploading.");
    return;
  }

  if (!this.selectedFile) {
    alert("No file selected.");
    return;
  }

  if (window.confirm('Are you sure to upload this file? This action is irreversible.')) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('school_year_id', this.selectedsy);
    formData.append('semester_id', this.selectedsem);
    formData.append('hei_id', this.heiId);

    try {
      await this.$api.post('/grantees/batch-update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      alert('Batch update successful!');
    } catch (e) {
      if (e.response?.data?.errors) {
        console.error('Validation errors:', e.response.data.errors);
        alert('Some rows failed. Check console for details.');
      } else {
        console.error('Upload failed:', e);
        alert('Upload failed. Try again.');
      }
    }
  }
},


    fetchPrograms(page = 1){
        this.$api.get(`/get-programs/${this.heiId}?page=${page}`, {
            params: {
            sy: this.selectedsy,
            sem: this.selectedsem,
            },
            headers: {
        Authorization: `Bearer ${this.accessToken}`,
        },
        })

        .then(res => {
            this.programs = res.data.programs;

        })

    },

    async sysem(){
      this.loading = true;
        try {
            const res = await this.$api.get(`/sy-sem`, {
                    headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    }
                });
            this.semesters = res.data.semesters;
            this.schoolyears = res.data.school_years;
            this.fetchPrograms();
            this.loading = false;
    
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