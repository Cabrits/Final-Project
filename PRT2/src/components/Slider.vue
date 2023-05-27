<template> 
    <div class="slideNews">
        <div class="sliderWrapper">
            <div class="slider">
                <img id="slide1" src="images/news1.jpg">
                <img id="slide2" src="images/news2.jpg">
                <img id="slide3" src="images/news3.jpg">
                <img id="slide4" src="images/news4.jpg">
            </div>
            <div class="sliderNav">
                <a href="#slide1"></a>
                <a href="#slide2"></a>
                <a href="#slide3"></a>
                <a href="#slide4"></a>
            </div>
        </div>
    </div>
</template>


<script>

export default{
    name:'Slider',
}

</script>


<style scoped>

.slideNews{
    padding: 2rem;
}

.sliderWrapper{
    position: relative;
    max-width: 55rem;
    margin: 0 auto;
}

.slider{
    display: flex;
    aspect-ratio: 16 / 8;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    border-radius: 0 1.5rem 3rem -075rem hsla(0, 0%, 0%, 0.25);
    border-radius: 10px;
    overflow: hidden;
}

.slider img{
    flex: 1 0 100%;
    scroll-snap-align: start;
    object-fit: cover;
}

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
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.75;
    transition: opacity ease 250ms;
}

.sliderNav a:hover{
    opacity: 1;
}

.sliderNav:focus{
    color: white;
}

</style>