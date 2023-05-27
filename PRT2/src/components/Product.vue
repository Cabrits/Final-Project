<template> 

<div class="productsDisplay">
    <div class="product">
        <img  src="images/product1.jpg">
        <a href="#"><h2>Sony Camera</h2></a>
        <div class="prodInfo">
            <span>Capture life's unforgettable moments with our selection of high-quality cameras. </span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">400€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn heartAnimation"><i class="fa fa-heart"></i></button>
        </div>
    </div>
    <div class="product">
        <img  src="images/product2.jpg">
        <a href="#"><h2>Bose Headphones</h2></a>
        <div class="prodInfo">
            <span>Stay focused and productive all day long with our selection of high-quality headphones.</span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">69€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn"><i class="fa fa-heart"></i></button>
        </div>
    </div>
    <div class="product">
        <img  src="images/product3.jpg">
        <a href="#"><h2>Filming Kit</h2></a>
        <div class="prodInfo">
            <span>Take your filmmaking skills to the next level with our selection of filming kits. </span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">623€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn"><i class="fa fa-heart"></i></button>
        </div>
    </div>
    <div class="product">
        <img  src="images/product4.jpg">
        <a href="#"><h2>No Longer Human</h2></a>
        <div class="prodInfo">
            <span>Experience the raw and emotional journey of the human condition through Osamu Dazai's timeless classic, "No Longer Human".</span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">12€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn"><i class="fa fa-heart"></i></button>
        </div>
    </div>
    <div class="product">
        <img  src="images/product2.jpg">
        <a href="#"><h2>Bose Headphones</h2></a>
        <div class="prodInfo">
            <span>Stay focused and productive all day long with our selection of high-quality headphones.</span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">69€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn"><i class="fa fa-heart"></i></button>
        </div>
    </div>
    <div class="product">
        <img  src="images/product1.jpg">
        <a href="#"><h2>Sony Camera</h2></a>
        <div class="prodInfo">
            <span>Capture life's unforgettable moments with our selection of high-quality cameras. </span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">400€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn"><i class="fa fa-heart"></i></button>
        </div>
    </div>
    <div class="product">
        <img  src="images/product4.jpg">
        <a href="#"><h2>No Longer Human</h2></a>
        <div class="prodInfo">
            <span>Experience the raw and emotional journey of the human condition through Osamu Dazai's timeless classic, "No Longer Human".</span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">12€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn"><i class="fa fa-heart"></i></button>
        </div>
    </div>
    <div class="product">
        <img  src="images/product3.jpg">
        <a href="#"><h2>Filming Kit</h2></a>
        <div class="prodInfo">
            <span>Take your filmmaking skills to the next level with our selection of filming kits. </span>
        </div>
        <div class="prodButtons">
            <div class="prodPrice">623€</div>
            <button class="cart btn"><i class="fa fa-shopping-cart"></i></button>
            <button class="favourite btn"><i class="fa fa-heart"></i></button>
        </div>
    </div>
</div>

</template> 

<script>

export default{
    name:'Product',
}

</script>

<style scoped>

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