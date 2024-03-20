<template>
  <div class="container">
    <h2 class="text-center">Lista de categorías</h2>
    <div class="card">
      <div class="card-header">
        <router-link to="/crear-categoria" class="btn btn-outline-primary">
          Crear categoría
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Clave</th>
              <th>Categoría</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in categoriasPaginadas" :key="c.idCategoria">
              <td>{{ c.idCategoria }}</td>
              <td>{{ c.categoria }}</td>
              <td>
                <router-link
                  :to="'/mostrar-categoria/' + c.idCategoria"
                  class="btn btn-outline-info mx-1"
                  >Mostrar</router-link
                >
                <router-link
                  :to="'/modificar-categoria/' + c.idCategoria"
                  class="btn btn-outline-success mx-1"
                  >Modificar</router-link
                >
                <button
                  @click="eliminarCategoria(c.idCategoria)"
                  class="btn btn-outline-danger"
                >
                  Eliminar
                </button>
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
import axios from "axios";

export default {
  name: "CategoriaList",
  data() {
    return {
      categorias: [],
      currentPage: 1,
      pageSize: 5, 
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.categorias.length / this.pageSize);
    },
    categoriasPaginadas() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.categorias.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getCategorias();
  },
  methods: {
    getCategorias() {
      axios
        .get("http://127.0.0.1:9090/api/getCategorias")
        .then((res) => {
          this.categorias = res.data;
        })
        .catch((error) => {
          console.error("Error fetching categorias:", error);
        });
    },
    eliminarCategoria(idCategoria) {
      axios
        .delete(`http://127.0.0.1:9090/api/deleteCategoria/${idCategoria}`)
        .then(() => {
          this.categorias = this.categorias.filter(
            (c) => c.idCategoria !== idCategoria
          );
        })
        .catch((error) => {
          console.error("Error deleting categoria:", error);
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
