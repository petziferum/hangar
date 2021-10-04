export interface UserState {
  userInfo: { text: string };
}
export default {
  namespaced: true,
  state: {
    userInfo: { text: "Eine Information über den angemeldeten User" },
  },
  mutations: {},
  actions: {},
  getters: {
    //getter wird durch this.$state.getters["UserStore/getUserInfo"] abgefragt
    getUserInfo: (state: UserState): string => {
      return state.userInfo.text;
    },
  },
};
