<!--Page that shows information about a single product, without the description box, which is located on the ItemPage.vue-->

<template>

    <!--Overall Product-->

    <div v-if="book" class="productPage">
        <div class="productContainer">
            <div class="productImage">
                <img :src="book.item_image" alt="Book Cover">
            </div>
            <div class="productDetails">
                <h2 class="bookTitle">{{ book.item_name }}</h2>
                <p class="bookAuthor">By 人の有る世/hitonoaruyo</p>
                <p class="bookPrice"> {{ (book.item_price * (1-book.item_discount)).toFixed(2)}} €</p>
                <button class="buyButton"  @click="addToCart(book)">Buy Now</button>
            </div>
        </div>
    </div>

    <!--Description box with details about the item-->

    <div class="moreInfoWrapper" v-if="book">
        <div class="moreInfo">
            <p>
                <span v-if="isReadMoreShown || !book.item_description">{{ book.item_description }}</span>
                <span v-else>{{ book.item_description.substring(0, 250) }}...</span>
                <br><br>
                <h4>Author:<a href="https://twitter.com/hitonoaruyo"><span class="authorAndChapterText">By 人の有る世/hitonoaruyo</span></a></h4>
                <h4>Current Chapters Out:<span class="authorAndChapterText">{{ chapters }}</span></h4>
            </p>
            <span class="readMoreButton" @click="toggleReadMore">
                {{ isReadMoreShown ? 'Read Less...' : 'Read More...' }}
            </span>
        </div>
    </div>

</template>


<script>
import Footer from '../components/Footer.vue'
import axios from 'axios'
import apiURL from '../config.js'

export default {
  name: 'SingleProduct',
  components: { Footer },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chapters: '3',
      isReadMoreShown: false,
    }
  },
  methods: {
    toggleReadMore() {
      this.isReadMoreShown = !this.isReadMoreShown
    },
    addToCart(item) {
      this.$store.dispatch('cart/addToCart', item)
      this.cartNotification = true
      setTimeout(() => {
        this.cartNotification = false
      }, 2000)
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
    gap: 180px;
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
    color: #000000;
    text-shadow: 0 0 5px #ffffff, 0 0 2px #ffffff;
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
</style>
