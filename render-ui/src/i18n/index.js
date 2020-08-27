import VueI18n from "vue-i18n";
import Vue from "vue";
import cn from "./cn-lang";
import en from "./en-lang";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "cn", // set locale
  fallbackLocale: "cn",
  messages: { en, cn }
});

export default i18n;
