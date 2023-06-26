<!--Página principal do nosso website-->

<template>

  <!--Loading screen, loads everytime we enter the website-->

  <div class="overall2">
    <div :class="{ loadingScreen: true, fadeOut: !isLoading || loadingComplete }" v-if="isLoading && !loadingComplete">
      <p>Welcome to</p>
      <img src="@/assets/loading2.gif" alt="Loading" />
    </div>

    <!--Content afrer loading-->

    <div v-else>
      <div class="overall">
        <Header />
        <Content />
        <ChatBot />
        <Footer />
      </div>
    </div>
  </div>

</template>

<script>

//  Import necessary modules and functions
import Header from "../components/Header.vue";
import Content from "../components/Content.vue";
import ChatBot from "../components/ChatBot.vue";
import Footer from "../components/Footer.vue";
import { getAuth } from "@firebase/auth";
import axios from "axios";

export default{
  name: "HomePage",
  components: { Header, Footer, Content, ChatBot },

  //  Data for home page (loading screen, loading animation, items, favourites)
  data() {
    return {
      isLoading: true,
      loadingComplete: false,
      items: [],
      favourites: [],
    };
  },

  // use mounted lifecycle hook to fetch items from the database
  mounted() {
    this.fetchItems();
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        this.loadingComplete = true;
      }, 500);
    }, 2000); // 2 seconds
  },

  methods: {
    //  Prevent the user from spamming the start button
    startButtonCooldown() {
      this.cooldown = true;
      setTimeout(() => {
        this.cooldown = false;
      }, 500);
    },

    //  Handle the category selected by the user
    handleCategorySelected(category) {
      this.selectedCategory = category;
    },

    //  Fetch items from the database
    fetchItems() {
      this.$store.dispatch("items/fetchItems");
    },
  },

  computed: {
    //  Map items from the store
  },
  items() {
    return this.$store.state.items;
  },

  //  Map favourites from the store
  favourites() {
    return this.$store.state.favourites;
  },

  // use created lifecycle hook to watch for changes in the user authentication state

  // on created, watch for changes in the user authentication state and fetch favourites if the user is authenticated
  created() {
    this.$store.watch(
      () => this.$store.getters.isAuthenticated,
      (isAuthenticated) => {
        if (isAuthenticated) {
          const userId = this.$store.getters.userId;
          this.$store.dispatch("fetchFavourites", userId);
        } else {
        }
      }
    );
  },
};

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
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/*Responsive*/

@media screen and (max-width: 800px){
  .loadingScreen img{
      width: 60%;
  }
}

@media screen and (max-width: 500px){
  .loadingScreen img{
      width: 80%;
  }
}

</style>
