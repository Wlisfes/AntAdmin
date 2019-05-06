import Vue from "vue";
import Ant from 'ant-design-vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as Api  from './Api/Api'
import 'ant-design-vue/dist/antd.css'
import './assets/style/common.css'

Vue.config.productionTip = false;
Vue.prototype.Api = Api
Vue.use(Ant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
