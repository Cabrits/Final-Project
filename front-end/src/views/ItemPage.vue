<!--Page that contains a single item, where the description and overall information of the item is available-->

<template>

    <Header/>
    <SingleProduct/>
    <Footer/>

</template>

<script>

import Header from '../components/Header.vue'
import SingleProduct from '../components/SingleProduct.vue'
import Footer from '../components/Footer.vue'

export default{
    name: 'ItemPage',
    components: { Header, Footer, SingleProduct },

    
}

</script>

