<template>
  <div class="overall">
    <!-- Logo -->
    <div class="logo">
      <img src="../assets/logo3.png" alt="" />
    </div>

    <!-- Checkout Container -->
    <div class="checkoutPage">
      <h1>Checkout</h1>
      <form ref="checkoutForm" @submit.prevent="handleSubmit">
        <div class="formGroup">
          <label for="email">Email:</label>
          <label type="email" id="email">{{ user.user_email }}</label>
        </div>
        <div class="formGroup">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>

        <div class="formGroup">
          <label for="email">Address:</label>
          <input type="address" id="address" v-model="address" required />
        </div>
        <div class="formGroup">
          <div class="inputContainer">
            <label for="card-number">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              v-mask="'#### #### #### ####'"
              maxlength="19"
              v-model="cardNumber"
              pattern="[0-9\s]*"
              inputmode="numeric"
              placeholder="xxxx xxxx xxxx xxxx"
              required
            />
            <div class="cardIcon" :class="cardIcon"></div>
          </div>
        </div>
        <div class="formGroup">
          <div class="expiryCVV">
            <div class="expiry">
              <label for="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                v-model="expiryDate"
                maxlength="5"
                v-mask="'##/##'"
                placeholder="xx/xx"
                required
              />
            </div>
            <div class="cvv">
              <label for="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                v-model="cvv"
                maxlength="3"
                placeholder="xxx"
                required
              />
            </div>
          </div>
        </div>

        <!-- Cart Items -->
        <div class="itemListContainer">
          <h2>Items:</h2>
          <div class="itemList">
            <ul>
              <li v-for="item in cartItems">
                <span>{{ item.quantity }}x </span>{{ item.item_name }} -
                {{
                  (item.item_price * (1 - item.item_discount)).toFixed(2) *
                  item.quantity
                }}€
              </li>
            </ul>
          </div>
          <div class="totalPrice">
            <p>
              Total: <span>{{ cartTotal }}€</span>
            </p>
          </div>
        </div>
        <button class="submitBtn" type="submit">Submit</button>
      </form>
    </div>

    <!-- Go Back Button -->
    <div class="goBackBtn">
      <router-link class="lineRemove" :to="'/'">
        <button class="backButton">
          <span>&larr;</span><span class="goBackText">Go Back</span>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
// Import necessary modules and functions
import { mapState, mapActions } from "vuex";

//  Export the checkout page
export default {
  //  data for the checkout form (card number, expiry date, cvv, name, address, email)
  data() {
    return {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: "",
      address: "",
      email: "",
    };
  },

  // computed properties for the checkout page (user, cart items, cart total, card icon)
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("cart", ["cartItems"]),

    //  Calculate the cart total with the discount
    cartTotal() {
      return this.cartItems
        .reduce(
          (total, item) =>
            total +
            (item.item_price * (1 - item.item_discount)).toFixed(2) *
              item.quantity,
          0
        )
        .toFixed(2);
    },

    //  Calculate the card icon based on the first digit of the card number
    cardIcon() {
      const firstDigit = this.cardNumber.charAt(0);
      if (firstDigit === "4") {
        return "fa fa-cc-visa";
      } else if (firstDigit === "5" || firstDigit === "2") {
        return "fa fa-cc-mastercard";
      } else if (firstDigit === "3") {
        return "fa fa-cc-amex";
      } else {
        return "fa-solid fa-credit-card";
      }
    },
  },

  //  Before the component is created, fill the form with the user's information
  created() {
    this.address = this.user.user_address;
    this.name = this.user.user_name;
  },

  //  Methods for the checkout page (checkout, handle submit)
  methods: {
    //  Map actions for the orders and cart modules
    ...mapActions("orders", ["createOrder"]),
    ...mapActions("cart", ["clearCart"]),

    //  Checkout function
    checkout() {
      // Get the form
      const form = this.$refs.checkoutForm;
      if (form.checkValidity()) {
        // Form is valid, submit it
        this.handleSubmit();
      } else {
        // Form is invalid, display error messages and don't submit
        console.log("Form is invalid");
      }
    },

    //  Handle submit function
    async handleSubmit() {
      //  Check if the cart is empty
      if (this.cartTotal <= 0) {
        //  If the cart is empty, display an alert message
        alert("the cart is empty , please add items to it before checking out");
      } else {
        // create the order items object
        const orderItems = this.cartItems.map((item) => ({
          item_id: item.item_id,
          item_name: item.item_name,
          item_amount: item.quantity,
          item_price_at_time: (
            item.item_price *
            (1 - item.item_discount)
          ).toFixed(2),
        }));

        //  Create the order object
        const order = {
          order_id: null,
          order_date: null,
          order_user_id: this.user.user_id,
          order_user_name: this.name,
          order_user_email: this.user.user_email,
          order_user_address: this.address,
          order_cardNumber: this.cardNumber,
          order_cardExpiration: this.expiryDate,
          order_cardCcv: this.cvv,
          order_total: this.cartTotal,
          items: orderItems,
        };

        //  Create the order in the vuex store , display an alert message , clear the cart and redirect to the home page
        await this.createOrder(order).then(
          alert(
            "the order has been made and store! , you can check it in the user page"
          )
        );
        this.clearCart();
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
/*Overall*/

.overall {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 200px;
  margin-top: 55px;
}

/*Logo*/

.logo {
  margin-right: 20px;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 500px;
  max-width: 100%;
  height: auto;
}

/*Checkout Content*/

.checkoutPage {
  max-width: 600px;
  padding: 20px;
  background-color: rgb(58, 56, 53);
  border-radius: 10px;
  border: 2px solid white;
  color: white;
}

.checkoutPage h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.checkoutPage form {
  display: grid;
  gap: 20px;
}

.formGroup {
  display: flex;
  flex-direction: column;
}

.formGroup label {
  font-weight: bold;
  text-shadow: 0 0 2px #000000, 0 0 2px #000000;
  margin-left: 20px;
  margin-bottom: 2px;
}

input[type="text"],
input[type="email"],
input[type="address"],
input[type="email"]:focus,
input[type="address"]:focus {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-size: 16px;
  margin-top: 10px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.expiryCVV {
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  width: 69%;
  text-align: center;
}

.expiry,
.cvv {
  flex: 1;
}

.expiry input[type="text"],
.cvv input[type="text"] {
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-size: 14px;
}

.submitBtn {
  padding: 10px 20px;
  background-color: rgb(136, 117, 94);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  width: 65%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.inputContainer {
  margin-left: 5px;
}

.inputContainer label {
  margin-left: 15px;
}

.inputContainer input {
  width: 80%;
  margin-left: 15px;
}

.cardIcon {
  margin-left: 23px;
  font-size: 30px;
}

.submitBtn:hover {
  background-color: rgb(204, 189, 171);
  color: black;
}

#cvv {
  width: 20%;
  margin-left: 15px;
}

#expiryDate {
  width: 20%;
  margin-left: 15px;
}

/*Items Review*/

.itemListContainer {
  max-width: 500px;
  padding: 20px;
  background-color: rgb(95, 93, 88);
  border-radius: 10px;
  color: white;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.itemList {
  height: 100px;
  margin-top: 5px;
  overflow-y: auto;
  scrollbar-width: thin;
  width: 100%;
}

.itemListContainer h2 {
  color: white;
  font-size: 20px;
  margin-top: 0;
  text-align: center;
}

.itemList ul {
  list-style-type: none;
  padding-left: 0;
}

.itemList li {
  font-size: 17px;
  margin-top: 10px;
}

.itemList li span {
  font-weight: bold;
}

.totalPrice p {
  font-weight: bold;
  text-align: center;
}

/*Go back Button*/

.goBackText {
  margin-left: 10px;
}
.goBackBtn {
  position: absolute;
  top: 20px;
  left: 20px;
}

.backButton {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: rgb(58, 56, 53);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.backButton:hover {
  color: white;
}

.lineRemove {
  text-decoration: none;
}

/*Responsive*/

@media screen and (max-width: 1000px) {
  .goBackBtn {
    position: static;
    margin-top: -150px;
    margin-bottom: 20px;
  }
  .checkoutPage {
    padding: 20px;
    margin-top: -120px;
  }

  form {
    gap: 10px;
  }

  .overall {
    flex-direction: column;
    align-items: center;
  }

  .logo {
    margin-right: 0;
  }

  .logo img {
    width: 300px;
  }
}
</style>
