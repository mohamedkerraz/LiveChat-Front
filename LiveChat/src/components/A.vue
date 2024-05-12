<template>
  <h1> Login </h1>
  <p><input type="text" placeholder="Email" v-model="email"></p>
  <p><input type="password" placeholder="Mot de passe" v-model="mdp"></p>
  <p v-if="msgErr"> {{ msgErr }}</p>
  <p><button @click="login">Se connecter</button></p>
  <p><button @click="signInWithGoogle">Se connecter avec Google</button></p>
</template> 

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/userStore';

const { user, setUser } = useUserStore();
const email = ref("");
const mdp = ref("");
const msgErr = ref();
const router = useRouter();

const login = async () => {
  try {
    const data = await signInWithEmailAndPassword(getAuth(), email.value, mdp.value);
    setUser(data.user);
    router.push('/livechat');
  } catch (error) {
    console.log(error.code);
    msgErr.value = error.message;
  }
};

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(getAuth(), provider);
    setUser(result.user);
    router.push('/livechat');
  } catch (error) {
    console.error(error);
  }
};
</script>
