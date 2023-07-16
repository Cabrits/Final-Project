<!--When the rout is non existent-->

<template>

  <Header />

  <div class="pageNotFound">
    <h1>Page Not Found!</h1>
  </div>

  <Footer />

</template>

<script>

// Import necessary modules and functions
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default{
  //  Map components
  name: "PageNotFound",
  components: { Header, Footer },
};

</script>

<style scoped>

.pageNotFound{
    text-align: center;
    font-size: 30px;
    color: white;
    margin-top: 40vh;
    height: 45vh;
}

.pageNotFound h1{
    font-size: 3em;
    line-height: 1.5;
    margin-top: -0.75em;
    position: relative;
}

/*Responsive*/

@media screen and (max-width: 768px){
  .pageNotFound{
      font-size: 30px;
      margin-top: 20vh;
      height: 60vh;
  }

  .pageNotFound h1{
      font-size: 2em;
      line-height: 1.3;
      margin-top: -0.65em;
  }
}

</style>
