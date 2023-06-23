// Purpose: Vuex module for items.

import axios from "axios";
import apiURL from "../../config";

// Create itemsModule object
const itemsModule = {
  namespaced: true, // Enables the module to have its own namespace

  // State contains array of items
  state: {
    items: [],
  },

  // Mutations contains setItems
  mutations: {
    // Set items to the items array
    setItems(state, items) {
      state.items = items;
    },
  },
  // Actions contains fetchItems
  actions: {
    // Fetch all items from the database
    fetchItems({ commit }) {
      axios
        .get(`${apiURL}/items`)
        .then((response) => {
          // Handle success
          commit("setItems", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },
  },
  // Getters contains getItems
  getters: {
    getItems(state) {
      return state.items;
    },
  },
};

export default itemsModule;
