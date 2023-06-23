// Purpose: Vuex store for the application.
import { createStore } from "vuex";

// Import modules for favourites, items, cart, orders and user
import favouritesModule from "./modules/favourites";
import itemsModule from "./modules/items";
import cartModule from "./modules/cart";
import ordersModule from "./modules/orders";
import userModule from "./modules/user";

// Create a new store instance. with modules for favourites, items, cart, orders and user

const store = createStore({
  modules: {
    favourites: favouritesModule,
    items: itemsModule,
    cart: cartModule,
    orders: ordersModule,
    user: userModule,
  },
});

export default store;
