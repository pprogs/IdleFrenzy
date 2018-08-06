import Vue from "vue";
import vuexI18n from "vuex-i18n";

import ru from "./ru.json";
import en from "./en.json";

export default store => {
  Vue.use(vuexI18n.plugin, store);

  Vue.i18n.add("en", en);
  Vue.i18n.add("ru", ru);

  Vue.i18n.set("en");
};
