<template>
  <div class="orderHistoryContainer">
    <h2>Order History</h2>
    <ul>
      <li v-for="order in orders" :key="order.order_id">
        <strong>Order ID:</strong> {{ order.order_id }} | <strong>Date:</strong> {{ order.order_date }} | <strong>Total:</strong> ${{ order.order_total }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderHistory',
  computed: {
    orders() {
      return this.$store.getters.getOrders;
    },
  },
};
</script>

<style scoped>
.orderHistoryContainer{
background-color: rgb(185, 188, 159);
border-radius: 10px;
border: 2px solid white;
padding: 10px 50px;
box-shadow: 25px 25px 22px rgba(50, 50, 50, 0.5);
}

</style>