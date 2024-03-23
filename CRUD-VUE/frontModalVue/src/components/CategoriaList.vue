<template>
  <div class="container">
    <h2 class="text-center">Lista de categorías</h2>
    <div class="card">
      <div class="card-header">
        <!-- <router-link to="/crear-categoria" class="btn btn-outline-primary">
          Crear categoría
        </router-link> -->
        <button
          @click="abrirModalCrear"
          class="btn btn-outline-primary mx-1"
          data-bs-toggle="modal"
          data-bs-target="#modalCrear"
        >
          Crear categoría
        </button>
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
                <button
                  @click="mostrarModal(c.idCategoria, c.categoria)"
                  class="btn btn-outline-info mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Mostrar
                </button>

                <button
                  @click="abrirModalEditar(c)"
                  class="btn btn-outline-success mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditar"
                >
                  Editar
                </button>
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
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage">&laquo;</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="goToPage(page)">
              {{ page }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <button class="page-link" @click="nextPage">&raquo;</button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Modal Mostrar -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Detalle de Categoría
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Clave: {{ modalData.id }}</p>
            <p>Categoría: {{ modalData.nombre }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Editar -->
    <div
      class="modal fade"
      id="modalEditar"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Editar Categoría
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarCategoria">
              <div class="mb-3">
                <label for="categoriaEditar" class="form-label"
                  >Categoría</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="categoriaEditar"
                  v-model="categoriaEditar"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Guardar Cambios
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar Ventana
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear -->
    <div
      class="modal fade"
      id="modalCrear"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Crear Categoría
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="crearCategoria">
              <div class="mb-3">
                <label for="nombreCategoria" class="form-label"
                  >Nombre de la Categoría</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nombreCategoria"
                  v-model="nuevaCategoria"
                />
              </div>
              <button type="submit" class="btn btn-primary">Crear</button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
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
      modalData: { id: null, nombre: null },
      categoriaEditar: null,
      categoriaEditarId: null,
      currentPage: 1,
      pageSize: 5,
      nuevaCategoria: '',
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
        .get("http://127.0.0.1:8080/api/getCategorias")
        .then((res) => {
          this.categorias = res.data;
        })
        .catch((error) => {
          console.error("Error fetching categorias:", error);
        });
    },
    eliminarCategoria(idCategoria) {
      axios
        .delete(`http://127.0.0.1:8080/api/deleteCategoria/${idCategoria}`)
        .then(() => {
          this.categorias = this.categorias.filter(
            (c) => c.idCategoria !== idCategoria
          );
          Swal.fire("¡La categoría ha sido eliminada!");
        })
        .catch((error) => {
          console.error("Error deleting categoria:", error);
        });
    },

    
    mostrarModal(idCategoria, nombreCategoria) {
      this.modalData = { id: idCategoria, nombre: nombreCategoria };
    },
    abrirModalEditar(categoria) {
      this.categoriaEditar = categoria.categoria;
      this.categoriaEditarId = categoria.idCategoria;
      $("#modalEditar").modal("show");
    },
    editarCategoria() {
      console.log("ID de categoría a editar:", this.categoriaEditarId);
      console.log("Nuevo nombre de categoría:", this.categoriaEditar);

      axios
        .put(
          `http://127.0.0.1:8080/api/updateCategorias/${this.categoriaEditarId}`,
          {
            categoria: this.categoriaEditar,
          }
        )
        .then(() => {
          this.getCategorias();
          $("#modalEditar").modal("hide");
        })
        .catch((error) => {
          console.error("Error editing categoria:", error);
        });
    },

    crearCategoria() {
      axios
        .post("http://127.0.0.1:8080/api/postCategoria", { categoria: this.nuevaCategoria })
        .then(() => {
          this.getCategorias();
          $("#modalCrear").modal("hide"); 
          this.nuevaCategoria = ''; 
        })
        .catch((error) => {
          console.error("Error creating categoria:", error);
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
