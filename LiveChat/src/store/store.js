import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: null,
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    }
  },
  actions: {
    setUser({ commit }, userInfo) { 
      commit('setUserInfo', userInfo);
    },
    logout({ commit }) {
      commit('clearUserInfo');
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
});