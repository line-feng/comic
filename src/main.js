import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './comm.css'


const app = createApp(App);

import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL='http://192.168.1.14:5555'
app.config.globalProperties.$axios = axios
app.config.globalProperties.$qs = qs

app.use(store).use(router).mount('#app')
