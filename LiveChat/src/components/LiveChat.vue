<template>
  <div class="view-livechat-container">
    <div class="livechat-container">
      <div>
        <h1>Bienvenue dans le LiveChat</h1>
        <h6>Connecté en tant que : {{ userId }}</h6>
        <h5>Chat Géneral</h5>
      </div>
        <ul class="messages-container" ref="messagesContainer">
          <li :class="message.userId == userId ? 'message message-right' : 'message message-left'" 
              v-for="message in messages" :key="message.id">
            <div class="message-info">
              <div>
                <p id="user">{{ message.userId }}</p>
                <p id="date">{{ message.date }}</p>
              </div>
              <div>
                <p id="text">{{ message.text }}</p>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <textarea autofocus placeholder="Message" v-model="newMessage" @keyup.enter="sendMessage"></textarea>
          <button ref="scrollContainer" @click="sendMessage">Envoyer</button>
        </div>
      </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { format } from "date-fns";
import axios from "axios";

export default {
  name: 'LiveChat',
  data() {
    return {
      ws: null,
      newMessage: "",
      messages: [],
      message: null,
      userId: null,
      user: null,
      page: 1,
      limit: 50,
      hasMore: true,
      SERVER_PORT: import.meta.env.VITE_BACKEND_PORT || 3000,
    };
  },
  mounted() {
    this.initUser();
    this.scrollToBottom()
  },
  updated() {
    this.scrollToBottom(); // Ensure scroll to bottom on updates
  },
  created() {
    this.getData();
  },
  methods: {
    initUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.displayName == null) {
            const atIndex = user.email.indexOf("@");
            if (atIndex !== -1) {
              this.userId = user.email.substring(0, atIndex);
            } else {
              this.userId = "undefined";
            }
          } else {
            this.userId = user.displayName;
          }

          this.user = user;

          this.connect(user);
        } else {
          this.user = null;
          this.userId = null;
          if (this.ws) {
            this.ws.close();
          }
        }
      });
    },
    async getData() {
      await axios
        .get(`http://localhost:${this.SERVER_PORT}/api/messages`, {
          params: { page: this.page, limit: this.limit },
        })
        .then((response) => {
          this.messages = response.data;
          console.log("Messages fetched successfully:", this.messages);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
    connect(user) {
      if (this.ws) {
        this.ws.close();
      }
      this.ws = new WebSocket(
        `ws://localhost:${this.SERVER_PORT}?token=${user.accessToken}`
      );

      this.ws.onopen = (event) => {
        console.log("Connected", event);
      };

      this.ws.onmessage = (event) => {
        console.log("Message received:", event.data);
        this.message = JSON.parse(event.data);
        this.messages.push(this.message);
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      this.ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
    },
    sendMessage() {
      if (this.newMessage.trim() !== "" && this.userId) {
        const now = new Date();
        const formattedDate = format(now, "dd/MM/yyyy HH:mm");

        const message = {
          text: this.newMessage,
          userId: this.userId,
          date: formattedDate,
        };
        this.messages.push(message);
        this.ws.send(JSON.stringify(message));
        this.newMessage = "";
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    },
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  },
};
</script>

<style></style>
