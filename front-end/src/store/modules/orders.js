//Purpose: to store and export the orders module which contains the state, mutations, actions, and getters for the orders page

// import axios and apiURL
import axios from "axios";
import apiURL from "../../config";

// create ordersModule object
const ordersModule = {
  namespaced: true, // Enables the module to have its own namespace

  // state contains array of orders made by the user
  state: {
    orders: [],
  },

  // mutations contains setOrders and addOrder
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
  },

  // actions contains clearOrders, fetchOrders and createOrder
  actions: {
    // clearOrders action which clears the orders array
    clearOrders({ commit }) {
      commit("setOrders", []);
    },

    // fetchOrders action which uses axios to get all orders made by the user from the database
    fetchOrders({ state, commit, rootState }) {
      // clear orders array and get user id
      commit("setOrders", []);
      const userId = rootState.user.user.user_id;

      // get all orders made by the user from the database
      axios
        .get(`${apiURL}/orders/${userId}`)
        .then(async (response) => {
          // Handle success
          const orderIds = response.data;

          // for each order, get the order items and add them to the order as an array
          const orders = await Promise.all(
            orderIds.map(async (orderId) => {
              try {
                const orderResponse = await axios.get(
                  `${apiURL}/order/items/${orderId.order_id}`
                );
                const orderData = orderResponse.data;

                // Format the items array to match the order schema
                const formattedItems = orderData.map((item) => ({
                  item_id: item.item_id,
                  item_name: item.item_name,
                  quantity: item.item_amount,
                  item_price_at_time: item.item_price_at_time,
                }));

                // Create the order object
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
                  items: formattedItems, // Add the items array
                };

                return order;
              } catch (error) {
                // If an error occurs, log it and return null
                console.error(
                  `Failed to fetch order with ID ${orderId.order_id}:`,
                  error
                );
                return null;
              }
            })
          );
          // Set the orders array and filter out any null values
          commit(
            "setOrders",
            orders.filter((order) => order !== null)
          );
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },
    // fetchOrder action which uses axios to get a specific order from the database
    fetchOrder({ state, commit, rootState }, orderId) {
      // get user id
      const userId = rootState.user.user.user_id;

      // get order from the database
      axios
        .get(`${apiURL}/order/items/${orderId}`)
        .then(async (response) => {
          // Handle success
          const orderData = response.data;

          // Format the items array to match the order schema
          const formattedItems = orderData.map((item) => ({
            item_id: item.item_id,
            item_name: item.item_name,
            quantity: item.item_amount,
            item_price_at_time: item.item_price_at_time,
          }));

          // Create the order object
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
            items: formattedItems, // Add the items array
          };

          // add the order to the orders array
          commit("addOrder", order);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },

    // createOrder action which uses axios to create an order in the database
    createOrder({ dispatch }, order) {
      // receive order object as parameter and send it to the api
      axios
        .post(`${apiURL}/order/create`, order)
        .then((response) => {
          // Handle success
          order.order_id = response.data.order_id;
          // fetch order
          dispatch("fetchOrder", order.order_id);
          dispatch("cart/clearCart", null, { root: true });
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },
  },
  // getters contains getOrders
  getters: {
    getOrders(state) {
      return state.orders;
    },
  },
};

export default ordersModule;
