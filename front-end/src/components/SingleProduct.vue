<!--Page that shows information about a single product, without the description box, which is located on the ItemPage.vue-->

<template>

    <!--Overall Product-->

    <div v-if="book" class="productPage">
        <div class="productContainer">
            <div class="productImage">
                <img :src="book.item_image" alt="Book Cover">
            </div>
            <div class="shareButtons">
                <button class="favButton"
                :disabled="cooldown"
                @click="toggleFavourite(item.item_id)"
                >
                    <i class="far fa-heart"></i>
                </button>
                <!--Share button-->
                <div>
                    <button 
                    class="shareButton" @click="openPopupShare">
                    <i class="fas fa-share-alt"></i>
                    </button>
                    <PopupShare v-if="showPopupShare" @closeS="closePopupShare"></PopupShare>
                </div>
            
            </div>
            <div class="productDetails">
                <h2 class="bookTitle">{{ book.item_name }}</h2>
                <p class="bookAuthor"><a href="https://twitter.com/hitonoaruyo" target="_blank" >By 人の有る世/hitonoaruyo</a></p>
                <p class="bookPrice"> {{ (book.item_price * (1-book.item_discount)).toFixed(2)}} €</p>
                <button class="buyButton"  @click="addToCart(book)">Add to Cart</button>
            </div>
        </div>
    </div>

    <!--Description box with details about the item-->

    <div class="moreInfoWrapper" v-if="book">
        <div class="moreInfo">
            <p>
                <span v-if="isReadMoreShown.description || !book.item_description">{{ book.item_description }}</span>
                <span v-else>{{ book.item_description.substring(0, 250) }}...</span>
                <br><br>
                <h4>Author:<a href="https://twitter.com/hitonoaruyo" target="_blank" ><span class="authorAndChapterText">By 人の有る世/hitonoaruyo</span></a></h4>
                <h4>Current Chapters Out:<span class="authorAndChapterText">{{ chapters }}</span></h4>
            </p>
            <span class="readMoreButton" @click="toggleReadMore('description')">
                {{ isReadMoreShown.description ? 'Read Less...' : 'Read More...' }}
            </span>
        </div>
    </div>

    <!--Reviews box With the reviews of customers who bought the product -->

    <div class="moreInfoWrapper">
        <div class="moreInfo classifyBox">
            <h2>REVIEWS FROM OUR CUSTOMERS</h2>
            <div>
                <h2><i class="fa fa-star"></i> 5 / 5</h2>
                <h5 class="reviewsCounter"> 2 Reviews</h5>
            </div>
            <div class="classifyBlock">
                <div class="classifyRow">
                    <h4 class="classifyUserName classifyColum">@User1</h4>
                    <div class="classifyStars classifyColum">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <span class="classifyContent classifyColum">
                        Good quality!

                        A good translation, good quality of the material and faithful to the work
                        in the original language!
                    </span>
                </div>
                <div class="classifyRow">
                    <h4 class="classifyUserName">@User2</h4>
                    <div class="classifyStars">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <span class="classifyContent">
                        I like it! Amazing story
                    </span>
                </div>
            </div>
            <span class="readMoreButton viewMore" @click="toggleReadMore('reviews')">
                {{ isReadMoreShown.reviews ? 'View Less...' : 'View More...' }}
            </span>
            <div>
                <button 
                class="giveRatingButton" @click="openPopupReview">Give rating</button>
                <PopupReview v-if="showPopupReview" @closeS="closePopupReview"></PopupReview>
            </div>
        </div>
    </div>

</template>


<script>
import Footer from '../components/Footer.vue'
import PopupShare from '../components/PopupShare.vue'
import PopupReview from '../components/PopupReview.vue'

export default {
  name: 'SingleProduct',
  //  Map components and props
  components: { Footer, PopupShare, PopupReview },
  props: {
    //  Book object that contains all the information about the book
    book: {
      type: Object,
      required: true,
    },
  },

  data() {
    //  Data for the component (chapters and read more)
    return {
      chapters: '3',
      showPopupShare: false,
      showPopupReview: false,

      isReadMoreShown: {
        description: false,
        reviews: false,
      },
    }
  },
  //  Watch for changes in the route and Fetch the data of the book
  methods: {
    //  Toggle the read more button
    toggleReadMore(sectionId) {
      this.isReadMoreShown[sectionId] = !this.isReadMoreShown[sectionId];
    },
    //  Add the item to the cart and show a notification
    addToCart(item) {
      this.$store.dispatch('cart/addToCart', item)
      this.cartNotification = true
      setTimeout(() => {
        this.cartNotification = false
      }, 2000)
    },
    openPopupShare() {
      this.showPopupShare = true;
    },
    closePopupShare() {
      this.showPopupShare = false;
    },

    openPopupReview() {
      this.showPopupReview = true;
    },
    closePopupReview() {
      this.showPopupReview = false;
    },
  },
}
</script>

<style scoped>

/*Overall css for the Single Product display*/

.productContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 120px;
}

.productImage{
    flex: 0 0 auto;
    max-width: 350px;
}

.productImage img{
    width: 100%;
    border-radius: 10px;
    box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.5);
    -o-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.5);
    transition: transform 0.3s;
}

.productImage img:hover{
    transform: scale(1.05);
}

.productDetails{
    flex: 1 1 auto;
    max-width: 500px;
    text-align: center;
    padding-top: 30px;
}

.productDetails a:visited{
    text-decoration: none;
    color: black;
}

.bookTitle{
    font-size: 40px;
    margin-bottom: 20px;
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.bookAuthor{
    font-size: 24px;
    color: #000000;
    padding-top: 50px;
    font-weight: 600;
    text-shadow: 0 0 5px #ffffff, 0 0 2px #ffffff;
}

.bookPrice{
    font-size: 32px;
    font-weight: bold;
    padding-top: 40px;
    color: #ffffff;
    text-shadow: 0 0 5px #000000, 0 0 2px #000000;
}

.buyButton{
    position: relative;
    border: none;
    outline: none;
    background-color: white;
    color: #000000;
    height: 40px;
    border-radius: 50px;
    font-size: 22px;
    cursor: pointer;
    width: 300px;
    height: 50px;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
    margin-top: 40px;
}

.buyButton:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}

.shareButtons{
    display: block;
    margin-top: 15%;
}
.buyButton:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}

.shareButton{
    border: none;
    outline: none;
    margin-left: 0%;
    margin-top: 100%;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: white;
    color: #000000;
    font-size: 22px;
    cursor: pointer;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
}

.shareButton:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}

.favButton{
    border: none;
    outline: none;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    color: #000000;
    font-size: 22px;
    cursor: pointer;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
}

.favButton:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}

.productPage{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    margin-top: 50px;
    padding-bottom: 100px;
}

.moreInfoWrapper{
    text-align: center;
    width: 960px;
    margin: 0 auto;
    color: white;
}

.moreInfo{
    background-color: rgb(122, 111, 96);
    border: 2px solid white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.7);
    -moz-box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.7);
    -webkit-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.7);
    -o-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.7);
    margin-top: -70px;
    font-weight: 600;
}

.moreInfo a:visited{
    text-decoration: none;
    color: black;
}

.moreInfo h4{
    display: inline;
    margin-left: 30px;
    margin-right: 30px;
}

.moreInfo p{
    text-justify: inter-word;
}


.readMoreButton{
    color: #000000;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    color: #222222;
}

.readMoreButton:hover{
    color: rgb(255, 255, 255);
}

.authorAndChapterText{
    color: rgb(243, 243, 243);
    margin-left: 10px;
    text-shadow: 0 0 1px #000000, 0 0 3px #000000;
}

/* CSS for classify box*/
.classifyBox{
    display: block;
    margin-top: 30px;
    margin-left: 50px;
    margin-right:50px ;
    padding: 0%
}

.classifyBlock{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgba(50, 50, 50, 0.4);
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}

.classifyRow{
    display: grid;
    grid-template-columns: minmax(0, .5fr) auto minmax(0, 1fr);
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, .4);
    padding-bottom: 10px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

.classifyRow:last-child {
  border-bottom: none;
}

.classifyUserName{
    text-align: left;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.classifyStars{
    display: flex;
    justify-content: left;
}

.classifyContent{
    margin: 1em;
}

.giveRatingButton{
    display: block;
    margin: 15px auto 10px auto;
    position: relative;
    border: none;
    outline: none;
    background-color: white;
    color: #000000;
    border-radius: 50px;
    font-size: 15px;
    cursor: pointer;
    width: 130px;
    height: 25px;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
    
}

.giveRatingButton:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}


.reviewsCounter{
    text-decoration: underline;
}

.viewMore{
    display: block;
     margin: 20px;
}
/*Responsive*/

@media (max-width: 925px){
    .productContainer{
        flex-direction: column;
        align-items: center;
        gap: 40px;
    }

    .productPage{
        flex-direction: column;
    }

    .productImage{
        max-width: 40%;
    }


    .productDetails{
        padding-top: 0;
    }

    .bookTitle{
        font-size: 30px;
    }

    .buyButton{
        margin-top: 0;
    }

    .moreInfoWrapper{
        width: 80%; 
    }

    .moreInfo h4{
        display: flex;
        justify-content: center;
    }
}

@media (max-width: 500px){

    .productImage{
        max-width: 60%;
    }

    .bookAuthor{
        font-size: 20px;
        padding-top: 25px;
    }

    .bookPrice{
        font-size: 28px;
        padding-top: 10px;
    }

    .buyButton{
        height: 45px;
        border-radius: 50px;
        font-size: 22px;
        cursor: pointer;
        width: 250px;
        box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
        margin-top: 10px;
    }

    .moreInfoWrapper{
        width: 80%; 
    }

    .moreInfo h4{
        display: flex;
        justify-content: center;
    }
}

</style>
