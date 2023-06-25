<!--Page that shows information about a single product, without the description box, which is located on the ItemPage.vue-->

<template>

    <!--Overall Product-->

    <div v-if="book" class="productPage">
        <div class="productContainer">
            <div class="productImage">
                <img :src="book.item_image" alt="Book Cover">
            </div>
            <div class="auxButtons">

                <button class="favButton"
                :disabled="cooldown"
                @click="toggleFavourite(book)"
                >
                    <i class="far fa-heart" :class="{ 'red-heart': isFavourite(book) }"></i>
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
        <div class="moreInfo reviewBox">
            <h2>REVIEWS FROM OUR CUSTOMERS</h2>
            <div>
                <h2><i class="fa fa-star"></i> 5 / 5</h2>
                <h5 class="reviewsCounter"> 2 Reviews</h5>
            </div>
            <div class="reviewBlock">
                <div class="reviewRow">
                    <h4 class="reviewUserName">@User1</h4>
                    <div class="reviewStars">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <span class="reviewContent">
                        Good quality!

                        A good translation, good quality of the material and faithful to the work
                        in the original language!
                    </span>
                </div>
                <div class="reviewRow">
                    <h4 class="reviewUserName">@User2</h4>
                    <div class="reviewStars">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <span class="reviewContent">
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
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";
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
      favoriteNotification: false,
      cooldown: false,

      isReadMoreShown: {
        description: false,
        reviews: false,
      },
    }
  },

  computed:{
    ...mapState(["favourites"]),
  },
  //  Watch for changes in the route and Fetch the data of the book
  methods: {
    ...mapActions("favourites", ["fetchFavourites"]),

     // cooldown to prevent spamming the button
     startButtonCooldown() {
      this.cooldown = true;
      setTimeout(() => {
        this.cooldown = false;
      }, 500);
    },

     //  Check if the item is favourite
     isFavourite(itemId) {
      const result = this.favourites.favourites.some(
        (favourite) => favourite.item_id === itemId
      );
      return result;
    },

    //  Toggle the favourite item
    toggleFavourite(itemId) {
      //  check if user is logged in and if not , send an alert
      if (!this.userId) {
        alert("You need to be logged in to add items to your favourites!");
        return;
      }

      //  Start the button cooldown
      this.startButtonCooldown();
      //  Get the user id
      const userId = this.userId;

      // check if the item is favourite
      const isItemFavourite = this.isFavourite(itemId);
      // If the item is favourite,
      const apiUrl = isItemFavourite
        ? `${baseURL}/user/${userId}/removeFavourite/${itemId}`
        : `${baseURL}/user/${userId}/addFavourite/${itemId}`;
      //  Send a request to the RESTapi to add or remove the item from the favourites
      axios({
        method: isItemFavourite ? "DELETE" : "POST",
        url: apiUrl,
      })
        .then((response) => {
          // Handle success by fetching the favourites

          this.$store.dispatch("favourites/fetchFavourites");
          this.favoriteNotification = true;
          setTimeout(() => {
            this.favoriteNotification = false;
          }, 2000);
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    },

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

.buyButton:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}

.auxButtons{
    display: block;
    margin-top: 15%;
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

.favButton i{
    margin-left: 5px;
    margin-top: 2px;
}

.favButton::before {
  width: 45px;
  border-radius: 50%;
}

.favButton .fa-heart:before {
  padding: 1.15rem;
  font-size: 1.2rem;
  color: rgb(78, 75, 75);
  margin-left: -11.5px;
}

.red-heart::before {
  color: rgb(255, 127, 127) !important;
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
.reviewBox{
    display: block;
    margin-top: 30px;
    margin-left: 50px;
    margin-right:50px ;
    padding: 0%
}

.reviewBlock{
    display: flex;
    flex-direction: column;
    background-color: rgba(50, 50, 50, 0.4);
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
}

.reviewRow{
    display: grid;
    grid-template-columns: minmax(0, .5fr) auto minmax(0, 1fr);
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, .4);
    padding-bottom: 10px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

.reviewRow:last-child {
  border-bottom: none;
}

.reviewUserName{
    text-align: left;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.reviewStars{
    display: flex;
    justify-content: left;
}

.reviewContent{
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

    .auxButtons{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-top: 5%;
     }

     .auxButtons .favButton {
        margin-right: 45px; /* Espaço à direita do botão de favorito */
}

    .favButton{
        margin-left: 0;
    }

    .moreInfoWrapper{
        width: 80%; 
    }

    .moreInfo h4{
        display: flex;
        justify-content: center;
    }
    .reviewBox{
        width: 100%;
        margin-left: 0%;
    }

    .reviewRow{
        display: flex;
        text-overflow: ellipsis;
    }

    .reviewStars{
        font-size: 70%;
    }

    .reviewUserName{
        font-size: 75%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .reviewContent{
        font-size: 75%;
        display: block;
        max-width: 65%;
    }

    .reviewRow{
        display: grid;
        width: 118%;
        margin-left: auto;
        margin-right: auto;
        text-overflow: ellipsis;
        white-space:break-spaces;
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
