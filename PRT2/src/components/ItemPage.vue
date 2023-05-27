<template> 

    <div class="contentStyle px1750Size">
        <section id="prodetails" class="section-1">
            <div class="single-prod-details">
                <h4>Category / product</h4>
                <h2>Filming Kit</h2>
                <span class="prod-price">12.00€</span>
                <i style="font-size: 14px" class="fas">&#xf0d1; Delivery</i>
                <i style="font-size:14px" class="fas fa-check-circle">&nbspStock</i>
                <input type="number" min="1" value="1" />
                <button class="cart btn">Add To Cart</button>
                <div class="prod-info">
                    <h2>Overview</h2>
                    <span>
                        Get inspired and improve your photography and cinematography skills
                        with our collection of books.
                    </span>
                </div>
            </div>
            <div class="single-prod-img">
              <div class="mainImage">
                <img class="child" src="images/product1.jpg" width="100%" height="100%" id="mainImg" />
              </div>
                <div class="small-img-group">
                    <div class="small-img-col">
                        <img src="images/product1.jpg" width="100%" height="100%" class="small-img" />
                    </div>
                    <div class="small-img-col">
                        <img src="images/product2.jpg" width="100%" height="100%" class="small-img" />
                    </div>
                    <div class="small-img-col">
                        <img src="images/product3.png" width="100%" height="100%" class="small-img" />
                    </div>
                    <div class="small-img-col">
                        <img src="images/product4.jpg" width="100%" height="100%" class="small-img" />
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>


<script>

var mainImg = document.getElementById("mainImg");
var smallImg = document.getElementsByClassName("small-img");

smallImg[0].onclick = function () {
    mainImg.src = smallImg[0].src;
};

smallImg[1].onclick = function () {
    mainImg.src = smallImg[1].src;
};

smallImg[2].onclick = function () {
    mainImg.src = smallImg[2].src;
};

smallImg[3].onclick = function () {
    mainImg.src = smallImg[3].src;
};

export default{
  name: 'ItemPage',
}

</script>


<style scoped>

/*Product img*/
#prodetails .single-prod-img{
  width: 40%;
  height: 100%;
  margin-right: 50px;
  margin-top: 110px;
}

#prodetails .mainImage{
  box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.5);
  margin-block-end: 10px;
  overflow: hidden;
  position: relative;
}

.child{
    width: 100%;
    height: 100%;
    background-size: cover;
    transition: all 1.1s;
}

#prodetails .mainImage:hover .child{
  transform: scale(1.3);
}
.small-img-group{
  display: flex;
  justify-content: space-between;
}

.small-img-col{
  flex-basis: 24%;
  cursor: pointer;
}

/*Product details*/

#prodetails{
  display: flex;
  margin-top: 25px;
  margin-block-end: 9%;
}

#prodetails .single-prod-details{
  width: 50%;
  padding-top: 30px;
}

#prodetails .single-prod-details i{
  display: flex;
  padding-top: 30px;
  font-weight: lighter;
  
}

.prod-price{
  display: flex;
}

#prodetails .single-prod-details h4{
  font-weight:lighter;
  border-bottom: 1px solid rgba(124, 122, 122, 0.5);
  padding-bottom: 15px;
  
}
#prodetails .single-prod-details h2{
  font-size: 26px;
}

#prodetails .prod-info span{
  line-height: 25px;
}

#prodetails .single-prod-details input{
  width: 60px;
  height: 35px;
  border-radius: 15px;
  background-color: #eee;
  color: #333;
  padding: 0px;
  text-align: center;
  font-size: 1.2em;
  margin-right: 25px;
  margin-top: 60px;
  flex-direction: row;

}

#prodetails .single-prod-details button{
  color: black;
}

#prodetails .prod-info{
  max-width: 500px;
}

#prodetails .prod-info h2{
  margin-top: 50px;
}


</style>