import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; //If problems occur wrap store in {}
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store, //With ES6 you can write"   store: store,   " as "  store,  "
  vuetify,
  render: h => h(App)
}).$mount("#app");
