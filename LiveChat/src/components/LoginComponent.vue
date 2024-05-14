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
  import { 
    getAuth, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup

  } from "firebase/auth";
  import {useRouter} from 'vue-router';
  import store from '../store/store';

  const email = ref ("");
  const mdp = ref ("");
  const msgErr = ref();
  const router = useRouter();

  const login = () =>{
    signInWithEmailAndPassword(getAuth(), email.value, mdp.value)
        .then((result)=>{
            console.log("Connexion réussite !");
            const username = getUsernameFromEmail(result.user.email);
            const userInfo = { ...result.user, displayName: username };
            store.dispatch('setUser', userInfo);
            router.push('/livechat');
        })
        .catch((error)=> {
          switch(error.code){
            case "auth/invalid-email":
              msgErr.value = "Email invalide";
              break;
            case "auth/user-not-found":
              msgErr.value = "Utilisateur introuvable";
              break;
            case "auth/wrong-password":
              msgErr.value = "Mot de passe incorrect";
              break;
            default:
              msgErr.value = "Email ou mot de passe incorrect";
              break;
          }
        })
  };

const getUsernameFromEmail = (email) => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  } else {
    return 'undefined'; 
  }
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(getAuth(), provider)
    .then((result) => {
      store.dispatch('setUser', result.user);
      router.push('/livechat');
    })
    .catch((error) =>{
      switch(error.code){
          case "auth/invalid-email":
            msgErr.value = "Email invalide";
            break;
          case "auth/user-not-found":
            msgErr.value = "Utilisateur introuvable";
            break;
          case "auth/wrong-password":
            msgErr.value = "Mot de passe incorrect";
            break;
          default:
            msgErr.value = "Email ou mot de passe incorrect";
            break;
        }
    });
};


</script>
  
 