export default {
  namespaced: true,

  state: {
    toogle: false
  },

  getters: {
    isToogle(state) {
      return state.toogle
    },
  },

  mutations: {
    SET_TOOGLE(state, toogle) {
      state.toogle = toogle
    }
  },

  actions: {
    toogled({ commit }, toogle) {
      commit('SET_TOOGLE', toogle)
    }
  }
}