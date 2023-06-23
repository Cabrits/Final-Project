<!--Notification popup when the notification icon on Header is clicked-->

<template>
  <!--Notification Popup-->

  <div class="notificationStyle">
    <div class="px1750Size">
      <div class="notificationWrapper">
        <div class="notificationPopup" id="showNotification">
          <div class="closeNotification" @click="closeN">&times;</div>
          <h2>Notifications</h2>
          <ul class="notificationItems">
            <li
              v-for="favourite in filteredFavourites"
              :key="favourite.item_id"
            >
              <router-link class="router" :to="'/item/' + favourite.item_id">
                {{ favourite.item_name }}
              </router-link>
              <span class="notificationQuantity"> is on discount!</span>
              <div class="notificationOldPrice">
                {{ favourite.item_price }}€
              </div>
              <div class="notificationPrice">
                {{
                  (
                    favourite.item_price *
                    (1 - favourite.item_discount)
                  ).toFixed(2)
                }}€ {{ (favourite.item_discount * 100).toFixed(2) }}% off
              </div>
            </li>
          </ul>
          <button class="clearButton">Clear</button>
        </div>
        <div class="arrow"></div>
      </div>
    </div>

    <!--Blur the background when Popup is opened on mobile-->

    <div v-if="showPopup" class="blur"></div>
  </div>
</template>

<script>
//  Import necessary modules and functions
import { mapState } from "vuex";

export default {
  name: "PopupNotification",
  // data for the component (show popup)
  data() {
    return {
      showPopup: true,
    };
  },
  // computed properties for the component (filtered favourites)
  computed: {
    // Import necessary modules and functions
    ...mapState("favourites", ["favourites"]),

    // Filter favourites to show only the ones with discount
    filteredFavourites() {
      return this.favourites.filter(
        (favourite) => favourite.item_discount != null
      );
    },
  },
  // methods for the component (close notification and clear favourites)
  methods: {
    // Emit event to close notification popup when the close button is clicked to the parent component
    closeN() {
      this.$emit("closeN");
    },
  },
};
</script>

<style scoped>
/*Notification Popup*/

.notificationStyle {
  position: absolute;
  width: 99%;
}

.px1750Size {
  position: relative;
  margin: auto;
  width: 1750px;
}

.notificationWrapper {
  position: relative;
  z-index: 5;
  top: 5px;
}

.notificationPopup {
  position: relative;
  display: block;
  height: 415px;
  width: 400px;
  padding-top: 50px;
  overflow-y: auto;
  background-color: rgb(64, 61, 57);
  transition: right 0.3s;
  border: 1px solid white;
  border-radius: 10px;
  color: black;
  box-shadow: 35px 45px 25px rgba(50, 50, 50, 0.5);
  float: right;
  color: white;
}

.notificationPopup h2 {
  font-size: 20px;
  text-align: center;
  margin-top: -20px;
  text-shadow: 0 0 2px #000000, 0 0 2px #000000;
  color: white;
}

.closeNotification {
  position: absolute;
  top: 13px;
  right: 11px;
  width: 23px;
  height: 23px;
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  text-align: center;
  line-height: 23px;
  border-radius: 50%;
  cursor: pointer;
}

.closeNotification:hover {
  background-color: rgb(149, 161, 132);
}

.notificationItems {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  height: 300px;
  margin-bottom: 5px;
}

.notificationItems a {
  text-decoration: none;
  color: black;
  margin-top: -40px;
  right: 11px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  text-align: center;
  line-height: 26px;
  font-size: 20px;
  font-weight: 100;
}

.notificationItems li {
  position: relative;
  padding: 1rem;
  font-weight: 700;
  background-color: rgb(248, 237, 227);
  border-radius: 5px;
  margin-bottom: 5px;
  color: black;
}

.notificationItems span {
  font-weight: 550;
  color: rgb(94, 106, 106);
  margin-right: 10px;
}

.notificationItems li:nth-child(2n) {
  border-bottom: 2px solid white;
  border-top: 2px solid white;
  background-color: rgb(248, 234, 221);
}

.notificationItems li:nth-child(2n + 1) {
  border-bottom: 2px solid white;
  border-top: 2px solid white;
  background-color: rgb(231, 214, 199);
}

.notificationItems .fa-heart:before {
  font-size: 0.9rem;
  padding: 0.45rem;
  color: rgb(78, 75, 75);
}

.notificationPrice {
  margin-top: 0.8rem;
}
.notificationOldPrice {
  margin-top: 0.8rem;
  text-decoration: line-through;
}

.notificationRemove {
  position: absolute;
  right: 1rem;
}

.router {
  color: white;
}

.clearButton {
  display: block;
  width: 200px;
  margin: auto;
  border: none;
  outline: none;
  border-radius: 50px;
  height: 40px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  margin-top: 30px;
}

.clearButton:hover {
  background-color: rgb(248, 237, 227);
}

/*Arrow poiting to the notification icon on header*/

.arrow {
  z-index: 100;
  position: absolute;
  top: -10px;
  right: 235px;
  border-bottom: 10px solid rgb(64, 61, 57);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
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
  display: none;
}

/*Responsive*/

@media screen and (max-width: 1800px) {
  .px1750Size {
    max-width: 97%;
    padding-right: 100px;
  }
}

@media screen and (max-width: 800px) {
  .px1750Size {
    padding: 0 1px;
  }

  .arrow {
    display: none;
  }
  .notificationPopup {
    width: 420px;
    float: none;
    margin-left: auto;
    margin-right: auto;
    top: 90px;
  }

  .blur {
    display: block;
  }
}

@media screen and (max-width: 500px) {
  .notificationPopup {
    width: 320px;
    top: 90px;
  }
}
</style>
