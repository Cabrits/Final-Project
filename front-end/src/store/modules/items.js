import axios from 'axios';
import apiURL from '../../config';

const itemsModule = {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
  },
  actions: {
    fetchItems({ commit }) {
      axios
        .get(`${apiURL}/items`)
        .then((response) => {
            console.log(response.data)
          commit('setItems', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  getters: {
    getItems(state) {
      return state.items;
    },
  },
};

export default itemsModule;
