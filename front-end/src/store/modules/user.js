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
      },
      setUserAuth(state, userAuth) {
        state.userAuth = userAuth;
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
  
        try {
          const response = await axios.get(`${apiURL}/user/get/${userId}`);
          const userData = {
            user_id: response.data.user_id,
            user_name: response.data.user_name,
            user_email: response.data.user_email,
            user_address: response.data.user_address,
          };
          commit('setUser', userData);
        } catch (error) {
          console.error(error);
        }
      },
      async updateUser({ commit }, updatedUserInfo) {
        console.log(updatedUserInfo)
        try {
          console.log(updatedUserInfo)
          await axios.put(`${apiURL}/user/${updatedUserInfo.user_id}/update`, updatedUserInfo);
          console.log(updatedUserInfo)
          commit('setUser', updatedUserInfo);
          console.log(updatedUserInfo)
        } catch (error) {
          console.error(error);
          throw error;
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
  