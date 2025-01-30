
const state = {
    selectedVouchers: [],
    totalAmount: 0
};

const mutations = {
    ADD_VOUCHER(state, voucher) {
        state.selectedVouchers.push(voucher);
        state.totalAmount += voucher.amount;
    },
    REMOVE_VOUCHER(state, voucherId) {
        const index = state.selectedVouchers.findIndex(v => v.id === voucherId);
        if (index !== -1) {
            state.totalAmount -= state.selectedVouchers[index].amount;
            state.selectedVouchers.splice(index, 1);
        }
    },
    // Add other mutations as needed
};

const actions = {
    addVoucher({ commit }, voucher) {
        commit('ADD_VOUCHER', voucher);
    },
    removeVoucher({ commit }, voucherId) {
        commit('REMOVE_VOUCHER', voucherId);
    },
    // Add other actions as needed
};
const getters = {
    getSelectedVouchers: state => state.selectedVouchers,
    getTotalAmount: state => state.totalAmount,
};

export default {
    state,
    mutations,
    actions,
    getters,
};