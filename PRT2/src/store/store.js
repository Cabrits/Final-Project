import { createStore } from 'vuex';

import favouritesModule from './modules/favourites';
import itemsModule from './modules/items';
import cartModule from './modules/cart';
import ordersModule from './modules/orders';
import userModule from './modules/user';

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