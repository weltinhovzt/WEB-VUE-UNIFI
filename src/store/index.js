import Vue from 'vue'
import Vuex from 'vuex'

import toogle from './toogle'
import loader from './loader'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toogle,
    loader
  }
})
