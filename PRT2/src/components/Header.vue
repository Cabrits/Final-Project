<template>

    <header class="headerStyle px1750Size">
        <div class="menuBars">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="logo">
            <img src="images/logo3.png">
            <a href="#"></a>
        </div>
        <div class="menuWrapper">
            <div class="menu">
                <div class="searchBar" id="search">
                    <form >
                        <button type="submit"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                        <input type="text" placeholder="Search Product..." name="search">
                    </form>
                </div> 
                <div class="menuActions">
                    <button class="actions" v-if="user" @click = "loadFavorites(); closeCart();"><i class="fa fa-heart" aria-hidden="true"></i></button>
                    <button class="actions" v-if="user" @click = "loadCart(); closeFavorites();" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    <button class="actions" v-if="user"><i class="fa fa-user" aria-hidden="true"></i></button>
                    <button class="actions" v-if="user" @click="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
                    <div class="btn-group" v-else>
                        <button @click = "loadLogin(); closeSignUp();">Login</button>
                        <button @click = "loadSignUp(); closeLogin();">SignUp</button>
                    </div>
                </div>
            </div>
        </div>

        <PopupFavorites v-if="favorites" @closeF="closeFavorites"/>
        <PopupCart v-if="cart" @closeC="closeCart"/>
        <PopupLogin v-if="login, !user" @closeL="closeLogin"/>
        <PopupSignUp v-if="signup" @closeS="closeSignUp"/>
        
    </header>    

</template>

<script>

import PopupLogin from './PopupLogin.vue'
import PopupSignUp from './PopupSignUp.vue'
import PopupFavorites from './PopupFavorites.vue'
import PopupCart from './PopupCart.vue'
import {ref} from "vue";
import {getAuth, onAuthStateChanged, signOut} from '@firebase/auth';

export default{
    name:'Header',
    components:{PopupLogin, PopupFavorites, PopupCart, PopupSignUp},

    data() {
    return {
        user: null,
    };
    },

    mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        this.user = user;
    });
    },

    setup(){ 

    const favorites = ref(false)
    const cart = ref(false)
    const login = ref(false)
    const signup = ref(false)
    const auth = getAuth();

    const loadFavorites = () => {
        favorites.value = true
    }

    const closeFavorites = () => {
        favorites.value = false
    }

    const loadCart = () => {
        cart.value = true
    }

    const closeCart = () => {
        cart.value = false
    }

    const loadLogin = () => {
        login.value = true
    }

    const closeLogin = () => {
        login.value = false
    }

    const loadSignUp = () => {
        signup.value = true
    }

    const closeSignUp = () => {
        signup.value = false
    }

    const logout = () => {
      signOut(auth)
        .then(() => {
          console.log('Successfully logged out!');
          // Handle successful logout
        })
        .catch((error) => {
          console.error('Failed to logout:', error);
          // Handle error in logout
        });
    }

    return {
        favorites,
        cart,
        login,
        signup,
        loadFavorites,
        closeFavorites,
        loadCart,
        closeCart,
        loadLogin,
        closeLogin,
        loadSignUp,
        closeSignUp,
        logout
    }
    }
}



</script>

<style scoped>


.btn-group button {
  background-color: #04AA6D;
  border: 1px solid green; 
  color: white;
  padding: 10px 24px;
  cursor: pointer;
  display: block; 
}
.btn-group button:not(:last-child) {
  border-bottom: none; 
}

.btn-group button:hover {
  background-color: #3e8e41;
}

.px1750Size{
    margin: auto;
    width: 1780px;
}

input:focus, textarea:focus, select:focus{
    outline: none;
}


/* Menu*/

.headerStyle{
    overflow: hidden;
    /*background-color: rgb(64, 65, 65);*/
    background-color: rgb(186, 200, 165);
    border-radius: 10px;
    border: 1.5px solid white;
}

.menuBars{
    display: none;
}

.menu{
    display: flex;
    height: 80px;
    align-items: center;
}

.logo{
    display: block;
    position: absolute;
    width: 13%;
}

.logo img{
    cursor: pointer;
    width: 119px;
    margin-left: 40px;
    margin-top: 3px;
}

.searchBar{
    outline: none;
    margin-left: 570px;
    width: 35%;
}

.searchBar form{
    position: relative;
    display: flex;
    font-size: 1.1rem;
    height: 40px;
    outline: 0;
    width: 100%;
}

.searchBar button{
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    border-width: 0;
    cursor: pointer;
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    background-color: rgb(149, 161, 132);
  }

.searchBar input{
    width: 100%;
    padding: 10px 12px;
    z-index: 3;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-width: 0;
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    background-color: rgb(165, 176, 147); 
    color: black;
}

/* Parte direita do menu*/

.menuActions{
    margin-left: auto;
    justify-content: space-between;
    font-size: 25px;
}


.actions{
    color: rgb(78, 75, 75);
    background-color: rgb(186, 200, 165);
    padding: 30px 30px;
    font-size: 1em;
    width: 6%;
    border: none;
}

.actions:hover{
    background-color: rgb(149, 161, 132);    
}

.fa-heart:before{
    margin-left: -12px;
    border-color: black;
}

.fa-user::before{
    margin-left: -11px;
}

.fa-shopping-cart{
    margin-left: -15px;
}


/* Responsividade*/

@media screen and (max-width: 1800px){   
    .px1750Size{
        width: 95%;
    }
}


@media screen and (max-width: 800px){   

    .headerStyle{
        height: 80px;
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
        margin-right: 300px;
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


    .searchBar{
        margin: auto;
        margin-top: 30px;
        width: 80%;
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


}




</style>