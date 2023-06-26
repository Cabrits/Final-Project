<!--Sign Up popup when the sign up button on Header is clicked-->

<template>

  <!--Sign Up Popup-->

  <div class="signUpWrapper">
    <div class="signUpPopup" id="showLogin">
      <div class="closeSignUp" @click="closeS">&times;</div>
      <div class="form">
        <h2 id="popupTitle" style="color: white; font-family: Arial, Helvetica, sans-serif">
          Sign Up
        </h2>
        <div class="formElement">
          <label for="email" style="color: white"><h3>Email</h3></label>
          <input type="text" id="email" placeholder="Enter Email" v-model="email"/>
        </div>
        <div class="formElement">
          <label for="name" style="color: white"><h3>Name</h3></label>
          <input type="text" id="name" placeholder="Enter Name" v-model="name"/>
        </div>
        <div class="formElement">
          <label for="password" style="color: white"><h3>Password</h3></label>
          <input type="password" id="password" placeholder="Enter Password" v-model="password" @keyup.enter="signUp"/>
        </div>
        <div id="pMsg" style="color: white"></div>
        <p v-if="errMsg">{{ errMsg }}</p>
        <div class="formElement">
          <button @click="signUp()" id="signUpBtn" style="font-family: Arial, Helvetica, sans-serif">
            Sign Up
          </button>
        </div>
      </div>
    </div>

    <!--Blur the background when Popup is opened-->

    <div v-if="showPopup" class="blur"></div>
  </div>

</template>

<script>

//  Import necessary modules and functions
import apiURL from "../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { mapActions } from "vuex";
import axios from "axios";

export default{
  name: "PopupLogin",
  //  Data for the component (email, name, password, error message and show popup)
  data() {
    return {
      email: "",
      name: "",
      password: "",
      errMsg: "",
      showPopup: true,
    };
  },
  //  Methods for the component (close popup and sign up)
  methods: {
    ...mapActions("user", ["fetchUser"]),
    //  Close the popup when the close button is clicked by emitting the closeS event to the parent component
    closeS() {
      this.$emit("closeS");
    },
    //  Sign up the user with the email and password with Firebase and create the user in the API/database
    signUp() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          //  Handle successful registration
          this.errMsg = "Successfully registered!";
          const user = {
            user_id: data.user.uid,
            user_name: this.name,
            user_email: this.email,
          };
          //  Create the user in the API
          axios
            .post(`${apiURL}/user/create`, user)
            .then((response) => {
              //  Handle successful user creation in the API
              console.log("User created in the API:" + response);
              //  Fetch the user info from the API
              this.fetchUser(data.user.uid);
              //  Close the popup
              this.closeS();
            })
            .catch((error) => {
              console.error("Failed to create user in the API:");
              // Handle error in user creation in the API
              console.error(error);

              //  Delete the user from Firebase
              data.user.delete().then(() => {
                //  Handle successful user deletion from Firebase
                console.log("User deleted from Firebase");
              });
            });
          // Handle successful registration
        })
        .catch((error) => {
          //  Handle error in registration in Firebase
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/weak-password":
              this.errMsg = "Password should be at least 6 characters";
              break;
            default:
              this.errMsg = "Error occurred during registration";
              break;
          }
        });
    },
  },
};

</script>

<style scoped>

/*Sing Up Popup*/

.signUpWrapper{
    width: 99%;
    padding-top: 35px;
    position: absolute;
}

.signUpPopup{
    z-index: 5;
    display: block;
    position: relative;
    width: 350px;
    line-height: 20px;
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

.closeSignUp{
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
    margin-top: 25px;
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
  .signUpWrapper{
      width: 96%;
  }

  .signUpPopup{
      width: 270px;
      height: 400px;
  }
}
</style>
