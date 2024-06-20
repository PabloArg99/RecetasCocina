
import { createRouter, createWebHistory } from 'vue-router';
import ListaDeRecetas from './components/ListaDeRecetas.vue';
import DetalleReceta from './components/DetalleReceta.vue';
import FormularioReceta from './components/FormularioReceta.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const routes = [
  { path: '/', component: ListaDeRecetas },
  { path: '/receta/:id', component: DetalleReceta },
  { path: '/agregar', component: FormularioReceta },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
