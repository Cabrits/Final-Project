<!-- The main component that serves as the entry point for the application -->

<template>
  <RouterView></RouterView>
</template>

<script>
// Display an alert message to inform users about the nature of the website
alert(`This is a project for university , 
it is not a real website , no transactions can be done within it, any 
checkout made will simply be send to our personal database , 
please do not put any real information in this website`);

// Import necessary modules and functions
import { useRouter } from "vue-router";
const router = useRouter();
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    // Map user getters
    ...mapGetters("user", ["getUserAuth"]),
  },

  watch: {
    //  Watch for changes in the user authentication state
    async getUserAuth(newValue) {
      if (newValue) {
        //  If the user is authenticated, fetch user data, orders, and favourites
        await this.fetchUser();
        this.fetchOrders();
        this.fetchFavourites();
      }
    },
  },
  methods: {
    // Map user actions
    ...mapActions("user", ["fetchUser"]),
    ...mapActions("favourites", ["fetchFavourites"]),
    ...mapActions("orders", ["fetchOrders"]),
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: rgb(224, 228, 193);
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

::-webkit-scrollbar-corner {
  background-color: #f1f1f1;
  height: 53.3049px;
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 295.372, 0, 1);
}
</style>
