import axios from 'axios';
import apiURL from '../../config';
const ordersModule = {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
  },
  actions: {
    clearOrders({ commit }) {
        commit('setOrders', []);
      },
    fetchOrders({ state, commit, rootState  }) {
      commit('setOrders', []);
      const userId = rootState.user.user.user_id;
      console.log(userId)
      axios
        .get(`${apiURL}/orders/${userId}`)
        .then(async (response) => {
          console.log(response.data)
          const orderIds = response.data;
          const orders = await Promise.all(
            orderIds.map(async (orderId) => {
              try {
                const orderResponse = await axios.get(`${apiURL}/order/items/${orderId.order_id}`);
                const orderData = orderResponse.data;
                const formattedItems = orderData.map((item) => ({
                  item_id: item.item_id,
                  quantity: item.item_amount,
                  item_price_at_time: item.item_price_at_time,
                }));
                const order = {
                  order_id: orderData[0].order_id,
                  user_id: orderData[0].user_id,
                  order_total: orderData[0].order_total,
                  order_date: orderData[0].order_date,
                  order_user_name: orderData[0].order_user_name,
                  items: formattedItems,
                };
                commit('addOrder', order);
                return order;
              } catch (error) {
                console.error(`Failed to fetch order with ID ${orderId.order_id}:`, error);
                return null;
              }
            })
          );
          console.log("orders: ")
          console.log(orders)
          commit('setOrders', orders.filter((order) => order !== null));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createOrder({ dispatch, commit, rootState }) {
        const userId = rootState.user.user.user_id;
        const orderTotal = rootState.cart.cartItems.reduce(
          (total, item) =>
            total + (item.item_price * (1 - item.item_discount)).toFixed(2) * item.quantity,
          0
        );
        const orderUserName = "notimplemented";
        const items = rootState.cart.cartItems.map((item) => ({
          item_id: item.item_id,
          quantity: item.quantity,
          item_price_at_time: (item.item_price * (1 - item.item_discount)).toFixed(2),
        }));
        const orderData = {
          orderId: null,
          order_date: null,
          user_id: userId,
          order_total: orderTotal,
          order_user_name: orderUserName,
          items,
        };
        console.log(orderData)

        axios
          .post(`${apiURL}/order/create`, orderData)
          .then((response) => {
            // Handle success
            console.log(response.data)
            orderData.orderId = response.data;
            commit('addOrder', orderData);
            dispatch('cart/clearCart', null, { root: true });
            dispatch('fetchOrders');
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      },
  },
  getters: {
    getOrders(state) {
      return state.orders;
    },
  },
};

export default ordersModule;
