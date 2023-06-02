<template>
  <div>
      <Categories @category-selected="handleCategorySelected"/>
    </div>
  <div class="productsDisplay">
    <div v-for="item in filteredItems" :key="item.id" class="product">
      <img :src="item.item_image">
      <a href="#"><h2>{{ item.item_name }}</h2></a>
      <div class="prodInfo">
        <span>{{ item.item_description }}</span>
      </div>
      <div class="prodButtons">
        <div class="prodPrice">{{ item.item_price }}€</div>
        <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
        <button
          class="favourite btn heartAnimation"
          :disabled="cooldown"
          @click="toggleFavourite(item.item_id)"
        >
          <i class="fa fa-heart" :class="{'red-heart': isFavourite(item.item_id) }"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Categories from './Categories.vue'
import { getAuth } from '@firebase/auth';
import { ref } from 'vue';
/*

  data() {
    return {
      selectedCategory: "category1",
    };
  },
  methods: {
    
  },

*/
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
        this.fetchFavourites();
    },
    async fetchFavourites() {
      
      console.log("i am here")
      var userId = getAuth().currentUser;
      console.log(userId)
    
      if(userId!=null){
        userId = userId.uid;
        axios
          .get(`http://localhost:7777/api/user/${userId}/favourites`)
          .then((response) => {
            this.favourites = response.data;
            console.log("fetched Favourites")
            console.log(this.favourites)
            
          })
          .catch((error) => {
            console.error(error);
          });
      }else{
        console.log("user not logged in")
      }

      
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
</script>

<style scoped>

.red-heart::before{
  color: rgb(255, 127, 127)!important;;
}

.productsDisplay{
    display: flex;
    flex-wrap: wrap;
    flex-grow: row;
    justify-content: space-around;
    padding: 5rem;
}
.product{
    background-color: rgb(185, 188, 159);
    border-radius: 20px;
    border: 1px solid white;
    width: 350px;
    margin-top: 60px;
    /*border: 2px solid rgb(194, 192, 192);*/
    box-shadow: 35px 45px 25px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 35px 45px 25px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 35px 45px 25px  rgba(50, 50, 50, 0.5);
    -o-box-shadow: 35px 45px 25px  rgba(50, 50, 50, 0.5);
}

.product a{
    text-decoration: none;
}

.product img{
    width: 300px;
    height: 200px;
    margin-left: 23px;
    margin-top: 20px;
    border-radius: 20px;
    box-shadow: 10px 13px 8px rgba(83, 82, 82, 0.3);
    -moz-box-shadow: 10px 13px 8px rgba(83, 82, 82, 0.3);
    -webkit-box-shadow: 10px 13px 8px rgba(83, 82, 82, 0.3);
}

.product h2{
    width: 100%;
    text-align: center;
    color:white;
}

.prodInfo{
    display: flex;
    align-items: center;
    padding: 20px;  
    color: white;
    font-weight: 500;
}

.prodInfo span{              
    display: inline-block;
    width: 305px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: -10px;
    line-height: 1.5rem;
    text-align:center;
}

.prodButtons{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.prodButtons i{
    color: black;
    font-size: 20px;
    text-align: center;
}

.prodPrice{
    font-weight: 700;
    color: #fff;
    margin-left: 35px;
}

.btn{
    position: relative;
    border: none;
    outline: none;
    background-color: white;
    color: #fff;
    height: 40px;
    border-radius: 50px;
    font-size: 0.9rem;
    cursor: pointer;
}

.cart{
    width: 160px;
}

.favourite{
    width: 40px;
    border-radius: 50%;
    margin-right: 20px;
}

.btn::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid rgb(185, 188, 159);
    height: 45px;
    transition: 0.3s;
}

.cart::before{
    width: 165px;
    border-radius: 50px;
}

.favourite::before{
    width: 45px;
    border-radius: 50%;
}

.btn:hover::before{
    border-color: white;
}

.prodButtons .fa-heart:before{
    padding: 1.15rem;
    font-size: 1.2rem;
    color: rgb(78, 75, 75);
    margin-left: -11.5px;
}

.prodButtons .fa-shopping-cart:before{
    color: rgb(78, 75, 75);
}

.heartAnimation.liked{
    animation: liked .4s ease;
}


/*Animation*/

@keyframes liked {
    0% {
      transform: scale(.8);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
}

</style>