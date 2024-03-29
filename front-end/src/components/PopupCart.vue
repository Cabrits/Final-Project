<!--Shopping Cart popup when the cart icon on Header is clicked-->

<template>

  <!--Shopping Cart Popup-->

  <div class="cartStyle">
    <div class="px1750Size">
      <div class="cartWrapper">
        <div class="arrow"></div>
        <div class="cartPopup" id="showCart">
          <div class="closeCart" @click="closeC">&times;</div>
          <h2>Your Cart</h2>
          <ul class="cartItems">
            <li v-for="item in cartItems" :key="item.item_id">
              <span class="cartQuantity">{{ item.quantity }}x</span>{{ item.item_name }}
              <div class="cartPrice">
                {{ (item.item_price * (1 - item.item_discount)).toFixed(2) * item.quantity }}€
              </div>
              <button class="cartRemove" @click="removeFromCart(item)"> &times;</button>
            </li>
          </ul>
          <div class="cartTotal">
            <p>
              Total: <span>{{ cartTotal.toFixed(2) }}€</span>
            </p>
          </div>
          <router-link class="lineRemove" :to="'/checkout'">
            <button class="checkoutButton">Checkout</button>
          </router-link>
        </div>
      </div>
    </div>

    <!--Blur the background when Popup is opened on mobile-->

    <div v-if="showPopup" class="blur"></div>
  </div>

</template>

<script>

//  Import necessary modules and functions
import { mapState, mapActions } from "vuex";

export default{
  name: "PopupCart",
  // data for the component (show popup)
  data() {
    return {
      showPopup: true,
    };
  },
  // computed properties for the component (cart items and cart total)
  computed: {
    ...mapState("cart", ["cartItems"]),
    //  Calculate the total price of the items in the cart adding the discount if there is one
    cartTotal() {
      return this.cartItems.reduce(
        (total, item) =>
          total +
          (item.item_price * (1 - item.item_discount)).toFixed(2) *
            item.quantity,
        0
      );
    },
  },
  // methods for the component (close popup and remove from cart)
  methods: {
    ...mapActions("cart", ["removeFromCart"]),
    //  Close the popup when the close button is clicked by emitting the closeC event to the parent component
    closeC() {
      this.$emit("closeC");
    },
  },
};

</script>

<style scoped>

/*Shopping Cart Popup*/

.cartStyle{
    position: absolute;
    width: 99%;
}

.px1750Size{
    position: relative;
    margin: auto;
    width: 1750px;
}

.cartWrapper{
    position: relative;
    z-index: 5;
    top: 5px;
}

.cartPopup{
    position: relative;
    display: block;
    height: 415px;
    width: 400px;
    padding-top: 50px;
    background-color: rgb(64, 61, 57);
    transition: right 0.3s;
    border: 1px solid white;
    border-radius: 10px;
    color: black;
    box-shadow: 35px 45px 25px rgba(50, 50, 50, 0.5);
    float: right;
}

.cartPopup h2{
    font-size: 22px;
    text-align: center;
    margin-top: -20px;
    color: white;
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.closeCart{
    position: absolute;
    top: 13px;
    right: 11px;
    width: 23px;
    height: 23px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: center;
    line-height: 23px;
    border-radius: 50%;
    cursor: pointer;
}

.closeCart:hover{
    background-color: rgb(235, 237, 232);
}

.cartItems{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
    overflow-y: auto;
    scrollbar-width: thin;
    height: 250px;
    margin-bottom: 5px;
}

.cartItems a{
    text-decoration: none;
    color: black;
    margin-top: -40px;
    right: 11px;
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    font-size: 20px;
    font-weight: 100;
}

.cartItems a:hover{
    background-color: rgb(149, 161, 132);
}

.cartItems li{
    position: relative;
    padding: 1rem;
    border-top: 1px solid;
    font-weight: 700;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
}

.cartItems li:first-child{
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.cartItems li:nth-child(2n){
    background-color: rgb(248, 234, 221);
}

.cartItems li:nth-child(2n + 1){
    background-color: rgb(231, 214, 199);
}

.cartItems li:last-child{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.cartItems span{
    font-weight: 550;
    color: rgb(255, 255, 255);
    margin-right: 10px;
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.cartPrice{
    margin-top: 8px;
    margin-left: 29px;
    color: white;
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.cartRemove{
    position: absolute;
    font-size: 20px;
    right: 1rem;
    border-radius: 10px;
    border-width: 0;
    cursor: pointer;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 8px 10px;
    text-align: center;
    transition: all 400ms;
    margin-top: -43px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(133, 131, 131);
}

.cartRemove:hover{
    background-color: rgb(204, 202, 202);
}

.cartTotal{
    font-weight: 700;
    padding: 0.5rem;
    text-align: center;
    color: white;
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.cartTotal span{
    margin-left: 10px;
    color: rgb(255, 255, 255);
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.cartTotal span::after{
    content: "";
    display: table;
    clear: both;
}

.checkoutButton{
    display: block;
    width: 200px;
    margin: auto;
    border: none;
    outline: none;
    border-radius: 50px;
    height: 40px;
    font-size: 1rem;
    background-color: white;
    cursor: pointer;
}

.checkoutButton:hover{
    background-color: rgb(248, 237, 227);
}

.lineRemove{
    text-decoration: none;
}

/*Arrow poiting to the cart icon on header*/

.arrow{
    z-index: 100;
    position: absolute;
    top: -10px;
    right: 172px;
    border-bottom: 10px solid rgb(64, 61, 57);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
}

/*Blur what's behind the popup when opened*/

.blur{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 4;
    display: none;
}

/*Responsive*/

@media (max-width: 1800px){
  .px1750Size{
      max-width: 97%;
      padding-right: 100px;
  }
}

@media (max-width: 800px){
  .arrow{
      display: none;
  }

  .cartPopup{
      width: 420px;
      float: none;
      margin-left: auto;
      margin-right: auto;
      top: 90px;
  }

  .blur{
    display: block;
  }

  .px1750Size{
      padding: 0 1px;
  }
}

@media screen and (max-width: 500px){
  .cartPopup{
      width: 320px;
      top: 90px;
  }
}
</style>
