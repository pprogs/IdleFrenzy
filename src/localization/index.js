import Vue from "vue";
import vuexI18n from "vuex-i18n";

import ru from "./ru.json";
import en from "./en.json";

const Languages = [
  { lang: "en", name: "English" },
  { lang: "ru", name: "Русский" }
];

const Loc = store => {
  Vue.use(vuexI18n.plugin, store);

  Vue.i18n.add("en", en);
  Vue.i18n.add("ru", ru);

  let language =
    window.navigator.userLanguage || window.navigator.language || "en";

  language = language.toLowerCase().includes("ru") ? "ru" : "en";

  Vue.i18n.set(language);
};

export { Loc, Languages };
