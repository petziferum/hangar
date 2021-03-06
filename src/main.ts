import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebaseApp from "@/plugins/firesbaseConfig";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;
Vue.use(Toast, {
  position: "top-center",
  pauseOnHover: true,
  draggable: true,
  icon: true,
  draggablePercent: 0.5,
});

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
