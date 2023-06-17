const cartModule = {
  namespaced: true,
    state: {
      cartItems: [],
    },
    mutations: {
      addToCart(state, item) {
        const existingItem = state.cartItems.find((cartItem) => cartItem.item_id === item.item_id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.cartItems.push({ ...item, quantity: 1 });
        }
      },
      removeFromCart(state, item) {
        const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
          const existingItem = state.cartItems[existingItemIndex];
          if (existingItem.quantity > 1) {
            existingItem.quantity--;
          } else {
            state.cartItems.splice(existingItemIndex, 1);
          }
        }
      },
      clearCart(state) {
        state.cartItems = [];
      },
    },
    actions: {
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
      getCart(state) {
        return state.cartItems;
      },
    },
  };
  
  export default cartModule;
  