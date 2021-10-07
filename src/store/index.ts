import Vue from "vue";
import Vuex from "vuex";
import Plane from "@/types/Plane";
import userStore from "./user";
import firebaseService from "@/store/api/firebaseService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flightList: [] as Array<Plane>,
    imageList: [],
    user: null,
  },
  mutations: {
    ADD_TO_FLIGHTLIST(state, payload: Plane) {
      state.flightList.push(payload);
    },
    SET_IMAGELIST(state, payload) {
      state.imageList = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    FETCH_USER({ commit }, user) {
      commit("SET_USER", user);
    },
    FETCH_IMAGES({ commit }) {
      firebaseService.getImages().then((list) => {
        commit("SET_IMAGELIST", list);
      });
    },
    addToFlightlist({ commit }, payload) {
      if (payload instanceof Plane) {
        commit("ADD_TO_FLIGHTLIST", payload);
      } else console.log("Falscher Typ");
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getFlightList: (state) => {
      return state.flightList;
    },
    GET_IMAGELIST: (state) => {
      return state.imageList;
    },
  },
  modules: {
    userStore,
  },
});
