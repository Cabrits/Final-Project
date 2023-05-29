<template>

    <div class="loginWrapper">
        <div class="loginPopup" id="showLogin">
            <div class="closeLogin" @click="closeL">&times;</div>
            <div class="form">
                <h2 id="popupTitle" style="color: white; font-family: Arial, Helvetica, sans-serif;">Login</h2>
                <div class="formElement">
                    <label for="email" style="color: white;"><h4>Email</h4></label>
                    <input type="text" id="email" placeholder="Enter Email" v-model="email">
                </div>
                <div class="formElement">
                    <label for="password" style="color: white;"><h4>Password</h4></label>
                    <input type="password" id="password" placeholder="Enter Password" v-model="password">
                </div>
                <div id="pMsg" style="color: white;"></div>
                <div class="formElement">
                    <button @click="logIn()" id="loginBtn" style="font-family: Arial, Helvetica, sans-serif;" >Login</button>
                </div>
                <p v-if="errMsg">{{errMsg}}</p>
                <div class="formElement">
                    <button id ="signUpBtn" style="display: none; font-family: Arial, Helvetica, sans-serif;" >Sign Up</button>
                </div>
                <div class="alternative">
                    <p>---Or---</p>
                    <button @click="signInWithGoogle();"><i class="fa fa-google" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default {
  name: 'PopupLogin',
  data() {
    return {
      email: '',
      password: '',
      errMsg: ''
    };
  },
  methods: {
    closeL() {
      this.$emit('closeL');
    },
    logIn() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          console.log('Successfully LoggedIn!');
          this.closeL()
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case 'auth/invalid-email':
              this.errMsg = 'Invalid email';
              break;
            default:
              this.errMsg = 'Email or password was incorrect';
              break;
          }
        });
    },

    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
          .then((result)=> {
              console.log("nicer")
              console.log(result.user);
          })
          .catch((error)=>{
            console.log("error")
      })
    }
  }
};
</script>

<!--
<script>

export default{
    name:'PopupLogin',

    methods: {
    closeL() {
      this.$emit('closeL');
    }
  }
}
</script> -->


<style scoped>

.loginWrapper{
    margin-left: auto;
    margin-right: auto;
    width: 960px;
}

.loginPopup{
    z-index: 4;
    top: 350px;
    display: block;
    position: absolute;
    width: 380px;
    line-height: 20px;
    margin-left: 480px;
    transform: translate(-50%, -50%) scale(1.25);
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