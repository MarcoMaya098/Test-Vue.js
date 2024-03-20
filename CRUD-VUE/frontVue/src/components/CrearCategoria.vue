<template>
    <div class="container">
      <h2 class="text-center">Crear Categoría</h2>
      <form @submit.prevent="crearCategoria">
        <div class="mb-3">
          <label for="nombreCategoria" class="form-label">Nombre de la Categoría</label>
          <input type="text" class="form-control" id="nombreCategoria" v-model="nombreCategoria">
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CrearCategoria',
    data() {
      return {
        nombreCategoria: ''
      };
    },
    methods: {
      async crearCategoria() {
        try {
          await axios.post('http://127.0.0.1:8080/api/postCategoria', {
            categoria: this.nombreCategoria
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Error al crear la categoría:', error);
        }
      }
    }
  };
  </script>

  