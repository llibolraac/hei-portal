<template>
  <!-- Timeline Section -->
  <section
    class="bg-gray-50 rounded-lg p-4 overflow-y-auto border border-gray-200"
    style="height: 460px"
  >
    <ul class="space-y-4">
      <li
        v-if="remarks.length > 0"
        v-for="remark in remarks"
        :key="remark.id"
        :class="[
          'pl-4 border-l-4',
          remark.remarkable_type === 'App\\Models\\Billings'
            ? 'border-yellow-500'
            : remark.remarkable_type === 'App\\Models\\Voucher'
            ? 'border-blue-500'
            : 'border-gray-300',
        ]"
      >
        <h6 class="text-base font-semibold text-gray-800 tight-line">
          {{ remark.remarks }}
        </h6>
        <p class="text-xs text-gray-500 font-medium">
          {{ formatDate(remark.created_at) }} &nbsp;|&nbsp; by:
          {{ remark.user_name }}
        </p>
        <p class="text-sm text-gray-600 mt-1">{{ remark.content }}</p>
      </li>

      <li v-else class="text-center text-gray-500 text-sm">
        <h6 class="font-semibold">No Data Available</h6>
      </li>
    </ul>
  </section>

  <!-- Input section -->
  <div class="flex items-center gap-2 mt-4">
    <input
      type="text"
      v-model="remark"
      placeholder="Updates?"
      class="flex-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none px-3 py-2 text-sm"
    />
    <button
      class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      @click="send_remarks"
    >
      <i class="bi bi-send mr-1"></i> Send
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    voucherId: {
      type: [String, Number], // Specify the expected type(s)
      required: false, // Indicates that this prop is required
      default: null,
    },

    billingId: {
      type: [String, Number], // Specify the expected type(s)
      required: false, // Indicates that this prop is required
      default: null,
    },

    // updatedRemarks: {
    //     type: Object,
    // }
  },

  data() {
    return {
      remarks: [],
      remark: null,
    };
  },

  computed: {
    ...mapGetters("auth", ["accessToken", "userType", "userId", "userName"]),
  },

  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },

    async send_remarks() {
      // Extract voucher ID from the response

      // Perform additional actions using the voucherId
      const remarksToSubmit = {
        type: "billing", // 'voucher' or 'billing'
        id: this.billingId, // the ID of the voucher or billing
        user_id: this.userId,
        remarks: this.remark,
      };

      try {
        const res = await this.$api.post(`/remarks`, remarksToSubmit, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        this.remarks.push({
          id: res.data.data.id,
          remarks: res.data.data.remarks,
          user_name: this.userName,
          created_at: res.data.data.created_at,
        });

        this.remark = "";
        // Handle success or error for remarks creation if needed
      } catch (remarksError) {
        console.error("Error creating remarks:", remarksError);
      }
    },

    async fetchRemarks() {
      try {
        const promises = [];

        if (this.voucherId) {
          promises.push(
            this.$api
              .get(`/remarks`, {
                params: { type: "voucher", id: this.voucherId },
                headers: { Authorization: `Bearer ${this.accessToken}` },
              })
              .then((res) => res.data.map((r) => ({ ...r, source: "voucher" })))
              .catch(() => [])
          );
        }

        if (this.billingId) {
          promises.push(
            this.$api
              .get(`/remarks`, {
                params: { type: "billing", id: this.billingId },
                headers: { Authorization: `Bearer ${this.accessToken}` },
              })
              .then((res) => res.data.map((r) => ({ ...r, source: "billing" })))
              .catch(() => [])
          );
        }

        const results = await Promise.all(promises);
        const merged = results
          .flat()
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        this.remarks = merged;

        this.$emit("remarks_load_status", this.remarks_load);
      } catch (error) {
        console.error("Failed to fetch remarks:", error);
      }
    },
  },

  created() {
    this.fetchRemarks();
  },

  // watch: {
  //     updatedRemarks: {
  //         handler(newValue) {

  //             this.remarks.push({
  //                 id: newValue.id,
  //                 remarks: newValue.remarks,
  //                 user_name: this.userName,
  //                 created_at: newValue.created_at,
  //             });

  //         },
  //         deep: true, // Watch for deep changes in the object
  //         immediate: true // Trigger the handler immediately with the initial value
  //     }
  // }
};
</script>

<style lang="scss" scoped></style>
