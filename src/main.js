import Vue,{ createApp } from 'vue'
import App from './App.vue'

import './comm.css'
import 'vant/lib/index.css';

import router from './router'
import store from './store'


const app = createApp(App);

import Vant from 'vant';

app.use(Vant);

import axios from 'axios'
//axios二次封装
// import axios from '@/assets/axios/axios_config.js'
import qs from 'qs'

axios.defaults.baseURL= process.env.NODE_ENV == 'development' ? 'http://192.168.1.14:5555' : 'http://43.128.47.111:5555'
app.config.globalProperties.$axios = axios
app.config.globalProperties.$qs = qs


app.use(store).use(router).mount('#app')
