<!--User Page that containes 4 boxes with information about the user-->

<template>
  <Header/>

  <div class="userAccount">
    <div class="main-content">
      <UserInformation :user="user" />
      <FavoriteItems :favorites="favorites" />
      <OrderHistory :orders="orders" />
      <DeleteAccount :deleteButton="deleteButton"/>
    </div>
  </div>

  <Footer/>
</template>

<script>
// Import necessary modules and functions
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import UserInformation from "../components/UserInformation.vue";
import OrderHistory from "../components/OrderHistory.vue";
import FavoriteItems from "../components/FavoriteItems.vue";
import DeleteAccount from "../components/DeleteAccount.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  //  Map components
  name: "UserPage",
  components: {
    UserInformation,
    OrderHistory,
    FavoriteItems,
    DeleteAccount,
    Header,
    Footer,
  },

  //  Before the route is entered, check if the user is authenticated
  beforeRouteEnter(to, from, next) {
    const auth = getAuth();
    const user = auth.currentUser;
    // If the user is not authenticated, redirect to the home page
    if (!user) {
      next("/");
    } else {
      next();
    }
  },

  //  Before the component is created, check if the user is authenticated
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //  If the user is not authenticated, redirect to the home page
      if (!user) {
        this.$router.push("/");
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
  padding-top: 15px;
  line-height: 32px;
  padding-bottom: 15px;
}

.main-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
}

/*Responsive*/

@media screen and (max-width: 1500px) {
  .main-content {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
  }

  .userAccount {
    width: 95%;
  }
}

@media screen and (max-width: 1100px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .userAccount {
    padding-top: 30px;
    line-height: 28px;
  }
}

@media screen and (max-width: 480px) {
  .userAccount {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-content{
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

}

</style>

