import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import CategoriaList from '../components/CategoriaList.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
