/*import './assets/main.css'*/

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import { initializeApp } from "firebase/app";


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

app.use(router)
app.mount('#app')