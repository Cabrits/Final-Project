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
    setOrders(state, orders) {
      state.orders = orders;
      console.log("set order:",state.orders)
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
    fetchOrders({ state, commit }) {
      commit('setOrders', []);
      const userId = state.user.uid;

  axios
    .get(`http://localhost:7777/api/orders/${userId}`)
    .then(async (response) => {
      // Handle success
      const orderIds = response.data; // Assuming the response contains an array of order IDs
      const orders = await Promise.all(
        orderIds.map(async (orderId) => {
          
            const orderResponse = await axios.get(`http://localhost:7777/api/order/items/${orderId.order_id}`);
            const orderData = orderResponse.data;
            const formattedItems = orderData.map((item) => ({
              item_id: item.item_id,
              quantity: item.item_amount,
              item_price_at_time:item.item_price_at_time
            }));
            const order = {
              order_id: orderData[0].order_id,
              user_id: orderData[0].user_id,
              order_total: orderData[0].order_total,
              order_date: orderData[0].order_date,
              order_user_name: orderData[0].order_user_name,
              items: formattedItems
            };
            commit('addOrder', order);
            try {
          } catch (error) {
            console.error(`Failed to fetch order with ID ${orderId.order_id}:`, error);
            return null;
          }
        })
      );
    })
    },
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
    createOrder({ dispatch, commit, state }) {
      const userId = state.user.uid;
      const orderTotal = state.cart.reduce((total, item) => total + (item.item_price * (1-item.item_discount)).toFixed(2) * item.quantity, 0);
      const orderUserName = "notimplemented";
      const items = state.cart.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
        item_price_at_time:(item.item_price * (1-item.item_discount)).toFixed(2)
      }));
      const orderData = {
        orderId: null,
        order_date:null,
        user_id: userId,
        order_total: orderTotal,
        order_user_name: orderUserName,
        items,
      };

      axios
      .post('http://localhost:7777/api/order/create', orderData)
      .then((response) => {
        // Handle success
        orderData.orderId=response.data
        commit('addOrder', orderData);
        commit('clearCart');
        dispatch('fetchOrders')
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
      
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
    getOrders(state) {
      return state.orders;
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