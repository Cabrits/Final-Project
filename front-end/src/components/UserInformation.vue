<template>

  <!--Overall User Information-->

  <div>

    <!--Container box with information-->

    <div class="infoContainer">
      <h2>Your Information</h2>
      <p><strong>Email:</strong> <span class="email">{{ user.user_email }}</span></p>
      <p><strong>Name:</strong> {{ user.user_name }}</p>
      <p><strong>Address:</strong> {{ user.user_address }}</p>
      <button @click="editUser">Edit</button>
    </div>

    <!--Popup to change information if needed-->

    <div class="userPopupContainer" v-if="showPopup">
      <div class="popupUser">
        <button @click="close()" class="closeButton">&times;</button>
        <div class="changeInfo">
          <h3>Change Your Information</h3>
          <label for="email">Email</label>
          <label >{{ editedUser.user_email }}</label>
          <label for="name">Name</label>
          <input id="name" v-model="editedUser.user_name" type="text" placeholder="Enter your name" />
          <label for="address">Address</label>
          <input id="address" v-model="editedUser.user_address" type="text" placeholder="Enter your address" />
        </div>
        <div class="saveButton">
          <button @click="saveUser">Save</button>
        </div>
      </div>
    </div>

    <!--Blur the background when Popup is opened-->

    <div v-if="showPopup" class="blur"></div>

  </div>
</template>

  
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      editedUser: {
        user_name: '',
        user_email: '',
        user_address: '',
      },
      showPopup: false,
    };
  },
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['updateUser']),
    editUser() {
      this.showPopup = true;
      console.log(this.user)
      this.editedUser = this.user ;
      console.log(this.editedUser)
    },
    async saveUser() {
      try {
        console.log("testesteete:",this.editedUser)
        await this.updateUser(this.editedUser);
        this.editUser();
        this.showPopup = false;
      } catch (error) {
        console.error(error);
      }
    },
    close() {
      this.showPopup = false;
    },
  },
};
</script>
  


<style scoped>

/*Info box*/

.infoContainer{
    background-color: rgb(97, 82, 68);
    color: white;
    border-radius: 10px;
    border: 2px solid white;
    padding: 10px 50px;
    box-shadow: 25px 25px 10px rgba(50, 50, 50, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.infoContainer h2{
    text-align: center;
}

.infoContainer button{
    width: 70%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top: 20px;
    box-shadow: 8px 6px 3px rgba(255, 255, 255, 0.5);
}

.infoContainer button:hover{
    background-color: rgb(157, 137, 119);
    color: white;
}

/*Popup to change information*/

.userPopupContainer{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
}

.popupUser{
    display: block;
    position: relative;
    background-color: rgb(185, 188, 159);
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    height: 400px;
    width: 100%;
    border-radius: 10px;
    border: 2px solid white;
}

.changeInfo{
    display: flex;
    flex-direction: column;
    margin-top: -15px;
}

.changeInfo h3{
    text-align: center;
    padding-top: -5px;
    font-size: 25px;
}

.changeInfo label{
    font-weight: 550;
    margin-left: 17px;
    margin-bottom: 5px;
    margin-top: 5px;
}

.changeInfo input{
    display: block;
    font-size: 15px;
    margin-left: 17px;
    border-radius: 5px;
    outline: none;
    padding: 8px;
    box-shadow: 7px 5px rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 7px 5px rgba(50, 50, 50, 0.2);
    -webkit-box-shadow: 7px 5px rgba(50, 50, 50, 0.2);
    -o-box-shadow: 7px 5px rgba(50, 50, 50, 0.2);
}

.saveButton button{
    width: 70%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 40px;
    margin-left: 60px;
    box-shadow: 7px 5px rgba(50, 50, 50, 0.2);
}

.saveButton{
    font-weight: 700;
}

.saveButton button:hover{
    background-color: lightgray;
}

.closeButton{
    border: none;
    background: white;
    font-size: 20px;
    width: 23px;
    height: 23px;
    cursor: pointer;
    float: right;
    border-radius: 15px;
    line-height: 1px;
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

@media (max-width: 800px){
  .infoContainer{
      padding: 10px 20px;
  }

  .infoContainer button{
     width: 90%;
  }

  .popupUser{
      max-width: 320px;
  }
}

@media (max-width: 480px){
  .infoContainer{
      padding: 10px;
  }

  .infoContainer button{
      width: 100%;
  }

  .popupUser{
      max-width: 280px;
  }
}

</style>

