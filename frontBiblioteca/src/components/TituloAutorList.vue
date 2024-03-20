<template>
  <div class="container">
    <h2 class="text-center">Lista de títulos y autores</h2>
    <div class="card">
      <div class="card-header">
        <router-link to="/crear-titulo-autor" class="btn btn-outline-primary">
          Asignar título a autor
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID de Autor</th>
              <th>ID de Título</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="relacion in relacionesPaginadas" :key="relacion.idTitulo + '-' + relacion.idAutor">
              <td>{{ relacion.idAutor }}</td>
              <td>{{ relacion.idTitulo }}</td>
              <td>
                <router-link :to="'/mostrar-titulo-autor/' + relacion.idTitulo + '-' + relacion.idAutor" class="btn btn-outline-info mx-1">Mostrar</router-link>
                <router-link :to="'/modificar-titulo-autor/' + relacion.idTitulo + '-' + relacion.idAutor" class="btn btn-outline-success mx-1">Modificar</router-link>
                <button @click="eliminarRelacion(relacion.idTitulo, relacion.idAutor)" class="btn btn-outline-danger">Eliminar</button>
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
  name: 'TituloAutorList',
  data() {
    return {
      relaciones: [],
      currentPage: 1,
      pageSize: 10, 
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.relaciones.length / this.pageSize);
    },
    relacionesPaginadas() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.relaciones.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getRelaciones();
  },
  methods: {
    getRelaciones() {
      axios.get('http://127.0.0.1:9090/api/getTitulosAutores')
        .then(res => {
          this.relaciones = res.data;
        })
        .catch(error => {
          console.error('Error fetching relaciones:', error);
        });
    },
    eliminarRelacion(idTitulo, idAutor) {
      axios.delete(`http://127.0.0.1:8080/api/deleteTituloAutor/${idTitulo}/${idAutor}`)
        .then(() => {
          this.relaciones = this.relaciones.filter(relacion => relacion.idTitulo !== idTitulo || relacion.idAutor !== idAutor);
        })
        .catch(error => {
          console.error('Error deleting relacion:', error);
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
