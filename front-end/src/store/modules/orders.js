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
      fetchOrders({ state, commit, rootState }) {
        commit('setOrders', []);
        const userId = rootState.user.user.user_id;
      
        axios
          .get(`${apiURL}/orders/${userId}`)
          .then(async (response) => {
            const orderIds = response.data;
            console.log(orderIds)
            const orders = await Promise.all(
              orderIds.map(async (orderId) => {
                try {
                  console.log(orderId)
                  const orderResponse = await axios.get(`${apiURL}/order/items/${orderId.order_id}`);
                  const orderData = orderResponse.data;
      
                  const formattedItems = orderData.map((item) => ({
                    item_id: item.item_id,
                    quantity: item.item_amount,
                    item_price_at_time: item.item_price_at_time,
                  }));
      
                  const order = {
                    order_id: orderData[0].order_id,
                    order_user_id: orderData[0].user_id,
                    order_total: orderData[0].order_total,
                    order_date: orderData[0].order_date,
                    order_user_name: orderData[0].order_user_name,
                    order_user_email: orderData[0].order_user_email,
                    order_user_address: orderData[0].order_user_address,
                    order_card_number: orderData[0].order_card_number,
                    order_card_expiration: orderData[0].order_card_expiration,
                    order_card_ccv: orderData[0].order_card_ccv,
                    items: formattedItems,
                  };
      
                  return order;
                } catch (error) {
                  console.error(`Failed to fetch order with ID ${orderId.order_id}:`, error);
                  return null;
                }
              })
            );
      
            commit('setOrders', orders.filter((order) => order !== null));
          })
          .catch((error) => {
            console.error(error);
          });
      },
    createOrder({ dispatch, commit, rootState },order) {
      /*
        const userId = rootState.user.user.user_id;
        const orderTotal = rootState.cart.cartItems.reduce(
          (total, item) =>
            total + (item.item_price * (1 - item.item_discount)).toFixed(2) * item.quantity,
          0
        );
        const orderUserName = rootState.user.user.user_name;;
        const items = rootState.cart.cartItems.map((item) => ({
          item_id: item.item_id,
          quantity: item.quantity,
          item_price_at_time: (item.item_price * (1 - item.item_discount)).toFixed(2),
        }));
        const orderData = {
          order_id: null,
          order_date: null,
          user_id: order.order_user_id,
          order_total: order.order_total,
          order_user_name: orderUserName,
          items,
        };*/
        console.log(order)

        axios
          .post(`${apiURL}/order/create`, order)
          .then((response) => {
            // Handle success
            console.log(response.data)
            order.order_id = response.data;
            commit('addOrder', order);
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
