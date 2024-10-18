import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'


axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000'

// laravel Echo
window.Pusher = Pusher
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_PUSHER_KEY,
  cluster: process.env.VUE_APP_PUSHER_CLUSTER,
  forceTLS: true
})

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.use(store)
app.mount('#app')


