import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCofn from './Vue_Cofn'

new VueCofn(Vue).init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
