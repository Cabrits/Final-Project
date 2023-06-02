<template>
  <div>
    <div :class="{ 'loadingScreen': true, 'fadeOut': !isLoading || loadingComplete }" v-if="isLoading && !loadingComplete">
      <p>Welcome to</p>
      <img src="/images/loading.gif" alt="Loading" />
    </div>

    <div v-else>
      <div class="overall">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>

    <footer>
      <p :class="{ 'blink': isLoading && !loadingComplete }" v-if="isLoading">Loading...</p>
    </footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Content from '../components/Content.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'HomePage',
  components: { Header, Footer, Content },

  data() {
    return {
      isLoading: true,
      loadingComplete: false
    };
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        this.loadingComplete = true;
      }, 500);
    }, 1000); /*3000 base */
  }
}
</script>

<style scoped>
.blink {
  animation: blink 1s linear infinite;
  font-size: 30px;
  text-align: center;
  margin-top: 150px;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.loadingScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 130px;
  height: 70vh;
  opacity: 1;
  animation: fadeOut 4s forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loadingScreen img {
  width: 30%;
}

.loadingScreen p {
  top: 5px;
  font-weight: 600;
  font-size: 45px;
}

.fadeOut {
  display: none;
}

@media screen and (max-width: 800px) {
  .loadingScreen img {
    width: 50%;
  }
}

</style>

