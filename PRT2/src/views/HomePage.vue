<template>

  <!--Loading screen, loads everytime we enter the website-->

  <div>
    <div :class="{ 'loadingScreen': true, 'fadeOut': !isLoading || loadingComplete }" v-if="isLoading && !loadingComplete">
      <p>Welcome to</p>
      <img src="/images/loading2.GIF" alt="Loading" />
    </div>

    <!--Content afrer loading-->

    <div v-else>
      <div class="overall">
        <Header />
        <Content/>
        <ChatBot/>
        <Footer />
      </div>
    </div>

    <!--Part of the Loading screen-->

    <footer class="loading">
      <p :class="{ 'blink': isLoading && !loadingComplete }" v-if="isLoading">Loading...</p>
    </footer>
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
    }, 3000); /*3000 base */
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
      this.$store.dispatch('fetchItems');
    },

    fetchFavourites() {
    const userId = this.$store.getters.userId;
    this.$store.dispatch('fetchFavourites', userId);
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
        console.log('User not logged in');
      }
     }
    );
  }
}

</script>
<!--



export default {
  name: 'Product',
  components: {Categories},
  data() {
    return {
      items: [],
      selectedCategory: null,
      cooldown: false,
      favourites: [],
    };
  },
  mounted() {
    this.fetchFavourites();
    this.fetchItems();
  },
  

      
    },
    isFavourite(itemId) {
      const result = this.favourites.some((favourite) => favourite.item_id === itemId)
      console.log("tested:", itemId,result)
      return result;
    },
    toggleFavourite(itemId) {
      const userId = getAuth().currentUser.uid; // Replace with the actual user ID
      const isItemFavourite = this.isFavourite(itemId);
      const apiUrl = isItemFavourite
        ? `http://localhost:7777/api/user/${userId}/removeFavourite/${itemId}`
        : `http://localhost:7777/api/user/${userId}/addFavourite/${itemId}`;

      axios({
        method: isItemFavourite ? 'DELETE' : 'POST',
        url: apiUrl,
      })
        .then((response) => {
          // Handle success
          console.log('Favourite action performed successfully');
          this.fetchFavourites();
          this.startButtonCooldown();
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },
  },
  computed: {
    filteredItems() {
      if (this.selectedCategory) {
        return this.items.filter((item) => item.item_category === this.selectedCategory);
      } else {
        return this.items;
      }
    },
  },
};



-->


<style scoped>

.loading p{
   color: white;
   text-shadow: 0 0 2px #000000, 0 0 2px #000000;
   font-size: 30px;
   margin-top: 180px;
}

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

.blink{
    animation: blink 1s linear infinite;
    font-size: 30px;
    text-align: center;
    margin-top: 150px;
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

@keyframes blink{
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/*Responsive*/

@media screen and (max-width: 800px){
  .loadingScreen img{
      width: 50%;
  }
}

</style>

