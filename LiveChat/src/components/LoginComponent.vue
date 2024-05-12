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

  const email = ref ("");
  const mdp = ref ("");
  const msgErr = ref();
  const router = useRouter();

  const login = () =>{
    signInWithEmailAndPassword(getAuth(), email.value, mdp.value)
        .then((data)=>{
            console.log("Connexion réussite !");

            router.push('/livechat');
        })
        .catch((error)=> {
          console.log(error.code);
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


  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
        router.push('/livechat');

      })
      .catch((error) =>{

      });
  };


</script>
  
 