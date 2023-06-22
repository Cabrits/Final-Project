<!--Comment here-->

<template>
    <RouterView></RouterView>
</template>
  
<script>

alert("This is a project for university , it is not a real website , no transactions can be done within it, any checkout made will simply be send to our personal database , please do not put any real information in this website")
import { useRouter } from 'vue-router';
const router = useRouter();

import { mapActions, mapGetters } from 'vuex';

export default {
  // ...

  computed: {
    // ...
    ...mapGetters('user', ['getUserAuth']),
  },

  watch: {
    async getUserAuth(newValue) {
      if (newValue) {
        console.log("this changed ",newValue)
        await this.fetchUser();
        this.fetchOrders();
        this.fetchFavourites();
      }
    },
  },

  methods: {
    ...mapActions('user', ['fetchUser']),
    ...mapActions('favourites',['fetchFavourites']),
    ...mapActions('orders',['fetchOrders']),
  },

}
    
</script>

<style>
::-webkit-scrollbar{
    width: 10px;
}

::-webkit-scrollbar-track{
    background-color: rgb(224, 228, 193); 
}

::-webkit-scrollbar-thumb{
    background-color: #888; 
    border-radius: 10px; 
}

::-webkit-scrollbar-thumb:hover{
    background-color: #555; 
}

::-webkit-scrollbar-corner{
    background-color: #f1f1f1; 
    height: 53.3049px; 
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 295.372, 0, 1);
}
</style>