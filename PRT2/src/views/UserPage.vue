<template>
  <Header/>

  <div class="userAccount">
    <div class="main-content">
      <UserInformation :user="user"/>
      <FavoriteItems :favorites="favorites"/>
      <OrderHistory :orders="orders" />
      <PaymentMethods :paymentMethods="paymentMethods"/>
    </div>
  </div>

  <Footer/>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import UserInformation from '../components/UserInformation.vue';
import OrderHistory from '../components/OrderHistory.vue';
import FavoriteItems from '../components/FavoriteItems.vue';
import PaymentMethods from '../components/PaymentMethods.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'UserPage',
  components: { UserInformation, OrderHistory, FavoriteItems, PaymentMethods, Header, Footer },

  data() {
    return {
      user: {
        name: 'Joe Mama',
        email: 'joemama@joemama.com',
        address: 'Joe Mama Town',
      },
      orders: [
        { id: 1, date: '2023-05-01', total: 49.99 },
        { id: 2, date: '2023-04-20', total: 89.99 },
        { id: 3, date: '2023-03-15', total: 29.99 },
      ],
      favorites: ['Item 1', 'Item 2', 'Item 3'],
      paymentMethods: ['Credit Card', 'PayPal', 'Apple Pay'],
    };
  },
  beforeRouteEnter(to, from, next) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      next('/');
    } else {
      next();
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.$router.push('/');
      }
    });
  },
};
</script>

<style scoped>
.userAccount {
  max-width: 1300px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding-top: 50px;
  line-height: 33px;
}

.main-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
}

@media screen and (max-width: 1500px) {
  .main-content {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .userAccount {
    padding-top: 30px;
    line-height: 28px;
  }
}

</style>
