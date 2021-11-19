import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/assets/css/mystyle.css";
import store from "./store";

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
