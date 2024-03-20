<template>
  <div class="container">
    <h2 class="text-center">Lista de títulos</h2>
    <div class="card">
      <div class="card-header">
        <router-link to="/crear-titulo" class="btn btn-outline-primary">
          Crear título
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Editorial</th>
              <th>ISBN</th>
              <th>Fecha de Publicación</th>
              <th>No. de Ejemplares</th>
              <th>ID de Subcategoría</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="titulo in titulosPaginados" :key="titulo.idTitulo">
              <td>{{ titulo.idTitulo }}</td>
              <td>{{ titulo.titulo }}</td>
              <td>{{ titulo.editorial }}</td>
              <td>{{ titulo.isbn }}</td>
              <td>{{ titulo.fechaPublicacion }}</td>
              <td>{{ titulo.noEjemplares }}</td>
              <td>{{ titulo.idSubcategoria }}</td>
              <td>
                <router-link :to="'/mostrar-titulo/' + titulo.idTitulo" class="btn btn-outline-info mx-1">Mostrar</router-link>
                <router-link :to="'/modificar-titulo/' + titulo.idTitulo" class="btn btn-outline-success mx-1">Modificar</router-link>
                <button @click="eliminarTitulo(titulo.idTitulo)" class="btn btn-outline-danger">Eliminar</button>
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
  name: 'TituloList',
  data() {
    return {
      titulos: [],
      currentPage: 1,
      pageSize: 10, // Número de títulos por página
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.titulos.length / this.pageSize);
    },
    titulosPaginados() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.titulos.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getTitulos();
  },
  methods: {
    getTitulos() {
      axios.get('http://127.0.0.1:9090/api/getTitulos')
        .then(res => {
          this.titulos = res.data;
        })
        .catch(error => {
          console.error('Error fetching titulos:', error);
        });
    },
    eliminarTitulo(idTitulo) {
      axios.delete(`http://127.0.0.1:8080/api/deleteTitulo/${idTitulo}`)
        .then(() => {
          // Eliminar el titulo de la lista después de eliminarlo en el servidor
          this.titulos = this.titulos.filter(titulo => titulo.idTitulo !== idTitulo);
        })
        .catch(error => {
          console.error('Error deleting titulo:', error);
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
