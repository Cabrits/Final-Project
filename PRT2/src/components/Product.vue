<template>
  <div>
      <Categories @category-selected="handleCategorySelected"/>
    </div>
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
        <div class="prodPrice">{{ item.item_price }}€</div>
        <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
        <button class="favourite btn" :disabled="cooldown" @click="toggleFavourite(item.item_id)">
          <i class="fa fa-heart" :class="{'red-heart': isFavourite(item.item_id) }"></i>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Categories from './Categories.vue'
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  name: 'Product',
  components: {Categories},
  data() {
    return {
      cooldown: false,
      selectedCategory:null,
    };
  },
  computed: {
    ...mapState(['items', 'favourites']),
    filteredItems() {
      if (this.selectedCategory) {
        return this.$store.state.items.filter((item) => item.item_category === this.selectedCategory);
      } else {
        return this.$store.state.items;
      }
    },
  },
    methods: {
      ...mapActions(['fetchItems','fetchFavourites']),
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
        const result = this.favourites.some((favourite) => favourite.item_id === itemId);
        return result;
      },
      toggleFavourite(itemId) {
        const userId = this.$store.getters.userId;
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
            this.startButtonCooldown();
            this.$store.dispatch('fetchFavourites', userId);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      },
    },
    created() {
      this.fetchItems();
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
    padding: 3rem;
}
.product{
    background-color: rgb(185, 188, 159);
    border-radius: 20px;
    border: 3px solid white;
    width: 350px;
    margin-top: 60px;
    box-shadow: 25px 25px 15px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 25px 25px 15px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 25px 25px 15px  rgba(50, 50, 50, 0.5);
    -o-box-shadow: 25px 25px 15px  rgba(50, 50, 50, 0.5);
    padding: 0;
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
    box-shadow: 10px 13px 8px rgba(83, 82, 82, 0.7);
    -moz-box-shadow: 10px 13px 8px rgba(83, 82, 82, 0.7);
    -webkit-box-shadow: 10px 13px 8px rgba(83, 82, 82, 0.7);
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


</style>