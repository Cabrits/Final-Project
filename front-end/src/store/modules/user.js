const userModule = {
    namespaced: true,
    state: {
      user: null,
      userAuth: "test",
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      setUserAuth(state, userAuth) {
        console.log("before change: "+userAuth+" , "+state.userAuth)
        state.userAuth = userAuth;
        console.log("after change: "+userAuth+" , "+state.userAuth)
      },
      clearUser(state) {
        state.user = null;
      },
      clearUserAuth(state) {
        state.userAuth = null;
      },
    },
    actions: {
      setUserAuth({ commit }, userAuth) {
        commit('setUserAuth', userAuth);
      },
      setUser({ commit }, user) {
        commit('setUser', user);
      },
      clearUser({ commit }) {
        commit('clearUser');
      },
      clearUser({ commit }) {
        commit('clearUserAuth');
      },
    },
    getters: {
      getUser(state) {
        return state.user;
      },
      userId(state) {
        return state.user ? state.user.user_id : null;
      },
      isAuthenticated(state) {
        return !!state.user;
      },
    },
  };
  
  export default userModule;
  