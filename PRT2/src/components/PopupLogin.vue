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
                <div class="orLogin">
                  <p>---  Or Login With  ---</p>
                </div>
                <div class="alternative">
                    <button class="altButton" @click="signInWithGoogle();"><i class="fa fa-google" aria-hidden="true"></i></button>
                    <button class="altButton" @click="signInWithGoogle();"><i class="fa fa fa-github" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'PopupLogin',
    data() {
      return {
        email: '',
        password: '',
        errMsg: ''
      };
    },
    computed: {
  ...mapState(['favourites', 'user'])
},
  methods: {
    closeL() {
      this.$emit('closeL');
    },
    logIn() {
      
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          const userId = data.user.uid;
          console.log(userId , data)
          this.$store.dispatch('setUser', data.user);
          this.$store.dispatch('fetchFavourites', userId)
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
      const auth = getAuth();

      signInWithPopup(auth, provider)
        .then(async (data) => {
          const userId = data.user.uid;
          console.log(userId, data);

          try {
            // Check if the user exists in your database
            await axios.get(`http://localhost:7777/api/user/${userId}`);

            console.log('User already exists!');
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // User does not exist, create a new one
              const userData = {
                user_id: userId,
                user_name: data.user.displayName,
                user_email: data.user.email,
              };

              await axios.post('http://localhost:7777/api/user/create', userData);
              console.log('New user created!');
            } else {
              console.error(error);
            }
          }
          this.$store.dispatch('setUser', data.user);
          this.$store.dispatch('fetchFavourites', userId);
          this.closeL()
          console.log('Successfully LoggedIn!');
        })
        .catch((error) => {
          console.log(error.code);
        });
      }
    }
};
</script>


<style scoped>



.loginWrapper{
  width: 99%;
  padding-top: 35px;
  position: absolute;
}

.loginPopup{
  z-index: 4;
  display: block;
  position: relative;
  width: 350px;
  line-height: 20px;
  margin-left: auto;
  margin-right: auto;
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
    box-shadow: 7px 5px  rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 7px 5px  rgba(50, 50, 50, 0.2);
    -webkit-box-shadow: 7px 5px  rgba(50, 50, 50, 0.2);
    -o-box-shadow: 7px 5px  rgba(50, 50, 50, 0.2); 
}

.form .formElement button{
    width: 70%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 15px;
    background-color: white;
    color: rgb(78, 75, 75);
    border-radius: 10px;
    cursor: pointer;
    margin-top: 25px;
    margin-left: 50px;
    box-shadow: 7px 5px  rgba(50, 50, 50, 0.2);
}

.form .formElement a{
    display: block;
    text-align: right;
    font-size: 15px;
    color: #1a79ca;
    text-decoration: none;
    font-weight: 600;
}

.orLogin{
  color: white;
  position: relative;
  text-align: center;
  top: 5px;
  font-weight: 600;
}

.alternative{
  display: flex;
  flex-direction: row;
  position: relative;
}

.altButton{
    background-color: #fff;
    color: rgb(204, 221, 108);;
    display: block;
    height: 50px;
    position: relative;
    width: 50px;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    border: none;
    box-shadow: 8px 3px  rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 8px 3px  rgba(50, 50, 50, 0.2);
    -webkit-box-shadow: 8px 3px  rgba(50, 50, 50, 0.2);
    -o-box-shadow: 8px 3px  rgba(50, 50, 50, 0.2);
}

.altButton:hover{
    color: #d5caca;
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


</style>