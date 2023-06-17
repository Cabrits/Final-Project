import axios from 'axios';

const favouritesModule = {
  namespaced: true,
    state: {
      favourites: [],
    },
    mutations: {
      setFavourites(state, favourites) {
        state.favourites = favourites;
      },
    },
    actions: {
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
      clearFavourites({ commit }) {
        commit('setFavourites', []);
      },
    },

    getters: {
      getFavourites(state) {
        return state.favourites;
      },
    },
  };
  
  export default favouritesModule;