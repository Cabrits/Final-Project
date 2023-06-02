<template>
  <div>
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

    <!-- Popup -->
    
    <div v-if="showPopup" class="popupContainer">
      <div class="popup">
        <h3>All Favorite Items</h3>
        <div class="popupItems">
          <div v-for="(item, index) in favoriteItems" :key="item.id" class="popupItem">
            <div class="itemRow">
              <img :src="item.image" :alt="item.name" class="itemImage" />
              <div class="itemInfo">
                <h4>{{ item.name }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="closeButton">
          <button @click="closePopup">Close</button>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="blur"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteItems: [
        { id: 1, name: 'Item 1', description: 'Description 1', image: '/images/product1.jpg' },
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
    closePopup() {
      this.visibleItems = this.favoriteItems.slice(0, 2);
      this.showPopup = false;
    }
  },
};
</script>

<style scoped>
.favoritesContainer {
  background-color: rgb(185, 188, 159);
  border-radius: 10px;
  border: 2px solid white;
  padding: 10px 50px;
  box-shadow: 25px 25px 22px rgba(50, 50, 50, 0.5);
}

.favoritesContainer h3 {
  text-align: center;
}

.favoritesContainer button {
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

.favoriteItems {
  display: flex;
  flex-direction: row;
}

.itemCard {
  flex-basis: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.itemRow {
  display: flex;
  align-items: center;
}

.itemImage {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}

.itemInfo {
  flex-grow: 1;
}

.showMoreButton {
  margin-top: 10px;
  cursor: pointer;
}

.popupContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup {
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
}

.popupItems {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.popupItem {
  flex-basis: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.closeButton button {
  float: right;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 4;
}

@media screen and (max-width: 1200px) {
  .favoriteItems {
    flex-direction: column;
  }

  .itemCard {
    flex-basis: 100px;
  }
}

@media screen and (max-width: 800px) {
  .favoritesContainer {
    padding: 10px 30px;
  }

  .favoritesContainer button {
    width: 100%;
    margin-left: 0;
  }
}

</style>
