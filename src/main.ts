import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebaseApp from "@/plugins/firesbaseConfig";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      this.$store.dispatch("FETCH_USER", user);
    });
  },
}).$mount("#app");
