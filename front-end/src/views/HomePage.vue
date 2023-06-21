<template>

  <!--Loading screen, loads everytime we enter the website-->

  <div class="overall2">
    <div :class="{ 'loadingScreen': true, 'fadeOut': !isLoading || loadingComplete }" v-if="isLoading && !loadingComplete">
      <p>Welcome to</p>
      <img src="@/assets/loading2.gif" alt="Loading" />
    </div>

    <!--Content afrer loading-->

    <div v-else>
      <div class="overall">
        <Header/>
        <Content/>
        <ChatBot/>
        <Footer/>
      </div>
    </div>
  </div>

</template>

<script>

import Header from '../components/Header.vue'
import Content from '../components/Content.vue'
import ChatBot from '../components/ChatBot.vue'
import Footer from '../components/Footer.vue'
import { getAuth } from '@firebase/auth';
import axios from 'axios';



export default {
  name: 'HomePage',
  components: { Header, Footer, Content, ChatBot },

  data() {
    return {
      isLoading: true,
      loadingComplete: false,
      items: [],
      favourites: [],
      nightMode: false,
    };
  },

  mounted() {
    this.fetchItems();
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        this.loadingComplete = true;
      }, 500);
    }, 2000); /*2000 base */
  },

  methods: {

    startButtonCooldown() {
      this.cooldown = true;
      setTimeout(() => {
        this.cooldown = false;
      }, 500);
    },

    handleCategorySelected(category) {
      this.selectedCategory = category;
    },

    fetchItems() {
      this.$store.dispatch('items/fetchItems');
    },

    fetchFavourites() {
    const userId = this.$store.getters.userId;
    this.$store.dispatch('favourites/fetchFavourites', userId);
    },

    toggleNightMode(){
      this.nightMode = !this.nightMode;
    }
  },

  computed:{
  },items() {
    // Retrieve items from the store
    // Replace 'items' with the actual state property name
    return this.$store.state.items;
  },

  favourites() {
    // Retrieve favourites from the store
    // Replace 'favourites' with the actual state property name
    return this.$store.state.favourites;
  },

  created() {
    this.$store.watch(
    () => this.$store.getters.isAuthenticated,
      (isAuthenticated) => {
      if (isAuthenticated) {
        const userId = this.$store.getters.userId;
        this.$store.dispatch('fetchFavourites', userId);
      } else {
      }
     }
    );
  }
}

</script>


<style scoped>

/*Loading screen*/

.loadingScreen{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 130px;
    height: 70vh;
    opacity: 1;
    animation: fadeOut 4s forwards;
}

.loadingScreen img{
    width: 30%;
}

.loadingScreen p{
    top: 5px;
    font-weight: 600;
    font-size: 45px;
    color: rgb(255, 255, 255);
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
}

.fadeOut{
    display: none;
}

/*Animation for the Loading Screen*/

@keyframes fadeOut{
  0% {
    opacity: 1;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/*Responsive*/

@media screen and (max-width: 800px){
  .loadingScreen img{
      width: 50%;
  }
}

</style>

