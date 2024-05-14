<template>
  <section style="background-color: #eee;">
    <div class="container py-3">

      <div class="row">
        <div class="container">
          <img src="./../assets/logo.png" class="bi" width="80" alt="logo">
          <h2 class="font-weight-bold"> Bienvnue dans le LiveChat </h2>
          <h6>Connecté en tant que : {{ userInfo.displayName }}</h6> 
        </div>
        <div>
        <h1>Login</h1>
        <p v-if="isConnected">Connecté au serveur WebSocket</p>
        <p v-else>Déconnecté du serveur WebSocket</p>
      </div>

        <div class="container col-md-6 col-lg-7 col-xl-8">
          <h5 class="font-weight-bold mb-3 text-center text-lg-start">Chat Géneral</h5>
          <ul class="list-unstyled">

            <li class="d-flex justify-content-between mb-4">
              <div class="card">
                <div class="card-header d-flex justify-content-between p-3">
                  <p class="fw-bold mb-0">Brad Pitt</p>
                  <p class="text-muted small mb-0"><i class="far fa-clock"></i> 12 mins ago</p>
                </div>
                <div class="card-body">
                  <p class="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            </li>

            <li class="d-flex justify-content-between mb-4">
              <div class="card w-100">
                <div class="card-header d-flex justify-content-between p-3">
                  <p class="fw-bold mb-0">Lara Croft</p>
                  <p class="text-muted small mb-0"><i class="far fa-clock"></i> 13 mins ago</p>
                </div>
                <div class="card-body">
                  <p class="mb-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium.
                  </p>
                </div>
              </div>
            </li>

            <li class="d-flex justify-content-between mb-4">
              <div class="card">
                <div class="card-header d-flex justify-content-between p-3">
                  <p class="fw-bold mb-0">Brad Pitt</p>
                  <p class="text-muted small mb-0"><i class="far fa-clock"></i> 10 mins ago</p>
                </div>
                <div class="card-body">
                  <p class="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            </li>
            
          <li v-for="message in messages" :key="message.id" class="d-flex justify-content-between mb-4">
            <div class="card">
              <div class="card-header d-flex justify-content-between p-3">
                <p class="fw-bold mb-0">{{ message.sender }}</p>
                <p class="text-muted small mb-0"><i class="far fa-clock"></i> {{ message.timestamp }}</p>
              </div>
              <div class="card-body">
                <p class="mb-0">{{ message.content }}</p>
              </div>
            </div>
          </li>

          <li class="bg-white mb-3">
            <div data-mdb-input-init class="form-outline">
              <textarea v-model="message_send" class="form-control" id="textAreaExample2" rows="4"></textarea>
              <label class="form-label" for="textAreaExample2">Votre message</label>
            </div>
          </li>
          <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-info btn-rounded float-end"
            @click="send_message(message_send)">Envoyer</button>

          </ul>

        </div>

      </div>


    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { state } from "../socket";

export default {
  name: 'LiveChat',
  data() {
    return {
      message_send: null,
      messages: state.messages
    };
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    userInfo() {
      return this.getUserInfo || {};
    },
    isConnected() {
      return state.connected;
    }
  },
  created() {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      this.$store.commit('setUserInfo', JSON.parse(storedUserInfo));
    }
  
    this.$watch(() => state.messages, (newMessages) => {
      this.messages = newMessages;
    });
  },
  mounted() {
    console.log(this.userInfo);
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  },
  methods: {

  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
