import { createApp } from 'vue'
import App from './App.vue'

import './comm.css'
import 'vant/lib/index.css';

import router from './router'
import store from './store'


const app = createApp(App);

import Vant from 'vant';

app.use(Vant);

import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL='http://49.235.72.251:5555'
app.config.globalProperties.$axios = axios
app.config.globalProperties.$qs = qs


app.use(store).use(router).mount('#app')
