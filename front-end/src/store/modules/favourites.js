// Purpose: Vuex module for favourites.

import axios from "axios";
import apiURL from "../../config";

// Create favouritesModule object
const favouritesModule = {
  namespaced: true, // Enables the module to have its own namespace

  // State contains array of favourite items
  state: {
    favourites: [],
  },

  // Mutations contains setFavourites
  mutations: {
    // Set favourites to the favourites array
    setFavourites(state, favourites) {
      state.favourites = favourites;
    },
    // Add a favourite item to the favourites array
    addFavourite(state, favourite) {
      state.favourites.push(favourite);
    },
  },

  // Actions contains fetchFavourites and clearFavourites
  actions: {
    // Fetch all favourite items from the database
    fetchFavourites({ commit, rootState }) {
      const userId = rootState.user.user.user_id;
      axios
        .get(`${apiURL}/user/${userId}/favourites`)
        .then((response) => {
          commit("setFavourites", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // Clear favourites array
    clearFavourites({ commit }) {
      commit("setFavourites", []);
    },
  },

  // Getters contains getFavourites
  getters: {
    getFavourites(state) {
      return state.favourites;
    },
  },
};

export default favouritesModule;
