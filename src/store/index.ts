import Vue from "vue";
import Vuex from "vuex";
import Plane from "@/types/Plane";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flightList: [] as Array<Plane>,
  },
  mutations: {
    ADD_TO_FLIGHTLIST(state, payload: Plane) {
      state.flightList.push(payload);
    },
  },
  actions: {
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
