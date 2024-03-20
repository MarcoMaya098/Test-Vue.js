<template>
  <div class="container">
    <h2 class="text-center">Lista de autores</h2>
    <div class="card">
      <div class="card-header">
        <router-link to="/crear-autor" class="btn btn-outline-primary">
          Crear autor
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Correo Electrónico</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="autor in autoresPaginados" :key="autor.idAutor">
              <td>{{ autor.idAutor }}</td>
              <td>{{ autor.nombre }}</td>
              <td>{{ autor.nacionalidad }}</td>
              <td>{{ autor.correoElectronico }}</td>
              <td>
                <router-link :to="'/mostrar-autor/' + autor.idAutor" class="btn btn-outline-info mx-1">Mostrar</router-link>
                <router-link :to="'/modificar-autor/' + autor.idAutor" class="btn btn-outline-success mx-1">Modificar</router-link>
                <button @click="eliminarAutor(autor.idAutor)" class="btn btn-outline-danger">Eliminar</button>
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
  name: 'AutorList',
  data() {
    return {
      autores: [],
      currentPage: 1,
      pageSize: 10, // Número de autores por página
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.autores.length / this.pageSize);
    },
    autoresPaginados() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.autores.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getAutores();
  },
  methods: {
    getAutores() {
      axios.get('http://127.0.0.1:9090/api/getAutores')
        .then(res => {
          this.autores = res.data;
        })
        .catch(error => {
          console.error('Error fetching autores:', error);
        });
    },
    eliminarAutor(idAutor) {
      axios.delete(`http://127.0.0.1:8080/api/deleteAutor/${idAutor}`)
        .then(() => {
          // Eliminar el autor de la lista después de eliminarlo en el servidor
          this.autores = this.autores.filter(autor => autor.idAutor !== idAutor);
        })
        .catch(error => {
          console.error('Error deleting autor:', error);
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
