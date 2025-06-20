import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import sidebar from './modules/sidebar'
// import online from './modules/online'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    sidebar
    // online
  },
  state: {
  },
  mutations: {

  },
  actions: {

  },
  getters
})
