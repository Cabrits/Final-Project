<!--Product Cards displayed on the Home Page-->

<template>

  <!--Show particularly products when a certain category is selected-->

  <div>
    <Categories @category-selected="handleCategorySelected"/>
  </div>

  <!--Product Card-->

  <div class="productsDisplay">
    <div class="product" v-for="item in filteredItems" :key="item.id">
      <router-link :to="'/item/' + item.item_id">
        <img :src="item.item_image">
        <h2>{{ item.item_name }}</h2>
        <div class="prodInfo">
          <span>{{ item.item_description }}</span>
        </div>
      </router-link>
      <div class="prodButtons">
        <div class="prodPrice">{{ (item.item_price * (1-item.item_discount)).toFixed(2) }}€</div>
        <button class="cart btn" @click="addToCart(item)"><i class="fa fa-shopping-cart"></i></button>
        <button class="favourite btn" :disabled="cooldown" @click="toggleFavourite(item.item_id)">
          <i class="fa fa-heart" :class="{'red-heart': isFavourite(item.item_id) }"></i>
        </button>
      </div>
    </div>

    <!--Notifications when adding items to the cart or to the favorites-->

    <div v-if="cartNotification" class="notification">Item added to cart</div>
    <div v-if="favoriteNotification" class="notification">Item added to favorites</div>
  </div>

</template>

<script>

import axios from 'axios';
import Categories from './Categories.vue'
import { mapState, mapActions, mapGetters } from 'vuex';
import baseURL from '../config.js'

export default{
  name: 'Product',
  components: {Categories},

  data() {
    return {
      cooldown: false,
      selectedCategory: null,
      cartNotification: false,
      favoriteNotification: false
    };
  },

  computed: {
    ...mapState(['items']),
    ...mapState(['favourites']),
    ...mapGetters('user',['userId']),
    filteredItems() {
      console.log("safag")
      console.log(this.items.items)
      if (this.selectedCategory) {
        return this.items.items.filter((item) => item.item_category === this.selectedCategory);
      } else {
        return this.items.items;
      }
    },
  },

  methods: {
    ...mapActions('items',['fetchItems']),
    ...mapActions('favourites',['fetchFavourites']),
    startButtonCooldown() {
      this.cooldown = true;
      setTimeout(() => {
        this.cooldown = false;
      }, 500);
    },

    handleCategorySelected(category) {
      this.selectedCategory = category;
    },

    isFavourite(itemId) {
      const result = this.favourites.favourites.some((favourite) => favourite.item_id === itemId);
      return result;
    },

    toggleFavourite(itemId) {
      console.log(baseURL)
      const userId = this.userId;
      const isItemFavourite = this.isFavourite(itemId);
      const apiUrl = isItemFavourite
        ? `${baseURL}/user/${userId}/removeFavourite/${itemId}`
        : `${baseURL}/user/${userId}/addFavourite/${itemId}`;

      axios({
        method: isItemFavourite ? 'DELETE' : 'POST',
        url: apiUrl,
      })
        .then((response) => {
          // Handle success
          this.startButtonCooldown();
          this.$store.dispatch('favourites/fetchFavourites', userId);
          this.favoriteNotification = true; 
          setTimeout(() => {
            this.favoriteNotification = false; 
          }, 2000);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },
    
    addToCart(item) {
      this.$store.dispatch('cart/addToCart', item);
      this.cartNotification = true; 
      setTimeout(() => {
        this.cartNotification = false;
      }, 2000);
    },
  },

  created() {
    this.fetchItems();
  },
};

</script>

<style scoped>

/*Product Card*/

.productsDisplay{
    display: flex;
    flex-wrap: wrap;
    flex-grow: row;
    justify-content: space-around;
    padding: 3rem;
}
.product{
    background-color: rgb(64, 61, 57);
    border-radius: 20px;
    border: 3px solid rgb(248, 246, 244);
    width: 350px;
    margin-top: 60px;
    padding: 0;
    transition: 2.5s;
    box-shadow: 25px 25px 10px rgba(50, 50, 50, 0.8);
}

/*Potencial Idea*/

.product:nth-child(2n+1){
    transform: perspective(1200px) rotateY(5deg);
    box-shadow: 17px 20px 8px rgba(50, 50, 50, 0.7);
}

.product:nth-child(2n){
    transform: perspective(1200px) rotateY(-5deg);
    box-shadow: -17px 20px 8px rgba(50, 50, 50, 0.7);
}

.product:hover:nth-child(2n){
    transform: none;
    transition: 1.5s;
    z-index: 100;
    box-shadow: 17px 20px 8px rgba(50, 50, 50, 0.7);
}

.product:hover:nth-child(2n+1){
    transform: none;
    transition: 1.5s;
    z-index: 100;
    box-shadow: -17px 20px 8px rgba(50, 50, 50, 0.7);
}

.product a{
    text-decoration: none;
}

.product img{
    width: 250px;
    height: 300px;
    margin-left: 50px;
    margin-top: 40px;
    border: 1px solid rgba(83, 82, 82, 0.3);
    border-radius: 10px;
    box-shadow: 10px 10px 4px rgba(176, 168, 155, 0.7);
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.cart{
    width: 160px;
}

.favourite{
    width: 40px;
    border-radius: 50%;
    margin-right: 20px;
    align-items: center;
    justify-content: center
}

.favourite i{
  margin-left: 11px;
  margin-top: 2px;
}

.btn::before{
    content: "";
    position: absolute;
    top: 49%;
    left: 49.9%;
    transform: translate(-50%,-50%);
    border: 1px solid rgb(185, 188, 159);
    height: 43px;
    transition: 0.3s;
    display: none;
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
    display: block;
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

/*Color change on the heart when pressed*/

.red-heart::before{
    color: rgb(255, 127, 127)!important;;
}

/*Notification*/

.notification{
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0);
  color: white;
  font-weight: bold;
  border-radius: 10px;
  transition:  0.5s;
  z-index: 999;
}

/*Responsive*/

@media screen and (max-width: 480px){
  .product{
      transform: none;
  }

  .product:nth-child(2n+1){
      transform: perspective(1200px) rotateY(0deg);
      box-shadow: 25px 25px 15px rgba(50, 50, 50, 0.5);
  }

  .product:nth-child(2n){
      transform: perspective(1200px) rotateY(0deg);
      box-shadow: 25px 25px 15px rgba(50, 50, 50, 0.5);
  }

  .product:hover:nth-child(2n+1){
      box-shadow: 25px 25px 15px rgba(50, 50, 50, 0.5);
  }
  
  .product{
      width: 300px;
  }

  .cart{
    width: 140px;
  } 
  
  .product img{
      width: 200px;
      height: 250px;
  }

  .btn::before{
      height: 43px;
  }

  .cart::before{
      width: 145px;
      border-radius: 50px;
  }
}


</style>