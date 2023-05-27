<template>

    <div class="cartPopup" id="showCart">
        <div class="closeCart" @click="closeC">&times;</div>
            <h2>Your Products</h2>
            <ul class="cartItems">
                <li>
                    <span class="cartQuantity">1x</span> Sony Camera
                    <div class="cartPrice">400€</div>
                    <a href="#" class="cartRemove">&times;</a>
                </li>                
            </ul>
        <div class="cartTotal">
            <p>Total: <span>400€</span></p>
        </div> 
        <button class="checkoutButton btn2">Checkout</button>
    </div>

</template>


<script>

export default{
    name:'PopupCart',

    methods: {
    closeC() {
      this.$emit('closeC');
    }
  }
}

</script>


<style scoped>

.favAndCartWrapper{
    margin-left: auto;
    margin-right: auto;
    width: 960px;
}

    /* Cart Popup*/

.cartPopup{
    z-index: 4;
    top: 110px;
    display: block;
    position: absolute;
    margin: auto;
    margin-left: 970px;   
    height: 415px;
    width: 400px;
    padding-top: 50px;
    overflow-y: auto;
    background-color: rgb(186, 200, 165);
    transition: right .3s;
    border-radius: 10px;
    border: 1px solid white;
    color: black;
    box-shadow: 35px 45px 25px rgba(50, 50, 50, 0.5);
}

.cartPopup h2{
    font-size: 20px;
    text-align: center;
    margin-top: -20px;
}

.closeCart{
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

.closeCart:hover{
    background-color: rgb(149, 161, 132);
}
.cartItems{
    padding: 0;
}

.cartItems a{
    text-decoration: none;
    color: black;
    margin-top: -40px;
    right: 11px;
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    font-size: 20px;
    font-weight: 100;
}

.cartItems a:hover{
    background-color: rgb(149, 161, 132);
} 

.cartItems li{
    position: relative;
    padding: 1rem;
    border-top: 1px solid;
    font-weight: 700;
}

.cartItems span{
    font-weight: 550;
    color: rgb(94, 106, 106);
    margin-right: 10px;
}

.cartItems li:last-child{
    border-bottom: 2px solid white;
    border-top: 2px solid white;
}

.cartPrice{
    margin-top: .8rem;
}

.cartRemove{
    position: absolute;
    right: 1rem;
}

.cartTotal{
    font-weight: 700;
    padding: 0.5rem;
    text-align: center;
}

.cartTotal span{
    margin-left: 10px;
    color: rgb(69, 74, 74);
}

.cartTotal span::after{
    content: '';
    display: table;
    clear: both;
}

.checkoutButton{
    display: block;
    width: 200px;
    line-height: 30px;
    margin: auto;
    border: none;
    outline: none;
    border-radius: 50px;
    height: 40px;
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.checkoutButton::before{
    width: 200px;
    border-radius: 50px;
    color: white;
}

.btn2::before{
    content: "";
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid rgb(255, 255, 255);
    height: 40px;
    transition: 0.3s;
}


</style>