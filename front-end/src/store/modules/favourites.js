import axios from 'axios';
import apiURL from '../../config';

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
          .get(`${apiURL}/user/${userId}/favourites`)
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