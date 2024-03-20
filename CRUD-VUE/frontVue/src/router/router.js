import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import CategoriaList from '../components/CategoriaList.vue';
import MostrarCategoria from '../components/MostrarCategoria.vue';
import ModificarCategoria from '../components/ModificarCategoria.vue';
import CrearCategoria from '../components/CrearCategoria.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categoria-list',
    name: 'CategoriaList',
    component: CategoriaList
  },
  {
    path: '/mostrar-categoria/:id',
    name: 'MostrarCategoria',
    component: MostrarCategoria
  },
  {
    path: '/modificar-categoria/:id',
    name: 'ModificarCategoria',
    component: ModificarCategoria
  },
  {
    path: '/crear-categoria',
    name: 'CrearCategoria',
    component: CrearCategoria
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
