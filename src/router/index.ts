import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import firebase from "firebase";
import store from "@/store";
import firebaseApp, { fireAuth } from "@/plugins/firesbaseConfig";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
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
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((record) => record.meta.requiresAuth); // checkt, ob in der rout "requriesAuth: true" steht
  const isAuthenticated = fireAuth.currentUser;
  if (authRequired && !isAuthenticated) {
    const querypath = to.meta.frompath;
    next({ name: "login", query: { from: querypath } });
  } else next();
});

export default router;
