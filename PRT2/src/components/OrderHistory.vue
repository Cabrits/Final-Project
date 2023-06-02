<template>
  <div class="orderHistoryContainer">
    <h2>Order History</h2>
    <ul>
      <li v-for="order in orders" :key="order.id">
        <strong>Order ID:</strong> {{ order.id }} | <strong>Date:</strong> {{ order.date }} | <strong>Total:</strong> ${{ order.total }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OrderHistory',
  props: {
    orders: {
      type: Array,
      required: true,
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