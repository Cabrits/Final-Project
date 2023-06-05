<template>

    <div class="notificationStyle">
        <div class="px1750Size">
            <div class="notificationWrapper ">
            <div class="notificationPopup" id="showNotification">
                <div class="closeNotification" @click="closeN">&times;</div>
                <h2>Notifications</h2>
                <ul class="notificationItems">
                    <li v-for="favourite in filteredFavourites" :key="favourite.item_id">
                        <router-link :to="'/item/' + favourite.item_id">
                            {{ favourite.item_name }}
                        </router-link>
                        <span class="notificationQuantity"> is on discount!</span>
                        <div class="notificationOldPrice">{{ favourite.item_price }}€ </div>
                        <div class="notificationPrice">{{ (favourite.item_price * (1-favourite.item_discount)).toFixed(2)}}€ {{ (favourite.item_discount*100).toFixed(2) }}% off</div> 
                    </li>
                </ul>
            </div>
            <div class="arrow"></div>
            </div>
        </div>
        <div v-if="showPopup" class="blur"></div>
    </div>

  </template>
  
<script>
import { mapState } from 'vuex';
export default {
    name: 'PopupNotification',
    computed: {
    ...mapState(['favourites']),
    filteredFavourites() {
        console.log(this.favourites)
      return this.favourites.filter((favourite) => favourite.item_discount != null);
    },
  },
    methods: {
      closeN() {
        this.$emit('closeN');
      }
    },

    data() {
      return {
        showPopup: true
      };
    },
}
</script>
  
<style scoped>

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

.notificationStyle{
    position: absolute;
    width: 99%;
}

.px1750Size{
    position: relative;
    margin: auto;
    width: 1750px;
}

.notificationWrapper{
    position: relative;
    z-index: 5;
    top: 5px; 
}

.notificationPopup{
    position: relative;
    display: block;
    height: 415px;
    width: 400px;
    padding-top: 50px;
    overflow-y: auto;
    background-color: rgb(186, 200, 165);
    transition: right .3s;
    border: 1px solid white;
    border-radius: 10px;
    color: black;
    box-shadow: 35px 45px 25px rgba(50, 50, 50, 0.5);
    float: right;
}

.notificationPopup h2{
    font-size: 20px;
    text-align: center;
    margin-top: -20px;
}

.closeNotification{
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

.closeNotification:hover{
    background-color: rgb(149, 161, 132);
}

.notificationItems{
    padding: 0;
}

.notificationItems a{
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


.notificationItems li{
    position: relative;
    padding: 1rem;
    border-top: solid;
    font-weight: 700;
}

.notificationItems span{
    font-weight: 550;
    color: rgb(94, 106, 106);
    margin-right: 10px;
}

.notificationItems li:last-child{
    border-bottom: 2px solid white;
    border-top: 2px solid white;
}

.notificationItems .fa-heart:before{
    font-size: 0.9rem;
    padding: 0.45rem;
    color: rgb(78, 75, 75);
    }

.notificationPrice{
    margin-top: .8rem;
}
.notificationOldPrice{
    margin-top: .8rem;
    text-decoration:line-through;
}

.notificationRemove{
    position: absolute;
    right: 1rem;
}

.arrow{
    z-index: 100;
    position: absolute;
    top: -10px;
    right: 235px;
    border-bottom: 10px solid rgb(149, 161, 132);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
}


@media (max-width: 1800px) {
  .px1750Size {
    max-width: 97%;
    padding-right: 100px;
}
}


@media (max-width: 800px) {
    .arrow{
        display: none;
    }
    .notificationPopup {
        width: 480px;
        float: none;
        margin-left: auto;
        margin-right: auto;
    }

    .blur{
        display: block;
        
    }
}

</style>
  