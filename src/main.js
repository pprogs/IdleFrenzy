import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import { Loc } from "./localization";
Loc(store);

import KeenUI from "keen-ui";
import "keen-ui/dist/keen-ui.css";
Vue.use(KeenUI);

import FormatPlugin from "./game/formatPlugin";
Vue.use(FormatPlugin);

import Game from "./game/game";
Vue.use(Game);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),

  methods: {
    handleVisibilityChange: function() {
      this.$emit("visibility", document.visibilityState);
    },
    beforeUnload: function() {
      this.$emit("unload");
    }
  },

  mounted() {
    this.$nextTick(function() {
      document.addEventListener(
        "visibilitychange",
        this.handleVisibilityChange,
        false
      );

      window.addEventListener("unload", this.beforeUnload, {
        capture: true,
        once: true,
        passive: true
      });
    });
  },

  beforeDestroy() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  }
}).$mount("#app");
