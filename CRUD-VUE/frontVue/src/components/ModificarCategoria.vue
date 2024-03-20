<template>
    <div>
      <h2>Modificar Categoría</h2>
      <input type="text" v-model="categoria.categoria">
      <button @click="modificarCategoria">Guardar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ModificarCategoria',
    data() {
      return {
        categoria: {}
      };
    },
    mounted() {
      this.getCategoria();
    },
    methods: {
      async getCategoria() {
        try {
          const response = await axios.get(`http://127.0.0.1:8080/api/getCategoria/${this.$route.params.id}`);
          this.categoria = response.data;
        } catch (error) {
          console.error('Error al obtener la categoría:', error);
        }
      },
      async modificarCategoria() {
        try {
          await axios.put(`http://127.0.0.1:8080/api/updateCategorias/${this.$route.params.id}`, {
            categoria: this.categoria.categoria
          });
          // Redirigir a la lista de categorías después de modificar
          this.$router.push('/');
        } catch (error) {
          console.error('Error al modificar la categoría:', error);
        }
      }
    }
  };
  </script>
  