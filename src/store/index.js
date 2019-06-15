import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import state from './state'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions: {},
    plugins: [
      createPersistedState({ storage: window.sessionStorage })
    ]
})