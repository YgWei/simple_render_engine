import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = "cn";
  }

  i18n.locale = language;
  next();
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
