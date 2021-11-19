import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: {},
    base_url: "http://127.0.0.1:9000/",
  },
  mutations: {
    editUserInfo(state, user) {
      state.userinfo = user;
      console.log(state);
    },
  },
  actions: {},
  modules: {},
});
