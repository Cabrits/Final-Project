import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    favourites: [],
    items: [],
    cart:[],
    orders: [],
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
    },
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeFromCart(state, item) {
      const index = state.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    addToCart(state, item) {
      const existingItem = state.cart.find((cartItem) => cartItem.item_id === item.item_id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(state, item) {
      const existingItemIndex = state.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
    clearCart(state) {
      state.cart = [];
    },
    
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
    addToCart({ commit }, item) {
      commit('addToCart', item);
    },
    removeFromCart({ commit }, item) {
      commit('removeFromCart', item);
    },
    clearCart({ commit }) {
      commit('clearCart');
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
    getCart(state) {
      return state.cart;
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