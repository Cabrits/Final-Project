import apiURL from '../../config.js'
import axios from 'axios';
const userModule = {
    namespaced: true,
    state: {
      user: null,
      userAuth: null,
    },
    mutations: {
      setUser(state, user) {
        state.user = user;
        console.log(state.user)
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
      async fetchUser({ state, commit}) {
        const userId = state.userAuth.uid
        console.log("uh")
  
        try {
          const response = await axios.get(`${apiURL}/user/get/${userId}`);
          const userData = {
            user_id: response.data.user_id,
            user_name: response.data.user_name,
            user_email: response.data.user_email,
          };
          console.log("uh" , response.data)
          commit('setUser', userData);
          console.log(state.user)
        } catch (error) {
          console.error(error);
        }
      },
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
      getUserAuth(state){
        return state.userAuth;
      },
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
  