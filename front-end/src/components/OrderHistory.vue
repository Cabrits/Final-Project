<!--Box containing all order made by the user, where it's able to see all items bought in each order-->

<template>
  <!--Container-->

  <div class="orderHistoryContainer">
    <h2>Order History</h2>
    <div class="listContainer">
      <ul>
      <li v-for="(order, index) in visibleOrders" :key="order.order_id">
        <strong>Order ID:</strong> {{ order.order_id }} |
        <strong>Date:</strong> {{ formatDate(order.order_date) }} |
        <strong>Total:</strong> {{ order.order_total }}€
        <button @click="showOrderDetails(order)">Order</button>
      </li>
    </ul>
    <button class="showMoreLess" v-if="showButton" @click="toggleOrders">
      {{ showMore ? "Show Less" : "Show More" }}
    </button>
    </div>

    <!--Popup-->

    <div class="blur" v-if="selectedOrder">
      <div class="orderPopupWrapper">
        <div class="orderPopup">
          <div class="closePopup" @click="closeO()">&times;</div>
          <h3>Order Details</h3>
          <ul>
            <li v-for="item in selectedOrder.items" :key="item.item_id">
              {{ item.item_name }} - {{ item.quantity }}x -
              {{ item.item_price_at_time }}€
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//  Import necessary modules and functions
import { mapGetters } from "vuex";

export default {
  name: "OrderHistory",
  // data for the component (show only 3 orders at a time)
  data() {
    return {
      visibleOrderCount: 2,
      showMore: false,
      selectedOrder: null,
    };
  },

  // computed properties for the component (get orders and show only 3 orders at a time)
  computed: {
    ...mapGetters("orders", ["getOrders"]),
    //  Show only 3 orders at a time
    visibleOrders() {
      return this.getOrders.slice(0, this.visibleOrderCount);
    },
    //  Show the button to show more orders if there are more than 3 orders
    showButton() {
      return this.getOrders.length > 2;
    },
  },

  // methods for the component (toggle orders, show order details, hide order details and format date)
  methods: {
    //  Toggle orders to show more or less orders
    toggleOrders() {
      this.showMore = !this.showMore;
      //  If showMore is true, show all orders, else show only 3 orders
      if (this.showMore) {
        this.visibleOrderCount = this.getOrders.length;
      } else {
        this.visibleOrderCount = 2;
      }
    },
    //  Show order details
    showOrderDetails(order) {
      this.selectedOrder = order;
    },
    //  Hide order details
    hideOrderDetails() {
      this.selectedOrder = null;
    },
    //  Format date to show only the date
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    },
    //  Close popup
    closeO() {
      this.selectedOrder = false;
    },
  },
};
</script>

<style scoped>
/*Order History Box*/

.orderHistoryContainer {
  background-color: rgb(157, 137, 119);
  border-radius: 10px;
  border: 2px solid white;
  padding: 10px 50px;
  box-shadow: 25px 25px 10px rgba(50, 50, 50, 0.6);
  color: white;
  font-family: Arial, sans-serif;
  text-align: left;
  height: 280px;
}

.orderHistoryContainer h2 {
  font-size: 24px;
  text-shadow: 0 0 2px #000000, 0 0 2px #000000;
  text-align: center;
}

.listContainer{
  overflow-y: auto;
  height: 210px;
  scrollbar-width: thin;
  margin-top: -10px;
}

.orderHistoryContainer ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.orderHistoryContainer strong {
  text-shadow: 0 0 1px #000000, 0 0 2px #000000;
}

.orderHistoryContainer li {
  margin-bottom: 10px;
}

.orderHistoryContainer li button {
  background-color: #ffffff;
  border: none;
  color: rgb(0, 0, 0);
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  float: right;
  cursor: pointer;
  box-shadow: 5px 5px rgba(83, 82, 82, 0.8);
}

.orderHistoryContainer li button:hover {
  background-color: rgb(97, 82, 68);
  color: white;
}

/*Popup*/

.orderPopupWrapper {
  width: 99%;
  padding-top: 35px;
  position: absolute;
}

.orderPopup {
  z-index: 5;
  display: block;
  position: relative;
  width: 350px;
  line-height: 25px;
  height: 450px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 30px;
  background-color: rgb(157, 137, 119);
  border-radius: 10px;
  border: 2px solid rgb(255, 255, 255);
  transition: top 0ms ease-in-out 200ms, opacity 100ms ease-in-out 200ms,
    transform 20ms ease-in-out 0ms;
  transform: scale(1.05);
}

.closePopup {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 23px;
  height: 23px;
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  text-align: center;
  line-height: 23px;
  border-radius: 15px;
  cursor: pointer;
}

.showMoreLess {
  position: relative;
  width: 50%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 17px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 50px;
  box-shadow: 7px 7px rgba(83, 82, 82, 0.8);
}

.showMoreLess:hover {
  background-color: rgb(97, 82, 68);
  color: white;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/*Responsive*/

@media (max-width: 600px) {
  .orderHistoryContainer {
    padding: 10px;
  }

  .orderPopup {
    width: 250px;
    height: 350px;
    padding: 15px;
  }
}
</style>
