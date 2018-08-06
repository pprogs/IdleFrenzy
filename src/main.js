import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import loc from "./localization";
loc(store);

import KeenUI from "keen-ui";
import "keen-ui/dist/keen-ui.css";
Vue.use(KeenUI);

import FormatPlugin from "./game/formatPlugin";
Vue.use(FormatPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),

  methods: {
    handleVisibilityChange: function() {
      console.log(document.visibilityState);
    }
  },
  mounted() {
    this.$nextTick(function() {
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
        false
      );
    });
  },

  beforeDestroy() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  }
}).$mount("#app");
