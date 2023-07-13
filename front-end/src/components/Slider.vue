<!--Slider that contains NEWS about our products, for example discounts, bundles, etc-->

<template>

  <!-- Overall Slider -->

  <div class="slideNews">

    <!-- Images -->

    <div class="sliderWrapper">
      <swiper :rewind="true" :centeredSlides="true" :autoplay="{ delay: 3000, disableOnInteraction: false}" :pagination="{ clickable: true}" :modules="modules" class="slider mySwiper">
        <swiper-slide>
          <img id="slide1" src="@/assets/news1.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img id="slide2" src="@/assets/news2.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img id="slide3" src="@/assets/news4.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img id="slide4" src="@/assets/news3.jpg" />
        </swiper-slide>
      </swiper>
    </div>
  </div>

</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';

//  Export the component
export default{
  name: "Slider",
  //  Data for the component (slides and current index)

  components: {
    Swiper,
    SwiperSlide,
  },
  
  setup() {
    return {
      modules: [Autoplay, Pagination],
    };
  },
};

</script>

<style scoped>

/* Images */

.slideNews{
    padding: 3rem;
}

.sliderWrapper{
    position: relative;
    max-width: 60rem;
    margin: 0 auto;
    border-radius: 10px;
    border: 4px solid rgb(0, 0, 0);
}

.slider{
    display: flex;
    aspect-ratio: 16 / 6;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    border-radius: 0 1.5rem 3rem -0.75rem hsla(0, 0%, 0%, 0.25);
    border-radius: 10px;
    overflow: hidden;
}

.slider img{
    flex: 1 0 100%;
    scroll-snap-align: start;
    object-fit: cover;
    width: 100%;
    height: 100%;
}

/* Slider "buttons" */


@media screen and (max-width: 500px){
  .slideNews{
      padding: 2rem;
  }
}

</style>

<style>

.swiper-pagination-bullet{
  background-color: #000000; /* Replace with your desired color */
  width: 11px;
  height: 11px;
  opacity: 1;
  margin: 0 10px!important;
}

.swiper-pagination-bullet-active{
  background-color: #e7b182; /* Replace with your desired active color */
}

</style>
