import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// test environment variables 
console.log('API URL:', process.env.VUE_APP_API_URL);
console.log('Pusher Key:', process.env.VUE_APP_PUSHER_KEY);
console.log('Pusher Cluster:', process.env.VUE_APP_PUSHER_CLUSTER);

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000'

// initialize Pusher with Laravel Echo
window.Pusher = Pusher
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_KEY,
  cluster: process.env.VUE_APP_PUSHER_CLUSTER,
  forceTLS: true,

  logToConsole: true, 
})

// Log the Pusher connection to check if it's established
window.Echo.connector.pusher.connection.bind('connected', () => {
  console.log('Pusher connected successfully!');
});

// bind to connection error events for debugging
window.Echo.connector.pusher.connection.bind('error', (err) => {
  console.error('Pusher connection error:', err);
});


window.Echo.channel('chat.1') 
  .listen('NewMessage', (event) => {
    console.log('New message received:', event.message);
  })
  .error((err) => {
    console.error('Channel subscription error:', err);
  });

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.use(store)
app.mount('#app')
