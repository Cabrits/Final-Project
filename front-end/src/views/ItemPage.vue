<!--Page that contains a single item, where the description and overall information of the item is available-->

<template>

  <Header />
  <SingleProduct :book="book" :reviews="reviews" />
  <Footer />

</template>

<script>

// Import necessary modules and functions
import Header from "../components/Header.vue";
import SingleProduct from "../components/SingleProduct.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import apiURL from "../config.js";

export default{
  //  Map components
  name: "ItemPage",
  components: { Header, Footer, SingleProduct },

  data() {
    return {
      book: null,
      review: null,
    };
  },

  created() {
    this.fetchBookData();
  },

  //  Watch for changes in the route and Fetch the data of the book
  watch: {
    $route() {
      this.fetchBookData();
    },
  },

  methods: {
    //  Fetch the data of the book
    async fetchBookData() {
      try {
        const response = await axios.get(
          `${apiURL}/item/${this.$route.params.id}`
        );
        this.book = response.data;
        this.reviews = response.data.reviews;
        
      } catch (error) {
        console.error(error);
      }
    },
  },
};

</script>
