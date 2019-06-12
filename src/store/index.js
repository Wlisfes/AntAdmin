import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},

    strict: debug,
    plugins: [
        createPersistedState({
          storage: window.sessionStorage
        }),
        debug ? createLogger() : ""
    ]
})