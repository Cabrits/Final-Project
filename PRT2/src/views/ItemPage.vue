<template>
    <Header/>
    <div class="productPage">
        <SingleProduct/>
    </div>
    <div class="moreInfoWrapper">
        <div class="moreInfo">
            <p>
                In a world where samurai wield swords, Ayame stands out as a dango-wielding warrior. When an evil warlord threatens her village, Ayame embarks on a quest to defeat him using the magical dango skewer. 
                With his loyal mechanised companion Delda by her side, Ayame must unlock
            <span class="readMoreText">
                the skewer's hidden powers and confront her own demons. Action, comedy, and supernatural elements collide in this tale of a unique samurai's journey to protect her home and loved ones.
                <br>
                <br>
                <h4>Author:<span class="authorAndChapterText">{{author}}</span></h4><h4>Current Chapters Out:<span class="authorAndChapterText">{{chapters}}</span></h4>
            </span>
            </p>
            <span class="readMoreButton">Read More....</span>
        </div>
    </div>
    <Footer/>
</template>

<script>

import Header from '../components/Header.vue'
import SingleProduct from '../components/SingleProduct.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'ItemPage',
    components: { Header, Footer, SingleProduct },

    data(){
        return{
            author:'Yatsume San',
            chapters: '3',
        }
        
    },

    mounted() {
        const parentContainer = document.querySelector('.moreInfoWrapper');

        parentContainer.addEventListener('click', event => {
            const current = event.target;
            const isReadMoreButton = current.className.includes('readMoreButton');

            if (!isReadMoreButton) return;

            const currentText = event.target.parentNode.querySelector('.readMoreText');

            currentText.classList.toggle('readMoreText--show');

            current.textContent = current.textContent.includes('Read More') ? "Read Less..." : "Read More...";
        });
    }
}

</script>

<style scoped>

.productPage {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(224, 228, 193);
    font-family: 'Arial', sans-serif;
    color: #ffffff;
    margin-top: 50px;
    padding-bottom: 100px;
}

.moreInfoWrapper {
    text-align: center;
    width: 900px;
    margin: 0 auto;
}

.moreInfo {
    background-color: rgb(198, 202, 162);
    border: 2px solid white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.5);
    -o-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.5);
    margin-top: -65px;
    font-weight: 100;
}

.moreInfo h4 {
    display: inline;
    margin-left: 30px;
    margin-right: 30px;
}


.readMoreButton{
    color: #000000;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
}

.readMoreButton:hover{
    color: rgb(255, 255, 255);
}

.readMoreText{
    display: none;
}

.readMoreText--show{
    display: inline;
}

.authorAndChapterText{
    color: white;
    margin-left: 10px;
    text-shadow: 0 0 3px #000000, 0 0 5px #000000;
}



@media (max-width: 925px) {
    .productPage {
        flex-direction: column;
    }
    .moreInfoWrapper {
        width: 80%; 
    }
    .moreInfo h4 {
        display: flex;
        justify-content: center;
    }
}

</style>
