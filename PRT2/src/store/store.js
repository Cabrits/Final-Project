import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    favourites: [],
    items: [],
    user: null,
  },
  mutations: {
    setFavourites(state, favourites) {
      state.favourites = favourites;
    },
    setItems(state, items) {
      state.items = items;
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
        state.user = null
        state.favourites = []
    }
  },
  actions: {
    fetchItems({ commit }) {
        axios
          .get('http://localhost:7777/api/items')
          .then((response) => {
            commit('setItems', response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      fetchFavourites({ commit }, userId) {
        axios
          .get(`http://localhost:7777/api/user/${userId}/favourites`)
          .then((response) => {
            commit('setFavourites', response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    clearUser({ commit }) {
        commit('clearUser');
    },
  },
  getters: {
    getFavourites(state) {
        return state.favourites;
    },
    getItems(state) {
        return state.items;
    },
    getUser(state) {
        return state.user;
    },
    userId(state) {
        return state.user.uid;
    },
    isAuthenticated(state) {
        return !!state.userId;
    },
  },
});

export default store;