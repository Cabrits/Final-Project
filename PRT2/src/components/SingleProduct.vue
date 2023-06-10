<template>
    <div class="productContainer">
        <div class="productImage">
            <img :src="book.image" alt="Book Cover">
        </div>
        <div class="productDetails">
            <h2 class="bookTitle">{{ book.title }}</h2>
            <p class="bookAuthor">By {{ book.author }}</p>
            <p class="bookDescription">{{ book.description }}</p>
            <p class="bookPrice"> {{ book.price }} €</p>
            <button class="buyButton">Buy Now</button>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    name: 'PageNotFound',
    components: { Header, Footer },

    data() {
        return {
            book: {
                title: 'Adventure Note',
                author: 'Yatsume San',
                description: 'Ayame and his robot friend Delda',
                price: 10,
                image: '/images/dangozamurai.png'
            }
        };
    }
}
</script>

<style scoped>
.productContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 180px;
}

.productImage {
    flex: 0 0 auto;
    max-width: 350px;
}

.productImage img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.5);
    -moz-box-shadow: 20px 20px 10px rgba(50, 50, 50, 0.5);
    -webkit-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.5);
    -o-box-shadow: 20px 20px 10px  rgba(50, 50, 50, 0.5);
    transition: transform 0.3s;
}

.productImage img:hover {
    transform: scale(1.05);
}

.productDetails {
    flex: 1 1 auto;
    max-width: 500px;
    text-align: center;
    padding-top: 30px;
}

.bookTitle {
    font-size: 40px;
    margin-bottom: 20px;
    text-transform: uppercase;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.bookAuthor {
    font-size: 24px;
    color: #000000;
    margin-bottom: 30px;
    padding-top: 10px;
}

.bookDescription {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 40px;
    color: #000000;
    font-weight: 600;
}

.bookPrice {
    font-size: 32px;
    font-weight: bold;
    padding-top: 40px;
    color: #000000;
}

.buyButton {
    position: relative;
    border: none;
    outline: none;
    background-color: white;
    color: #000000;
    height: 40px;
    border-radius: 50px;
    font-size: 25px;
    cursor: pointer;
    width: 300px;
    height: 50px;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.5);
    margin-top: 40px;
}

.buyButton:hover {
    background-color: rgb(185, 188, 159);
}

@media (max-width: 925px) {
    .productContainer {
        flex-direction: column;
        align-items: center;
        gap: 40px;
    }

    .productImage {
        max-width: 60%;
    }

    .productDetails {
        padding-top: 0;
    }

    .bookTitle {
        font-size: 30px;
    }

    .buyButton{
        margin-top: 0;
    }
}
</style>
