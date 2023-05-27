<template>
    <div class="overall">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  </template>
  
  <script>
  
  
  import Header from '../components/Header.vue'
  import Content from '../components/Content.vue'
  import Footer from '../components/Footer.vue'
  
  export default{
    name: 'HomePage',
    components: {Header, Footer, Content},
  }


  </script>
  
  <style scoped>
  
  </style>