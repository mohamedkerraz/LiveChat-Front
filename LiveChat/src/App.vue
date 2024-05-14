<script setup>

</script>

<template>



  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <div class="d-inline-flex link-body-emphasis text-decoration-none">
          <img src="./assets/logo.png" class="bi" width="40" height="32" alt="logo">
        </div>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2"><router-link to="/livechat">LiveChat</router-link></a></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-outline-primary me-2" v-if="!isLoggedIn"><router-link to="/login">Connexion</router-link></button>
        <button type="button" class="btn btn-outline-primary" v-if="!isLoggedIn" style="margin-left: 5px;"><router-link to="/inscription">Inscription</router-link></button>
        <button type="button" class="btn btn-outline-primary" @click="handleSignOut" v-if="isLoggedIn" >Se déconnecter</button>
      </div>
    </header>
  </div>
  
  <router-view />
</template>


<script setup>
import {onMounted, ref} from "vue";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useRouter } from "vue-router";
import store from './store/store.js';

const router = useRouter();
const isLoggedIn = ref(false);


let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) =>{
    if(user){
      isLoggedIn.value = true;
    }else{
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () =>{
  signOut(auth).then(() => {
      router.push("/login");
    store.dispatch("logout");
  });
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
