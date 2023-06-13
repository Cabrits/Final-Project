<template>

  <div>

    <!--Box containing only 2 favorite items-->

    <div class="favoritesContainer">
      <h3>Favorite Items</h3>
      <div class="favoriteItems">
        <div class="itemCard" v-for="(item, index) in visibleItems" :key="item.id">
          <div class="itemRow">
            <img :src="item.image" :alt="item.name" class="itemImage" />
            <div class="itemInfo">
              <h4>{{ item.name }}</h4>
              <p>{{ item.description }}</p>
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
          <div class="popupItemCard" v-for="(item, index) in favoriteItems" :key="item.id">
            <div class="itemRow">
              <img :src="item.image" :alt="item.name" class="itemImage" />
              <div class="itemInfo">
                <h4>{{ item.name }}</h4>
                <p>{{ item.description }}</p>
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

export default{
  data() {
    return {
      favoriteItems: [
        { id: 1, name: 'Adventure Note', description: 'df', image: '/images/adventurenote.png' },
        { id: 2, name: 'Item 2', description: 'Description 2', image: '/images/product2.jpg' },
        { id: 3, name: 'Item 1', description: 'Description 1', image: '/images/product3.jpg' },
        { id: 4, name: 'Item 2', description: 'Description 2', image: '/images/product3.jpg' },
        { id: 5, name: 'Item 1', description: 'Description 1', image: '/images/product2.jpg' },
        { id: 6, name: 'Item 2', description: 'Description 2', image: '/images/product1.jpg' },
        
      ],
      visibleItems: [],
      showPopup: false,
    };
  },

  computed: {
    showMoreButton() {
      return this.favoriteItems.length > this.visibleItems.length;
    },
  },

  mounted() {
    this.visibleItems = this.favoriteItems.slice(0, 2);
  },

  methods: {
    showAllItems() {
      this.visibleItems = this.favoriteItems;
      this.showPopup = true;
      this.visibleItems = this.favoriteItems.slice(0, 2);
    },

    closePopup(){
      this.visibleItems = this.favoriteItems.slice(0, 2);
      this.showPopup = false;
    }
  },
};
</script>

<style scoped>

/*Favorites Box*/

.favoritesContainer{
    background-color: rgb(162, 178, 159);
    border-radius: 10px;
    border: 2px solid white;
    padding: 24px 20px;
    box-shadow: 25px 25px 22px rgba(50, 50, 50, 0.5);
    height: 308px;
}

.favoritesContainer h3{
    text-align: center;
    color: white;
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
    margin-bottom: 10px;
    margin-top: 20px;
    margin-left: 90px;
    box-shadow: 7px 7px rgba(50, 50, 50, 0.2);
}

.favoriteItems{
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.itemCard{
    flex-basis: 300px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgb(248, 246, 244);
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
    line-height: 10px;
}

.showMoreButton{
    margin-top: 25px;
    cursor: pointer;
}

.popupContainer {
    position: absolute;
    z-index: 999;
    transform: translate(-55%, -60%);
}

/*Favorites Popup, if there more than 2*/

.popup {
    background: white;
    display: block;
    position: relative;
    width: 700px;
    border-radius: 10px;
    background-color: rgb(162, 178, 159);
    border: 2px solid white;
    padding-bottom: 40px;
    margin: 0 auto;
}

.popup h3{
    text-align: center;
    font-weight: 600;
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
}

.popupItemCard{
    flex-basis: 300px;
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

/*Responsive*/

@media screen and (max-width: 1200px) {
  .favoriteItems {
      flex-direction: column;
  }

  .itemCard {
      flex-basis: 100px;
  }

  .popupContainer{
      top: 60%;
  }
}


@media screen and (max-width: 1000px) {
  .favoritesContainer {
      padding: 10px 30px;
  }

  .favoritesContainer button {
      width: 100%;
      margin-left: 0;
  }

  .popupContainer{
      top: 80%;
      left: 55%;
      width: 80%;
  }

  .popup{
      max-width: 90%;
      padding: 15px;
  }
}

</style>
