
import { createRouter, createWebHistory } from 'vue-router';
import ListaDeRecetas from './components/ListaDeRecetas/ListaDeRecetasIndex.vue';
import FormularioReceta from './components/FormularioReceta/FormularioRecetaIndex.vue';
import Register from './components/Register/RegisterIndex.vue';
import Login from './components/Login/LoginIndex.vue';
import DetalleReceta from './components/DetalleReceta/DetalleRecetaIndex.vue';

const routes = [
  { path: '/', component: ListaDeRecetas },
  { path: '/receta/:id', component: DetalleReceta },
  { path: '/agregar', component: FormularioReceta },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  
  { path: '/:pathmatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
