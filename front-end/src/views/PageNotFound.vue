<!--When the rout is non existent-->

<template>
  <Header />
  <div class="pageNotFound">
    <h1>404 page not found!</h1>
  </div>
  <Footer />
</template>

<script>
// Import necessary modules and functions
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  //  Map components
  name: "PageNotFound",
  components: { Header, Footer },
};
</script>

<style scoped>
.pageNotFound {
  text-align: center;
  font-size: 50px;
  height: 730px;
  top: 30%;
  color: white;
}

.pageNotFound h1 {
  left: 0;
  line-height: 200px;
  margin-top: -100px;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
  -webkit-text-stroke: 1px black;
}
</style>
