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
                        <tr v-for="c in categorias" :key="c.idCategoria">
                            <td>{{ c.idCategoria }}</td>
                            <td>{{ c.categoria }}</td>
                            <td>
                                <router-link :to="'/mostrar-categoria/' + c.idCategoria" class="btn btn-outline-info mx-1">Mostrar</router-link>
                                <router-link :to="'/modificar-categoria/' + c.idCategoria" class="btn btn-outline-success mx-1">Modificar</router-link>
                                <button @click="eliminarCategoria(c.idCategoria)" class="btn btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CategoriaList',
    data() {
        return {
            categorias: [],
        }
    },
    mounted() {
        this.getCategorias();
    },
    methods: {
        getCategorias() {
            axios.get('http://127.0.0.1:8080/api/getCategorias')
                .then(res => {
                    this.categorias = res.data;
                })
                .catch(error => {
                    console.error('Error fetching categorias:', error);
                });
        },
        eliminarCategoria(idCategoria) {
            axios.delete(`http://127.0.0.1:8080/api/deleteCategoria/${idCategoria}`)
                .then(() => {
                    // Eliminar la categoría de la lista después de eliminarla en el servidor
                    this.categorias = this.categorias.filter(c => c.idCategoria !== idCategoria);
                })
                .catch(error => {
                    console.error('Error deleting categoria:', error);
                });
        }
    }
}
</script>
