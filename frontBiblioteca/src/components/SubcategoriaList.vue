<template>
  <div class="container">
    <h2 class="text-center">Lista de subcategorías</h2>
    <div class="card">
      <div class="card-header">
        <router-link to="/crear-subcategoria" class="btn btn-outline-primary">
          Crear subcategoría
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Subcategoría</th>
              <th>Categoría</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subcategoria in subcategoriasPaginadas" :key="subcategoria.idSubcategoria">
              <td>{{ subcategoria.idSubcategoria }}</td>
              <td>{{ subcategoria.subcategoria }}</td>
              <td>{{ subcategoria.idCategoria }}</td>
              <td>
                <router-link :to="'/mostrar-subcategoria/' + subcategoria.idSubcategoria" class="btn btn-outline-info mx-1">Mostrar</router-link>
                <router-link :to="'/modificar-subcategoria/' + subcategoria.idSubcategoria" class="btn btn-outline-success mx-1">Modificar</router-link>
                <button @click="eliminarSubcategoria(subcategoria.idSubcategoria)" class="btn btn-outline-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SubcategoriaList',
  data() {
    return {
      subcategorias: [],
      currentPage: 1,
      pageSize: 10, // Número de subcategorías por página
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.subcategorias.length / this.pageSize);
    },
    subcategoriasPaginadas() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.subcategorias.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getSubcategorias();
  },
  methods: {
    getSubcategorias() {
      axios.get('http://127.0.0.1:9090/api/getSubcategorias')
        .then(res => {
          this.subcategorias = res.data;
        })
        .catch(error => {
          console.error('Error fetching subcategorias:', error);
        });
    },
    eliminarSubcategoria(idSubcategoria) {
      axios.delete(`http://127.0.0.1:8080/api/deleteSubcategoria/${idSubcategoria}`)
        .then(() => {
          // Eliminar la subcategoría de la lista después de eliminarla en el servidor
          this.subcategorias = this.subcategorias.filter(subcategoria => subcategoria.idSubcategoria !== idSubcategoria);
        })
        .catch(error => {
          console.error('Error deleting subcategoria:', error);
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
};
</script>
