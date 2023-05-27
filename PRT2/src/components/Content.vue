<template> 
    <div class="contentStyle px1750Size">
        <Slider/>
        <Categories/>
        <Product/>
    </div>
</template>


<script>

import Slider from './Slider.vue'
import Categories from './Categories.vue'
import Product from './Product.vue'

export default{
  name: 'Content',
  components: {Slider, Categories, Product},
}

</script>


<style scoped>

.contentStyle{
    width: 100%;
}

.px1750Size{
    margin: auto;
    width: 1780px;
}

@media screen and (max-width: 1800px){   
    .px1750Size{
        width: 95%;
    }
}

</style>