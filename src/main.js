import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCofn from './Vue_Cofn'

Vue.use(VueCofn)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
