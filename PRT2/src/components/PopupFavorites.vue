<template>

    <div class="favoritesPopup" id="showFavorites">
        <div class="closeFavorites" @click="closeF">&times;</div>
        <h2>Favorite Products</h2>
        <ul class="favoriteItems">
            <li>
                <span class="cartQuantity">1x</span> Sony Camera
                <div class="cartPrice">400€</div>
                <a href="#" class="favoriteRemove"><i class="fa fa-heart" aria-hidden="true"></i></a>
            </li>                
        </ul>
    </div>

</template>

<script>

export default{
    name:'PopupFavorites',

    methods: {
    closeF() {
      this.$emit('closeF');
    }
  }
}

</script>


<style scoped>

.favoritesPopup{
    z-index: 4;
    top: 110px;
    display: block;
    position: absolute;
    margin-left: 970px;  
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
}

.favoritesPopup h2{
    font-size: 20px;
    text-align: center;
    margin-top: -20px;
}

.closeFavorites{
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

.closeFavorites:hover{
    background-color: rgb(149, 161, 132);
}

.favoriteItems{
    padding: 0;
}

.favoriteItems a{
    text-decoration: none;
    color: black;
    margin-top: -40px;
    right: 11px;
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 26px;
    font-size: 20px;
    font-weight: 100;
}

.favoriteItems a:hover{
    background-color: rgb(149, 161, 132);
} 

.favoriteItems li{
    position: relative;
    padding: 1rem;
    border-top:  solid;
    font-weight: 700;
}

.favoriteItems span{
    font-weight: 550;
    color: rgb(94, 106, 106);
    margin-right: 10px;
}

.favoriteItems li:last-child{
    border-bottom: 2px solid white;
    border-top: 2px solid white;
}

.favoriteItems .fa-heart:before{
    font-size: 0.9rem;
    padding: 0.45rem;
    color: rgb(78, 75, 75);
}

.favoritePrice{
    margin-top: .8rem;
}

.favoriteRemove{
    position: absolute;
    right: 1rem;
}

</style>