/*import './assets/main.css'*/

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import { initializeApp } from "firebase/app";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faGhost } from '@fortawesome/free-solid-svg-icons'
import { faHandFist } from '@fortawesome/free-solid-svg-icons'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faCcVisa } from '@fortawesome/free-brands-svg-icons'
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons'
import { faCcAmex } from '@fortawesome/free-brands-svg-icons'
import store from './store/store';
import VueTheMask from 'vue-the-mask';


library.add(faUserSecret, faBell, faCartShopping, faRightFromBracket, faHeart, faGhost, faHandFist, faMasksTheater,
   faComment, faMoon, faSun, faCreditCard, faCcVisa, faCcMastercard, faCcAmex);


const firebaseConfig = {
  apiKey: "AIzaSyB1WW45TAycdKHf35IRAGs11zR4Hrcf_Ac",
  authDomain: "test-b66aa.firebaseapp.com",
  projectId: "test-b66aa",
  storageBucket: "test-b66aa.appspot.com",
  messagingSenderId: "1022569607479",
  appId: "1:1022569607479:web:375ca02d65b0984e82aab2",
  measurementId: "G-56DH7DVX9S"
};

initializeApp(firebaseConfig);
const app = createApp(App)
app.use(VueTheMask);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store);
app.mount('#app')










