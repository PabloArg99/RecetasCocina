// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que estás importando el archivo correcto
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const app = createApp(App);
app.use(router); // Usa el enrutador con la aplicación Vue

app.mount('#app');
