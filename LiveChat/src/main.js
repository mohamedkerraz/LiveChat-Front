import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyADYx5uzhK4W7hytZf6cM5DM3Oxwi89AuA",
  authDomain: "livechat-53e0e.firebaseapp.com",
  projectId: "livechat-53e0e",
  storageBucket: "livechat-53e0e.appspot.com",
  messagingSenderId: "530138926007",
  appId: "1:530138926007:web:1209f4d17ded104996f632"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
