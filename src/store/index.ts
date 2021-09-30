import Vue from "vue";
import Vuex from "vuex";
import Plane from "@/types/Plane";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flightList: [] as Array<Plane>,
    user: null,
  },
  mutations: {
    ADD_TO_FLIGHTLIST(state, payload: Plane) {
      state.flightList.push(payload);
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    FETCH_USER({ commit }, user) {
      console.log("fetch", user)
      commit("SET_USER", user);
    },
    addToFlightlist({ commit }, payload) {
      if (payload instanceof Plane) {
        commit("ADD_TO_FLIGHTLIST", payload);
      } else console.log("Falscher Typ");
    },
  },
  getters: {
    getFlightList: (state) => {
      return state.flightList;
    },
  },
  modules: {},
});
