import Flugzeugliste from "@/types/Flugzeugliste";

export interface ListState {
  listen: Flugzeugliste[];
}
export default {
  namespaced: true,
  state: {
    listen: null,
  } as ListState,
  mutations: {},
  actions: {},
  getters: {
    //getter wird durch this.$state.getters["UserStore/getUserInfo"] abgefragt
    getFlugzeugListen: (state: ListState): Flugzeugliste[] => {
      return state.listen;
    },
  },
};
