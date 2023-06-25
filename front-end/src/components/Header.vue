<!--Header containing useful actions such as, login, sign up, search bar, etc-->

<template>
  <!--Header-->

  <header class="headerStyle px1750Size">
    <!--Menu when it's responsive-->

    <div class="menuBars" :class="{ active: showMenu }" @click="toggleMenu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <!--Our website Logo-->

    <div class="logo">
      <router-link :to="'/'">
        <img src="@/assets/logo4.png" />
      </router-link>
    </div>

    <!--The rest of the header, containing the Search Bar component-->

    <div class="menuWrapper">
      <div class="menu" :class="{ active: showMenu }">
        <SearchBar />
        <div class="menuActions">
          <button
            class="actions"
            v-if="userAuth"
            :class="{ active: notification, hover: notificationHover }"
            @click="toggleNotification(), closeCart()"
          >
            <font-awesome-icon icon="fa-solid fa-bell" />
          </button>
          <button
            class="actions"
            v-if="userAuth"
            :class="{ active: showCart, hover: cartHover }"
            @click="
              toggleCart();
              closeNotification();
            "
          >
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          </button>
          <router-link class="actions" :to="'/user'" v-if="userAuth">
            <button class="userB">
              <i class="fa fa-user" aria-hidden="true"></i>
            </button>
          </router-link>
          <button class="actions2" v-if="userAuth" @click="logout()">
            <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
          </button>
          <div class="btnGroup" v-else>
            <button
              class="buttonLS"
              @click="
                loadLogin();
                closeSignUp();
              "
            >
              Login
            </button>
            <button
              class="buttonLS2"
              @click="
                loadSignUp();
                closeLogin();
              "
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!--Popup components-->

  <PopupNotification v-if="notification" @closeN="closeNotification" />
  <PopupCart v-if="showCart" @closeC="closeCart" />
  <PopupLogin v-if="showLogin" @closeL="closeLogin" />
  <PopupSignUp v-if="showSignup" @closeS="closeSignUp" />
</template>

<script>
//  Import necessary modules and functions
import PopupLogin from "./PopupLogin.vue";
import PopupSignUp from "./PopupSignUp.vue";
import PopupNotification from "./PopupNotification.vue";
import PopupCart from "./PopupCart.vue";
import SearchBar from "./SearchBar.vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",

  components: {
    PopupLogin,
    PopupNotification,
    PopupCart,
    PopupSignUp,
    SearchBar,
  },
  //  Data for the component (show menu, show cart, show login, show sign up, notification and notification hover)
  data() {
    return {
      showMenu: false,
      showCart: false,
      showLogin: false,
      showSignup: false,
      notification: false,
      notificationHover: false,
    };
  },
  //  Computed properties for the component (user authentication)
  computed: {
    ...mapState("user", ["userAuth"]),
  },
  // use mounted() lifecycle hook to change the user authentication state in the store based on the user authentication state in Firebase
  mounted() {
    const auth = getAuth();
    // if auth state changes, set the user authentication state in the store
    onAuthStateChanged(auth, (user) => {
      this.setUserAuth(user);
    });
  },
  //  Methods for the component (close notification, close cart, load login, close login, load sign up, close sign up, logout, toggle menu, toggle notification and toggle cart)
  methods: {
    ...mapActions("user", ["setUserAuth"]),
    ...mapActions("user", ["clearUser"]),
    ...mapActions("cart", ["clearCart"]),
    ...mapActions("favourites", ["clearFavourites"]),
    ...mapActions("orders", ["clearOrders"]),

    // methods to close popup components
    closeNotification() {
      this.notification = false;
    },
    closeCart() {
      this.showCart = false;
    },
    loadLogin() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
    },
    loadSignUp() {
      this.showSignup = true;
    },
    closeSignUp() {
      this.showSignup = false;
    },

    //  Logout the user from Firebase and clear the user, cart, favourites and orders in the store
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          //  Handle successful logout
          console.log("Successfully logged out!");
          this.clearUser(); // Dispatch the clearUser action
          this.clearCart(); // Dispatch the clearCart action
          this.clearFavourites(); // Dispatch the clearFavourites action
          this.clearOrders(); // Dispatch the clearOrders action
          // redirect to home page
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Failed to logout:", error);
          // Handle error in logout
        });
    },
    //  Toggle the menu, notification and cart popups
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    toggleNotification() {
      this.notification = !this.notification;
      this.notificationHover = false;
    },

    toggleCart() {
      this.showCart = !this.showCart;
      this.showCartHover = false;
    },
  },
};
</script>

<style scoped>
/*Responsive*/

.px1750Size {
  margin: auto;
  width: 1780px;
}

/*To remove the outline color when searching or clicking the search button*/

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

/*Header*/

.headerStyle {
  background-color: rgb(58, 56, 53);
  border-radius: 10px;
  border: 2px solid rgb(224, 224, 224);
  display: flex;
  overflow: hidden;
}

.menuBars {
  display: none;
}

/*Logo*/

.logo {
  display: flex;
  align-items: center;
  position: relative;
  width: 13%;
  margin-left: 25px;
  padding-top: 3px;
}

.logo img {
  cursor: pointer;
  max-width: 119px;
  width: 100%; 
}

/*Menu*/

.menuWrapper {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.menu {
  display: flex;
  height: 80px;
  align-items: center;
}

.menu.active {
  display: flex;
}

/*Right Side of the Menu*/

.menuActions {
  margin-left: auto;
  justify-content: space-between;
  font-size: 16px;
}

.actions {
  color: rgb(255, 255, 255);
  background-color: rgb(58, 56, 53);
  margin: auto;
  padding: 20px 20px;
  border: none;
  font-size: 21px;
  cursor: pointer;
}

.userB {
  color: rgb(255, 255, 255);
  background-color: inherit;
  border: none;
  font-size: 21px;
  cursor: pointer;
}

.userB:hover {
  color: rgb(58, 56, 53);
}

.actions2 {
  color: rgb(255, 255, 255);
  background-color: rgb(58, 56, 53);
  padding: 20px 20px;
  font-size: 1em;
  border: none;
  margin-left: 25px;
  margin-right: 15px;
  font-size: 21px;
}

.actions2:hover {
  background-color: rgb(248, 237, 227);
  padding-left: 20px;
  border-radius: 10px;
  color: rgb(58, 56, 53);
}

.actions:hover,
.actions.active {
  background-color: rgb(248, 237, 227);
  border-radius: 10px;
  color: rgb(58, 56, 53);
}

.actions.hover:hover {
  background-color: rgb(248, 237, 227);
  color: 58, 56, 53;
}

/*Login and Sign Up buttons*/

.btnGroup {
  position: block;
  display: flex;
  width: 200px;
  cursor: pointer;
  padding-right: 20px;
  gap: 30px;
}

.buttonLS {
  position: absolute;
  appearance: none;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 510;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  right: 10px;
  margin-left: auto;
  box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
  -webkit-box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
  -o-box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
}

.buttonLS2 {
  position: relative;
  appearance: none;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
    rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 510;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
  right: 15px;
  box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
  -moz-box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
  -webkit-box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
  -o-box-shadow: 5px 5px rgba(50, 50, 50, 0.5);
}

.buttonLS:hover {
  background-color: rgb(248, 237, 227);
  text-decoration: none;
  transition-duration: 0.1s;
}

.buttonLS2:hover {
  background-color: rgb(248, 237, 227);
  text-decoration: none;
  transition-duration: 0.1s;
}

/*Responsive*/

@media screen and (max-width: 1800px) {
  .px1750Size {
    width: 95%;
  }
}

@media screen and (max-width: 800px) {
  .headerStyle {
    height: 80px;
    display: block;
  }

  .logo img {
    padding-top: 5px;
    max-width: none;
    width: 100px;
  }

  .menuBars {
    display: block;
    cursor: pointer;
    float: right;
    margin-top: 20px;
    margin-right: 15px;
  }

  .menuBars .line {
    width: 30px;
    height: 3px;
    background: rgb(255, 255, 255);
    margin: 7px 0;
    border-radius: 25px;
  }

  .menuWrapper {
    margin: auto;
    max-width: 500px;
    margin-right: 500px;
  }

  /*New menu when it's responsive*/

  .menu {
    z-index: 4;
    position: absolute;
    top: 95px;
    flex-direction: column;
    height: 150px;
    width: 92%;
    transition: 0.2s;
    border-radius: 10px;
    border: 1.5px solid white;
    transition: display 0.5s ease;
    opacity: 0;
    display: none;
    background-color: rgb(58, 56, 53);
  }

  .menu.active {
    opacity: 1;
  }

  .menuActions {
    display: flex;
    width: 100%;
    margin-bottom: 7px;
  }

  .actions2 {
    margin-left: -5px;
  }

  .btnGroup {
    margin-right: auto;
    margin-left: auto;
    gap: 40px;
    padding-right: 0 !important;
  }

  .buttonLS {
    bottom: 10px;
  }

  .buttonLS2 {
    bottom: 10px;
  }

  .menuBars .line {
    transition: transform 0.3s ease;
  }

  .menuBars.active .line:nth-child(1) {
    transform: rotate(-45deg) translate(-6px, 7px);
  }

  .menuBars.active .line:nth-child(2) {
    opacity: 0;
  }

  .menuBars.active .line:nth-child(3) {
    transform: rotate(45deg) translate(-6px, -7px);
  }
}

@media screen and (max-width: 500px) {
  .menu {
    width: 91%;
  }
}
</style>
