<!--Slider that contains NEWS about our products, for example discounts, bundles, etc-->

<template>

    <!--Overall Slider-->

    <div class="slideNews">

        <!--Images-->

        <div class="sliderWrapper">
            <div class="slider">
                <img id="slide1" src="images/news1.jpg">
                <img id="slide2" src="images/news2.jpg">
                <img id="slide3" src="images/news3.jpg">
                <img id="slide4" src="images/news4.jpg">
            </div>

            <!--Navigation circles-->
            
            <div class="sliderNav">
                <a v-for="(slide, index) in slides" :key="index" :href="`#slide${index + 1}`" :class="{ active: currentIndex === index }" @click.prevent="changeSlide(index)"></a>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'Slider',
    data() {
      return {
        slides: [1, 2, 3, 4],
        currentIndex: 0,
      };
    },
    methods: {
      changeSlide(index) {
        this.currentIndex = index;
        const slider = document.querySelector('.slider');
        slider.scrollTo({
          left: slider.offsetWidth * index,
          behavior: 'smooth',
        });
      },
    },
  };
</script>
  
<style scoped>

/* Images */

.slideNews {
    padding: 3rem;
}

.sliderWrapper {
    position: relative;
    max-width: 55rem;
    margin: 0 auto;
    border-radius: 10px;
    border: 2px solid white;
}

.slider {
    display: flex;
    aspect-ratio: 16 / 6;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    border-radius: 0 1.5rem 3rem -0.75rem hsla(0, 0%, 0%, 0.25);
    border-radius: 10px;
    overflow: hidden;
}

.slider img {
    flex: 1 0 100%;
    scroll-snap-align: start;
    object-fit: cover;
}

/* Slider "buttons" */

.sliderNav {
    display: flex;
    column-gap: 1rem;
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.sliderNav a {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.75;
    transition: opacity ease 250ms;
}

.sliderNav a:hover {
    opacity: 1;
}

.sliderNav a.active {
    opacity: 1;
    background-color: #ffffff;
}

.sliderNav:focus {
    color: white;
}

</style>