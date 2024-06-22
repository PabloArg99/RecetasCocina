// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que estás importando el archivo correcto
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia= createPinia()

app.use(pinia)
app.use(router); 

app.mount('#app');
