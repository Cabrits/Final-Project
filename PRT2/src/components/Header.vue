<template>
        <header class="headerStyle px1750Size">
        <div class="menuBars" :class="{ active: showMenu }" @click="toggleMenu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="logo">
            <router-link :to="'/'">
                <img src="../assets/logo3.png">
             </router-link>
        </div>
        <div class="menuWrapper">
            <div class="menu" :class="{ active: showMenu }">
                <SearchBar/>
                <div class="menuActions">
                    <button class="actions" v-if="user" @click = "loadFavorites(); closeCart();"><font-awesome-icon icon="fa-solid fa-bell"/></button>
                    <button class="actions" v-if="user" @click = "loadCart(); closeFavorites();" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    <router-link :to="'/user'">
                        <button class="actions" v-if="user"><i class="fa fa-user" aria-hidden="true"></i></button>
                    </router-link>
                    <button class="actions2" v-if="user" @click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
                    <div class="btnGroup" v-else>
                        <button class="buttonLS" @click = "loadLogin(); closeSignUp();">Login</button>
                        <button class="buttonLS2" @click = "loadSignUp(); closeLogin();">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    </header> 

  <PopupFavorites v-if="favorites" @closeF="closeFavorites" />
  <PopupCart v-if="cart" @closeC="closeCart" />
  <PopupLogin v-if="login" @closeL="closeLogin" />
  <PopupSignUp v-if="signup" @closeS="closeSignUp" />
</template>

<script>
import PopupLogin from './PopupLogin.vue';
import PopupSignUp from './PopupSignUp.vue';
import PopupFavorites from './PopupFavorites.vue';
import PopupCart from './PopupCart.vue';
import SearchBar from './searchBar.vue';
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { mapState } from 'vuex';

export default {
  name: 'Header',
  components: {
    PopupLogin,
    PopupFavorites,
    PopupCart,
    PopupSignUp,
    SearchBar,
  },

  data() {
    return {
      showMenu: false,
      cart:false,
      login:false,
      signup:false,
      favorites:false
    };
  },

  computed: {
    ...mapState(['favourites', 'user']),
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },

  methods: {
    loadFavorites() {
      this.favorites = true;
    },
    closeFavorites() {
      this.favorites = false;
    },
    loadCart() {
      this.cart = true;
    },
    closeCart() {
      this.cart = false;
    },
    loadLogin() {
      this.login = true;
    },
    closeLogin() {
      this.login = false;
    },
    loadSignUp() {
      this.signup = true;
    },
    closeSignUp() {
      this.signup = false;
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log('Successfully logged out!');
          this.$store.dispatch('clearUser');
          // Handle successful logout
        })
        .catch((error) => {
          console.error('Failed to logout:', error);
          // Handle error in logout
        });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>


<style scoped>

.px1750Size{
    margin: auto;
    width: 1780px;
}

input:focus, textarea:focus, select:focus{
    outline: none;
}

/* Menu*/

.headerStyle{
    background-color: rgb(186, 200, 165);
    border-radius: 10px;
    border: 1.5px solid white;
    display: flex;
}

.menuBars{
    display: none;
}

.menuWrapper{
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

.menu{
    display: flex;
    height: 80px;
    align-items: center;
}

.menu.active{
    display: flex;
}

.logo{
    display: block;
    position: relative;
    width: 13%;
    margin-left: 25px;
    padding-top: 3px;
}

.logo img{
    cursor: pointer;
    width: 119px;
}

/* Right Side of the Menu */

.menuActions{
    margin-left: auto;
    justify-content: space-between;
    font-size: 16px;

}


.actions{
    color: rgb(78, 75, 75);
    background-color: rgb(186, 200, 165);
    margin: auto;
    padding: 20px 20px;
    border: none;
    font-size: 21px;
}

.actions2{
    color: rgb(78, 75, 75);
    background-color: rgb(186, 200, 165);
    padding: 20px 20px;
    font-size: 1em;
    border: none;
    margin-left: 25px;
    margin-right: 15px;
    font-size: 21px;
}

.actions:hover{
    background-color: rgb(149, 161, 132);    
    border-radius: 10px;
}

.actions2:hover{
    background-color: rgb(149, 161, 132); 
    padding-left: 20px;   
    border-radius: 10px;
}


.btnGroup{
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
    background-color: #FAFBFC;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    box-sizing: border-box;
    color: #24292E;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
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
}

.buttonLS2 {
    position: absolute;
    appearance: none;
    background-color: #FAFBFC;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    box-sizing: border-box;
    color: #24292E;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
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
    right: 15px;
}

.buttonLS:hover {
  background-color: rgb(185, 188, 159);
  text-decoration: none;
  transition-duration: 0.1s;
}

.buttonLS2:hover {
  background-color: rgb(185, 188, 159);
  text-decoration: none;
  transition-duration: 0.1s;
}


/* Responsive */

@media screen and (max-width: 1800px){   
    .px1750Size{
        width: 95%;
    }
}


@media screen and (max-width: 800px){   

    .headerStyle{
        height: 80px;
        display: block;
    }

    .menuBars{
        display: block;
        cursor: pointer;
        float: right;
        margin-top: 20px;
        margin-right: 15px;
    }

    .menuBars .line{
        width: 30px;
        height: 3px;
        background: rgb(78, 75, 75);
        margin: 7px 0;
        border-radius: 25px;
    }

    .menuWrapper{
        margin: auto;
        max-width: 500px;
        margin-right: 500px;
    }

    .menu{
        z-index: 4;
        position: absolute;
        top: 95px;
        flex-direction: column;
        height: 150px;
        width: 92.5%;
        background: rgb(186, 200, 165);
        transition: 0.2s;
        border-radius: 10px;
        border: 1.5px solid white;
    }

    .menu {
        transition: opacity 0.5s ease;
        opacity: 0;
    }

    .menu.active{
        opacity: 1;
    }
  
    .menuActions{
        margin: auto;
        display: flex;
        margin-top: -20px;
        width: 80%;
    }

    .actions{
        margin: auto;
    }

    .btn-group{
        width: 100px;
        gap: 40px;
        margin-right: auto;
        margin-left: auto;
        padding-right: 0;
    }

    .buttonLS{
        right: 80px;
        top: 10px;
    }

    .buttonLS2{
        top: 10px;
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

</style>