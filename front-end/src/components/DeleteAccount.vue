<!--Component of UserPage to Delete Account-->

<template>

  <!--Delete Account-->

  <div class="deleteContainer">
    <h2>Delete Account</h2>
    <div class="deleteButton">
      <button @click="deleteUser">Delete Account</button>
    </div>
  </div>

</template>

<script>

import { mapState, mapActions } from "vuex";
import baseURL from "../config.js";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
//  Export the component
export default{
  // computed properties for the component (user)
  computed: {
    ...mapState("user", ["user", "userId"]),
    ...mapActions("user", ["clearUser"]),
    ...mapActions("cart", ["clearCart"]),
    ...mapActions("favourites", ["clearFavourites"]),
    ...mapActions("orders", ["clearOrders"]),
  },
  //  Methods for the component (edit user, save user, close)
  methods: {
    // 
    async deleteUser() {
      const answer = confirm("Are you sure you want to delete your account?");
      if (answer) {
        console.log("DELETE USER !!");
        const apiUrl = `${baseURL}/user/delete/${this.user.user_id}`;
        try {
          const response = await axios.delete(apiUrl);
          if (response.status) {
            alert("Succesfully deleted user, you will be redirected");
            const auth = getAuth();
            signOut(auth)
              .then(() => {
                this.clearUser();
                this.clearCart();
                this.clearFavourites();
                this.clearOrders();
              })
              .catch((error) => {
                console.error("Failed to logout:", error);
                // Handle error in logout
              });
            this.$router.push("/");
          }
        } catch (error) {
          console.error(error);
          alert(
            "We're sorry, something went wrong. please contact us or try again later"
          );
        }
      }
    },
  },
};

</script>

<style scoped>

/*Payment Box*/

.deleteContainer{
    background-color: rgb(97, 82, 68);
    border-radius: 10px;
    border: 2px solid white;
    padding: 10px 70px;
    box-shadow: 25px 25px 10px rgba(50, 50, 50, 0.6);
    color: white;
}

.deleteContainer h2{
    text-align: center;
}

.deleteButton{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.deleteButton button{
    margin-top: 60px;
    margin-bottom: 60px;
    align-self: center;
    position: relative;
    border: none;
    outline: none;
    background-color: white;
    color: #000000;
    border-radius: 50px;
    font-size: 22px;
    cursor: pointer;
    width: 300px;
    height: 45px;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
}

.deleteButton button:hover{
    background-color: rgb(163, 31, 31);
    color: white;
}

@media screen and (max-width: 480px){
  
  .deleteButton button{
      width: 200px;
  }

}

</style>


