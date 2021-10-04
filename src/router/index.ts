import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import firebase from "firebase";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/Hangar.vue"),
  },
  {
    path: "/devtest",
    name: "devtest",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/DevTest.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/components/admin/AdminBoard.vue"),
    beforeEnter: (to, from, next) => {
      console.info("guard check: ", firebase.auth().currentUser);
      if (store.getters.getUser) {
        next();
      } else next({ path: "/login" });
    },
  },
  {
    path: "/hangar",
    name: "hangar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Hangar.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/commons/LoginDialog.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
