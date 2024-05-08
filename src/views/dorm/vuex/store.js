import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
  chooseSchoolId: 10,
  chooseDormId: 20,
}

export default new Vuex.Store({
  state
})