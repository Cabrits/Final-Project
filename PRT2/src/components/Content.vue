<template> 
    <div class="contentStyle px1750Size">
        <Slider/>
        <Product :items="items" :favourites="favourites" @favorite-updated="$emit('favorite-updated')" />
    </div>
</template>


<script>

import Slider from './Slider.vue'

import Product from './Product.vue'

export default{
  name: 'Content',
  components: {Slider, Product},
  props: {
    items: {
      type: Array,
      required: true
    },
    favourites: {
      type: Array,
      required: false
    }
  },
};
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