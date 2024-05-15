<template>
    <div class="live-chat">
      <h1>Live Chat</h1>
      <ul>
        <li v-for="message in messages" >
          {{ message.text }}
        </li>
      </ul>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </template>
  
  <script>
  import { getAuth } from "firebase/auth"
  import { toRaw } from 'vue';

  
  
  const user = getAuth().currentUser;
  
  
  export default {
    data() {
      return {
        ws: null,
        newMessage: '',
        messages : [],
        message:null,
        userId: user.displayName
      };
    },
    created(){
        this.connect();
    },
    methods: {
      connect() {
        console.log(user.accessToken);
        this.ws = new WebSocket(`ws://localhost:5424?token=${user.accessToken}`);

        this.ws.onopen = function(event) {
          console.log("Connected", event);
        };

        this.ws.onmessage = (event) => {

          console.log("Message received:", event.data);
          this.message = JSON.parse(event.data);
          this.messages.push(this.message);

        };

        this.ws.onerror = (error) => {
          console.error('WebSocket Error:', error);
        };

        this.ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
      },
      sendMessage() {
        if (this.newMessage.trim() !== '') {
          console.log(this.userId);
          const message = { text: this.newMessage, userId: this.userId };
          this.messages.push(message);
          this.ws.send(JSON.stringify(message));
          this.newMessage = '';
        }
      }
    },
    beforeDestroy() {
      if (this.ws) {
        this.ws.close();
      }
    }
  };
  </script>
  <style>
  </style>