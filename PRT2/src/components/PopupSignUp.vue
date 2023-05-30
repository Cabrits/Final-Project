<template>
    <div class="loginWrapper">
      <div class="loginPopup" id="showLogin">
        <div class="closeLogin" @click="closeS">&times;</div>
        <div class="form">
          <h2 id="popupTitle" style="color: white; font-family: Arial, Helvetica, sans-serif;">Sign Up</h2>
          <div class="formElement">
            <label for="email" style="color: white;"><h4>Email</h4></label>
            <input type="text" id="email" placeholder="Enter Email" v-model="email">
          </div>
          <div class="formElement">
            <label for="name" style="color: white;"><h4>Name</h4></label>
            <input type="text" id="name" placeholder="Enter Name" v-model="name">
          </div>
          <div class="formElement">
            <label for="password" style="color: white;"><h4>Password</h4></label>
            <input type="password" id="password" placeholder="Enter Password" v-model="password">
          </div>
          <div id="pMsg" style="color: white;"></div>
          <p v-if="errMsg">{{errMsg}}</p>
          <div class="formElement">
            <button @click="signUp()" id="signUpBtn" style="font-family: Arial, Helvetica, sans-serif;">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import axios from 'axios';
  export default {
    name: 'PopupLogin',
    data() {
      return {
        email: '',
        name:'',
        password: '',
        errMsg: ''
      };
    },
    methods: {
      closeS() {
        this.$emit('closeS');
      },

      signUp() {
        createUserWithEmailAndPassword(getAuth(), this.email, this.password)
          .then((data) => {
            this.errMsg = 'Successfully registered!';
            const user = {
                user_id: data.user.uid,
                user_name: this.name, // Add the user's name here
                user_email: this.email,
                user_address: '' // Add the user's address here
            };

            axios.post('http://localhost:7777/api/user/create', user)
            .then((response) => {
                console.log('User created in the API:');
                // Handle successful registration and user creation
            })
            .catch((error) => {
                console.error('Failed to create user in the API:');
                // Handle error in user creation in the API
            });
                // Handle successful registration
            })
          .catch((error) => {
            console.log(error.code);
            switch (error.code) {
              case 'auth/invalid-email':
                this.errMsg = 'Invalid email';
                break;
              case 'auth/weak-password':
                this.errMsg = 'Password should be at least 6 characters';
                break;
              default:
                this.errMsg = 'Error occurred during registration';
                break;
            }
          });
      }

    }
  };
</script>


<style scoped>

.loginWrapper{
  width: 100%;
  padding-top: 35px;
  position: absolute;
}




.loginPopup{
  margin-left: auto;
  margin-right: auto;
  z-index: 4;
  display: block;
  position: relative;
  width: 380px;
  line-height: 20px;
  padding: 20px 30px;
  background-color: rgb(186, 200, 165);
  border-radius: 10px;
  border: 1px solid rgb(255, 255, 255);
  transition: top 0ms ease-in-out 200ms, 
              opacity 100ms ease-in-out 200ms, 
              transform 20ms ease-in-out 0ms;
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
}

.form .formElement{
    margin: 13px 0px;
}

.form .formElement label{
    font-size: 14px;
    color: #222;
    font-family: Arial, Helvetica, sans-serif;
}

.form .formElement input[type="text"], 
.form .formElement input[type="password"]{
    margin-top: 5px;
    display: block;
    width: 94%;
    padding: 10px;
    outline: none;
    border: 1px solid #aaa;
    border-radius: 5px;
    color: rgb(78, 75, 75);
}

.form .formElement button{
    width: 100%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 15px;
    background-color: white;
    color: rgb(78, 75, 75);
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
}

.form .formElement a{
    display: block;
    text-align: right;
    font-size: 15px;
    color: #1a79ca;
    text-decoration: none;
    font-weight: 600;
}

</style>