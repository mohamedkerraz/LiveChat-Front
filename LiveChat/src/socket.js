import { reactive } from "vue";
import io from 'socket.io-client';
import { useUserStore } from '../store/userStore';

const { user } = useUserStore();

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const PORT = process.env.PORT || 3000;
const token_user = "test";
import user from './components/LoginComponent.vue';

console.log(user);
export const socket = io('http://localhost:'+PORT, {
    withCredentials: true,
    extraHeaders: {
        Authorization: token_user
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