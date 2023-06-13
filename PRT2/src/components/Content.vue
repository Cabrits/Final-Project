<!--Overall Content of the Home Page-->

<template> 

    <div class="contentStyle px1750Size">
        <Slider/>
        <Product/>
    </div>

</template>


<script>

import Slider from './Slider.vue'
import Product from './Product.vue'

export default{
  name: 'Content',
  components: {Slider, Product},
  
};
</script>


<style scoped>

/*Responsive*/

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