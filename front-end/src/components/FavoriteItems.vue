<template>

  <div>

    <!--Box containing only 2 favorite items-->

    <div class="favoritesContainer">
      <h2>Favorite Items</h2>
      <div class="favoriteItems">
        <div class="itemCard" v-for="(item, index) in visibleItems" :key="item.id">
          <div class="itemRow">
            <img :src="item.item_image" :alt="item.item_name" class="itemImage" />
              <div class="itemInfo">
                <router-link class="removeLink" :to="'/item/' + item.item_id">
                  <h5>{{ item.item_name }}</h5>
                </router-link>
                <p>{{ item.item_description.slice(0,25) }}...</p>
              </div>

          </div>
        </div>
      </div>
      <div v-if="showMoreButton" class="showMoreButton" @click="showAllItems">
        <button>Show More</button>
      </div>
    </div>

    <!-- Popup containing the rest of the items if the user has more than 2 -->
    
    <div class="popupContainer" v-if="showPopup">
      <div class="popup">
        <div class="closePopup" @click="closePopup()">&times;</div>
        <h3>All Favorite Items</h3>
        <div class="popupItems">
          <div class="popupItemCard" v-for="(item, index) in favourites" :key="item.id">
            <div class="itemRow">
              <img :src="item.item_image" :alt="item.item_name" class="itemImage" />
              
                <div class="itemInfo">
                  <router-link class="removeLink" :to="'/item/' + item.item_id">
                    <h5>{{ item.item_name }}</h5>
                  </router-link>
                  <p>{{ item.item_description.slice(0,25) }}...</p>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

     <!--Blur the background when Popup is opened-->

    <div v-if="showPopup" class="blur"></div>
  </div>

</template>

<script>
import { mapState } from 'vuex';
export default{
  data() {
    return {
      showPopup: false,
    };
  },

  computed: {
    ...mapState({
      favourites: state => state.favourites.favourites,
    }),
    visibleItems() {
      return this.favourites.slice(0, 2);
    },
    showMoreButton() {
      return this.favourites.length > this.visibleItems.length;
    },
  },

  methods: {
    showAllItems() {
      this.showPopup = true;
    },

    closePopup(){
      this.showPopup = false;
    }
  },
};
</script>

<style scoped>

/*Favorites Box*/

.favoritesContainer{
    background-color: rgb(157, 137, 119);
    border-radius: 10px;
    border: 2px solid white;
    padding: 24px 20px;
    box-shadow: 25px 25px 10px rgba(50, 50, 50, 0.6);
}

.favoritesContainer h2{
    margin-top: 3px;
    text-align: center;
    color: white;
    text-shadow: 0 0 2px #000000, 0 0 2px #000000;
    padding-bottom: -10px;
}

.favoritesContainer button{
    width: 70%;
    height: 40px;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: white;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 50px;
    margin-left: 70px;
    box-shadow: 8px 8px rgba(83, 82, 82, 0.7);
}

.favoritesContainer button:hover{
    background-color: rgb(97, 82, 68);
    color: white;
}

.favoriteItems{
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.itemCard{
    flex-basis: 100px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(248, 246, 244);
    box-shadow: 10px 13px 3px rgba(83, 82, 82, 0.8);
}

.itemRow{
    display: flex;
    align-items: center;
}

.itemImage{
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 10px;
}

.itemInfo{
    flex-grow: 1;
}

.itemInfo p{
    line-height: 18px;
}

/*Favorites Popup, if there more than 2*/

.popupContainer {
    position: absolute;
    z-index: 999;
    transform: translate(-15%, -100%);
}

.popup {
    background: white;
    display: block;
    position: relative;
    width: 720px;
    height: 500px;
    border-radius: 10px;
    background-color: rgb(157, 137, 119);
    border: 2px solid white;
    padding-bottom: 40px;
    margin: 0 auto;
}

.popup h3{
    text-align: center;
    font-weight: 600;
    color:white;
}

.closePopup{
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

.popupItems{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 450px;
    overflow-y: auto;
    scrollbar-width: thin;
}

.popupItemCard{
    flex-basis: 300px;
    height: 110px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: white;
}

/*Blur what's behind the popup when opened*/ 

.blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 4;
}

.removeLink{
    text-decoration: none;
    color: inherit;
}

.removeLink h5{
  line-height: 15px;
}

/*Responsive*/

@media screen and (max-width: 1200px) {

  .popupContainer{
      top: 40%;
  }
}


@media screen and (max-width: 1000px) {
  .favoritesContainer {
      height: 440px;
  }

  .favoriteItems{
    flex-direction: column;
    margin-left: 0;
    margin-top: -10px;
  }

  .itemCard{
    flex-basis: 100px;
  }

  .favoritesContainer button {
      width: 60%;
      margin-top: 75px;
      margin-left: 160px;
  }

  .popupContainer{
      top: 140%;
      left: 20%;
      width: 90%;
  }

  .popup{
      max-width: 90%;
  }
  
}

@media screen and (max-width: 800px) {

  .favoritesContainer button {
      width: 60%;
      margin-top: 75px;
      margin-left: 120px;
  }
}

@media screen and (max-width: 450px) {

  .favoritesContainer button {
      width: 60%;
      margin-left: 70px;
      margin-top: 65px;
  }
}

</style>
