import { createRouter, createWebHistory } from 'vue-router';
import CategoriaList from '../components/CategoriaList.vue';
import TituloList from '../components/TituloList.vue';
import AutorList from '../components/AutorList.vue';
import SubcategoriaList from '../components/SubcategoriaList.vue';
import TituloAutorList from '../components/TituloAutorList.vue';
import LandingPage from '../components/LandingPage.vue';

const routes = [
  { path: '/', component: LandingPage }, 
  { path: '/categorias', component: CategoriaList },
  { path: '/titulos', component: TituloList },
  { path: '/autores', component: AutorList },
  { path: '/subcategorias', component: SubcategoriaList },
  { path: '/titulos-autores', component: TituloAutorList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
