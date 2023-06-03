<template>
  <div>
    <div :class="{ 'loadingScreen': true, 'fadeOut': !isLoading || loadingComplete }" v-if="isLoading && !loadingComplete">
      <p>Welcome to</p>
      <img src="/images/loading.gif" alt="Loading" />
    </div>

    <div v-else>
      <div class="overall">
        <Header />
        <Content :items="items" :favourites="favourites"/>
        <Footer />
      </div>
    </div>

    <footer>
      <p :class="{ 'blink': isLoading && !loadingComplete }" v-if="isLoading">Loading...</p>
    </footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Content from '../components/Content.vue'
import Footer from '../components/Footer.vue'
import { getAuth } from '@firebase/auth';
import axios from 'axios';

export default {
  name: 'HomePage',
  components: { Header, Footer, Content },

  data() {
    return {
      isLoading: true,
      loadingComplete: false,
      items: [],
      favourites: [],
    };
  },

  mounted() {
    this.fetchItems();
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        this.loadingComplete = true;
      }, 500);
    }, 1000); /*3000 base */
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
    async fetchItems() {
      axios
        .get('http://localhost:7777/api/items')
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchFavourites(userId) {
      try {
        const response = await axios.get(`http://localhost:7777/api/user/${userId}/favourites`);
        this.favourites = response.data;
        console.log('Fetched favourites:', this.favourites);
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        this.fetchFavourites(userId);
      } else {
        console.log('User not logged in');
      }
    });
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
.blink {
  animation: blink 1s linear infinite;
  font-size: 30px;
  text-align: center;
  margin-top: 150px;
}

@keyframes blink {
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

.loadingScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 130px;
  height: 70vh;
  opacity: 1;
  animation: fadeOut 4s forwards;
}

@keyframes fadeOut {
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

.loadingScreen img {
  width: 30%;
}

.loadingScreen p {
  top: 5px;
  font-weight: 600;
  font-size: 45px;
}

.fadeOut {
  display: none;
}

@media screen and (max-width: 800px) {
  .loadingScreen img {
    width: 50%;
  }
}

</style>

