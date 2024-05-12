<script setup>

</script>

<template>
  <nav>
    <router-link to="/login">Connexion</router-link>
    <router-link to="/inscription">Inscription</router-link>
    <router-link to="/livechat">LiveChat</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Se déconnecter</button>
  </nav>
  <router-view />
</template>


<script setup>
import {onMounted, ref} from "vue";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useRouter } from "vue-router";

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
    router.push("/");
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
