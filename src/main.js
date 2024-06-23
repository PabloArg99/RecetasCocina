// src/main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './bootstrap'
import router from './router'
import axiosInstance from './axios'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.config.globalProperties.$axios = axiosInstance

app.mount('#app')
