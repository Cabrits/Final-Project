<!--Slider that contains NEWS about our products, for example discounts, bundles, etc-->

<template>

  <!--Overall Slider-->

  <div class="slideNews">

    <!--Images-->

    <div class="sliderWrapper">
      <div class="slider">
        <img id="slide1" src="@/assets/news1.jpg" />
        <img id="slide2" src="@/assets/news2.jpg" />
        <img id="slide3" src="@/assets/news4.jpg" />
        <img id="slide4" src="@/assets/news3.jpg" />
      </div>

      <!--Navigation circles-->

      <div class="sliderNav">
        <a v-for="(slide, index) in slides" :key="index" :href="`#slide${index + 1}`" :class="{ active: currentIndex === index }" @click.prevent="changeSlide(index)"></a>
      </div>
    </div>
  </div>

</template>

<script>

//  Export the component
export default{
  name: "Slider",
  //  Data for the component (slides and current index)
  data() {
    return {
      slides: [1, 2, 3, 4],
      currentIndex: 0,
      autoRotationInterval: null, // Store the interval reference
    };
  },

  //  Methods for the component (change slide, start and stop auto rotation)
  methods: {
    //  Change the slide by clicking on the navigation circles
    changeSlide(index) {
      this.currentIndex = index;
      //  Scroll to the selected slide
      const slider = document.querySelector(".slider");
      slider.scrollTo({
        left: slider.offsetWidth * index,
        behavior: "smooth",
      });
    },

    //  Start the auto rotation of the slides (every 10 seconds)
    startAutoRotation() {
      this.autoRotationInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.changeSlide(this.currentIndex);
      }, 10000); // Change slide every 10 seconds
    },

    //  Stop the auto rotation of the slides
    stopAutoRotation() {
      clearInterval(this.autoRotationInterval);
      this.autoRotationInterval = null; // Clear the interval reference
    },
  },

  // mounted lifecycle hook to start the auto rotation on component mount
  mounted() {
    this.startAutoRotation();
  },

  // beforeUnmount lifecycle hook to stop the auto rotation on component unmount
  beforeUnmount() {
    this.stopAutoRotation();
  },

  //  beforeRouteLeave lifecycle hook to stop the auto rotation when the user leaves the page
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.stopAutoRotation();
      next();
    });
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

.sliderNav{
    display: flex;
    column-gap: 1rem;
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.sliderNav a{
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: #000000;
    transition: opacity ease 250ms;
}

.sliderNav a:hover{
    opacity: 1;
}

.sliderNav a.active{
    opacity: 1;
    background-color: #edd3ae;
}

.sliderNav:focus{
    color: white;
}

@media screen and (max-width: 500px){
  .slideNews{
      padding: 2rem;
  }


  .sliderNav a{
      width: 0.4rem;
      height: 0.4rem;
  }
}

</style>
