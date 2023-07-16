<!--Login popup when the login button on Header is clicked-->

<template>

  <!--Login Popup-->

  <div class="loginWrapper">
    <div class="loginPopup" id="showLogin">
      <div class="closeLogin" @click="closeL">&times;</div>
      <div class="form">
        <h2 id="popupTitle" style="color: white; font-family: Arial, Helvetica, sans-serif">
          Login
        </h2>
        <div class="formElement">
          <label for="email" style="color: white"><h3>Email</h3></label>
          <input type="text" id="email" placeholder="Enter Email" v-model="email"/>
        </div>
        <div class="formElement">
          <label for="password" style="color: white"><h3>Password</h3></label>
          <input type="password" id="password" placeholder="Enter Password" v-model="password" @keyup.enter="logIn"/>
        </div>
        <div class="showPassword">
          <input type="checkbox" id="showPassword" v-model="showPassword"/>
          <label for="showPassword">Show Password</label>
        </div>
        <div id="pMsg" style="color: white"></div>
        <p v-if="errMsg">{{ errMsg }}</p>
        <div class="formElement">
          <button @click="logIn()" id="loginBtn" style="font-family: Arial, Helvetica, sans-serif">
            Login
          </button>
        </div>

        <!--Alternative methods to login with, such as Google and GitHub-->

        <div class="orLogin">
          <p>--- Or Login With ---</p>
        </div>
        <div class="alternative">
          <button class="altButton" @click="signInWithGoogle()">
            <i class="fa fa-google" aria-hidden="true"></i>
          </button>
          <button class="altButton" @click="signInWithGitHub()">
            <i class="fa fa fa-github" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--Blur the background when Popup is opened-->

  <div v-if="showPopup" class="blur"></div>

</template>

<script>

//  Import necessary modules and functions
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider,} from "firebase/auth";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import apiURL from "../config.js";

export default{
  name: "PopupLogin",

  data() {
    // Data for the component (email, password, error message and show popup)
    return {
      email: "",
      password: "",
      errMsg: "",
      showPopup: true,
      showPassword: false,
    };
  },
  // computed properties for the component (user)
  computed: {
    ...mapState(["user"]),
  },
  //  Methods for the component (close login, login, sign in with GitHub and sign in with Google)
  methods: {
    ...mapActions("user", ["setUser"]),
    ...mapActions("favourites", ["fetchFavourites"]),
    ...mapActions("orders", ["fetchOrders"]),
    ...mapActions("user", ["fetchUser"]),
    // Close the login popup when the close button is clicked emit the closeL event to the parent component
    closeL() {
      this.$emit("closeL");
    },
    //  Login with email and password with Firebase Authentication
    logIn() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(async (data) => {
          //  Get the user id from the Firebase Authentication
          const userId = data.user.uid;
          //  Get the user data from the database
          const userData = (await axios.get(`${apiURL}/user/get/${userId}`))
            .data;
          // handle success
          console.log("User already exists!");
          //  Set the user in the Vuex store and fetch the favourites and orders for the user
          this.setUser(userData);
          this.fetchFavourites(userId);
          this.fetchOrders();
          console.log("Successfully LoggedIn!");
          this.closeL();
        })
        .catch((error) => {
          // handle error messages
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    //  Sign in with GitHub with Firebase Authentication
    signInWithGitHub() {
      const provider = new GithubAuthProvider(); //  Create a new GitHub provider
      const auth = getAuth(); //  Get the Firebase Authentication

      //  Sign in with the GitHub provider
      signInWithPopup(auth, provider)
        .then(async (data) => {
          //  Get the user id from the Firebase Authentication
          const userId = data.user.uid;
          //  Create the user data object
          var userData = {
            user_id: userId,
            user_name:
              data.user.displayName || "placeholderName, Please Change!",
            user_email: data.user.email,
          };

          try {
            // Check if the user exists in your database
            userData = (await axios.get(`${apiURL}/user/get/${userId}`)).data;
            // handle success case
            console.log("User already exists!");
          } catch (error) {
            // handle error case if user does not exist
            if (error.response && error.response.status === 404) {
              // User does not exist, create a new one
              await axios.post(`${apiURL}/user/create`, userData);
              console.log("New user created!");
            } else {
              // handle other errors
              console.error(error);
            }
          }
          //  Set the user in the Vuex store and fetch the favourites and orders for the user
          this.setUser(userData);
          this.fetchFavourites(userId);
          this.fetchOrders();

          //  Close the login popup
          this.closeL();
          console.log("Successfully Logged In!");
        })
        .catch((error) => {
          // handle error messages
          console.log(error.code);
        });
    },
    //  Sign in with Google with Firebase Authentication
    signInWithGoogle() {
      const provider = new GoogleAuthProvider(); //  Create a new Google provider
      const auth = getAuth();
      //  Sign in with the Google provider
      signInWithPopup(auth, provider)
        .then(async (data) => {
          //  Get the user id from the Firebase Authentication
          const userId = data.user.uid;
          //  Create the user data object
          var userData = {
            user_id: userId,
            user_name:
              data.user.displayName || "placeholderName, Please Change!",
            user_email: data.user.email,
          };
          try {
            // Check if the user exists in your database
            userData = (await axios.get(`${apiURL}/user/get/${userId}`)).data;
            // handle success case
            console.log("User already exists!");
          } catch (error) {
            // handle error case if user does not exist
            if (error.response && error.response.status === 404) {
              // User does not exist, create a new one
              await axios.post(`${apiURL}/user/create`, userData);
              console.log("New user created!");
            } else {
              // handle other errors
              console.error(error);
            }
          }
          //  Set the user in the Vuex store and fetch the favourites and orders for the user
          this.setUser(userData);
          this.fetchFavourites(userId);
          this.fetchOrders();
          //  Close the login popup
          this.closeL();
          console.log("Successfully LoggedIn!");
        })
        .catch((error) => {
          // handle error messages
          console.log(error.code);
        });
    },
  },
};
</script>

<style scoped>

/*Login Popup*/

.loginWrapper{
    width: 99%;
    padding-top: 35px;
    position: absolute;
}

.loginPopup{
    z-index: 5;
    display: block;
    position: relative;
    width: 350px;
    line-height: 25px;
    height: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 30px;
    background-color: rgb(204, 197, 185);
    border-radius: 10px;
    border: 2px solid rgb(255, 255, 255);
    transition: top 0ms ease-in-out 200ms, opacity 100ms ease-in-out 200ms,
                transform 20ms ease-in-out 0ms;
    transform: scale(1.05);
}

.closeLogin{
    position: absolute;
    top: 18px;
    right: 18px;
    width: 23px;
    height: 23px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: center;
    line-height: 23px;
    border-radius: 15px;
    cursor: pointer;
}

.form h2{
    text-align: center;
    margin: 10px 0px 20px;
    font-size: 25px;
    user-select: none;
}

.form h3{
    user-select: none;
}

.formElement{
    margin: 13px 0px;
}

.formElement label{
    font-size: 14px;
    color: #222;
    font-family: Arial, Helvetica, sans-serif;
}

.formElement input[type="text"],
.formElement input[type="password"]{
    margin-top: 5px;
    display: block;
    width: 94%;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    outline: none;
    border-radius: 5px;
    color: rgb(78, 75, 75);
    box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    -o-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    font-size: 15px;
    border: none;
}

.formElement button{
    width: 70%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 15px;
    font-weight: 600;
    background-color: white;
    color: rgb(78, 75, 75);
    border-radius: 10px;
    cursor: pointer;
    margin-top: 5px;
    margin-left: 50px;
    box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    -o-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
}

.formElement button:hover{
    background-color: #b5b5b6;
}

.formElement a{
    display: block;
    text-align: right;
    font-size: 15px;
    color: #1a79ca;
    text-decoration: none;
    font-weight: 600;
}

.form p{
    text-align: center;
    font-weight: bold;
}

/*Alternative Logins*/

.orLogin{
    color: white;
    position: relative;
    text-align: center;
    top: 5px;
    font-weight: 600;
    user-select: none;
}

.alternative{
    display: flex;
    flex-direction: row;
    position: relative;
}

.altButton{
    background-color: #fff;
    color: rgb(204, 221, 108);
    display: block;
    height: 50px;
    position: relative;
    width: 50px;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    border: none;
    box-shadow: 6px 4px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 6px 4px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 6px 4px rgba(50, 50, 50, 0.5);
    -o-box-shadow: 6px 4px rgba(50, 50, 50, 0.5);
    cursor: pointer;
}

.altButton:hover{
    background-color: #b5b5b6;
}

.alternative i{
    color: rgb(61, 60, 60);
}

.fa-google::before{
    font-size: 25px;
}

.fa-github::before{
    font-size: 25px;
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
}

/*Responsive*/

@media screen and (max-width: 800px){
  .loginWrapper{
      width: 96%;
  }

  .loginPopup{
      width: 270px;
  }
}

</style>
