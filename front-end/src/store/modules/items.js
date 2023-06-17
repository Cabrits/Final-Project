import axios from 'axios';

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
        .get('http://localhost:7777/api/items')
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
