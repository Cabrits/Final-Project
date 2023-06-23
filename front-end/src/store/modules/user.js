//Purpose: to create a user module for the store

import apiURL from "../../config.js";
import axios from "axios";

// create userModule object
const userModule = {
  namespaced: true, // Enables the module to have its own namespace

  // state contains user and userAuth
  state: {
    user: null, // User object (user_id, user_name, user_email, user_address)
    userAuth: null, // Firebase user object
  },

  // mutations contains setUser, setUserAuth, clearUser and clearUserAuth
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
  // actions contains fetchUser, updateUser, setUserAuth, setUser, clearUser and clearUserAuth
  actions: {
    // fetchUser action which uses axios to get user data from the database
    async fetchUser({ state, commit }) {
      const userId = state.userAuth.uid;

      try {
        // get user data from the database
        const response = await axios.get(`${apiURL}/user/get/${userId}`);
        const userData = {
          user_id: response.data.user_id,
          user_name: response.data.user_name,
          user_email: response.data.user_email,
          user_address: response.data.user_address,
        };

        // set user data with setUser mutation
        commit("setUser", userData);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    // updateUser action which uses axios to update user data in the database
    async updateUser({ commit }, updatedUserInfo) {
      try {
        // update user data in the database
        await axios.put(
          `${apiURL}/user/${updatedUserInfo.user_id}/update`,
          updatedUserInfo
        );

        // set user data with setUser mutation
        commit("setUser", updatedUserInfo);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    // setUserAuth action which uses setUserAuth mutation to set userAuth
    setUserAuth({ commit }, userAuth) {
      commit("setUserAuth", userAuth);
    },

    // setUser action which uses setUser mutation to set user
    setUser({ commit }, user) {
      commit("setUser", user);
    },

    // clearUser action which uses clearUser mutation to clear user
    clearUser({ commit }) {
      commit("clearUser");
    },

    // clearUserAuth action which uses clearUserAuth mutation to clear userAuth
    clearUser({ commit }) {
      commit("clearUserAuth");
    },
  },

  // getters contains getUserAuth, getUser, userId and isAuthenticated
  getters: {
    getUserAuth(state) {
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
