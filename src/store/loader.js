export default {
    namespaced: true,

    state: {
        loading: false
    },

    getters: {
        isLoading(state) {
            return state.loading
        },
    },

    mutations: {
        SET_LOADER(state, loading) {
            state.loading = loading
        }
    },

    actions: {
        show({ commit }, loading) {
            commit('SET_LOADER', loading)
        },
    }
}