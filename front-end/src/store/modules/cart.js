const cartModule = {
  namespaced: true, // Enables the module to have its own namespace
    state: {
      cartItems: [], // Stores the items in the cart
    },
    mutations: {
      // Adds an item to the cart
      addToCart(state, item) {
        const existingItem = state.cartItems.find((cartItem) => cartItem.item_id === item.item_id);
        if (existingItem) {
          // If the item already exists in the cart, increase its quantity
          existingItem.quantity++;
        } else {
          // If the item doesn't exist in the cart, add it with a quantity of 1
          state.cartItems.push({ ...item, quantity: 1 });
        }
      },
      // Removes an item from the cart
      removeFromCart(state, item) {
        const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
          const existingItem = state.cartItems[existingItemIndex];
          if (existingItem.quantity > 1) {
             // If the item's quantity is greater than 1, decrease its quantity
            existingItem.quantity--;
          } else {
            // If the item's quantity is 1, remove it from the cart
            state.cartItems.splice(existingItemIndex, 1);
          }
        }
      },
      // Clears the cart by removing all items
      clearCart(state) {
        state.cartItems = [];
      },
    },
    actions: {
      // Action to add an item to the cart
      addToCart({ commit }, item) {
        commit('addToCart', item);
      },
      // Action to remove an item from the cart
      removeFromCart({ commit }, item) {
        commit('removeFromCart', item);
      },
      // Action to clear the cart
      clearCart({ commit }) {
        commit('clearCart');
      },
    },
    getters: {
      // Getter to retrieve the cart items
      getCart(state) {
        return state.cartItems;
      },
    },
  };
  
  export default cartModule;
  