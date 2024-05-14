import { reactive } from "vue";
import { io } from "socket.io-client";
import store from './store/store';

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";


let authToken = store.state.userInfo.stsTokenManager.accessToken || "undefined";

export const socket = io(URL, {
  query: {
    token: authToken
  }
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
}); 