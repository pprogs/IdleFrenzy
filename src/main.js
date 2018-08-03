import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import KeenUI from "keen-ui";
import "keen-ui/dist/keen-ui.css";

Vue.use(KeenUI);

Vue.config.productionTip = false;

import FormatPlugin from "./game/formatPlugin";

Vue.use(FormatPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
