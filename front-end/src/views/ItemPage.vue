<!--Page that contains a single item, where the description and overall information of the item is available-->

<template>

    <Header/>
    <SingleProduct :book="book"/>
    <Footer/>

</template>

<script>
import Header from '../components/Header.vue'
import SingleProduct from '../components/SingleProduct.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'
import apiURL from '../config.js'

export default {
  name: 'ItemPage',
  components: { Header, Footer, SingleProduct },
  data() {
    return {
      book: null,
    }
  },
  created() {
    this.fetchBookData()
  },
  watch: {
    $route() {
      this.fetchBookData()
    },
  },
  methods: {
    async fetchBookData() {
      try {
        const response = await axios.get(`${apiURL}/item/${this.$route.params.id}`)
        this.book = response.data
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>


